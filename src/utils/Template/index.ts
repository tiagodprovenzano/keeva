import { readFileSync } from "fs";
import { camelToKebab } from "../..";
import { IFileContentAndInfo } from "../../types/IFileContentAndInfo";
import { IParseTemplateContentOptions } from "../../types/IParseTemplateContentOptions";

export class Template {
    private templatePath: string
    private variables: Record<string, string>
    constructor(templatePath: string, variables: Record<string, string>){
        this.templatePath = templatePath;
        this.variables = variables;
    }

    private getTemplate (){
        return readFileSync(this.templatePath, {encoding: 'utf-8'})
    }

    getInfoAndText(text: string): IFileContentAndInfo {
        const regex = new RegExp(/@(FILENAME|EXT)=(.{0,})/gim);
        const textMatch = text.match(regex);
        let filename = "";
        let ext = "";
        if (textMatch) {
          for (const match of textMatch) {
            if (match.includes("FILENAME")) {
              filename = match.replace(regex, "$2");
            } else {
              if (match.includes("EXT")) {
                ext = match.replace(regex, "$2");
              }
            }
          }
        }
        return { content: text.replace(regex, "").trim(), info: { filename, ext } };
      };
      
      parse(): IFileContentAndInfo {
        const text = this.getTemplate()
        const regex = new RegExp(/<%([A-Z,a-z,|]{0,})%>/gm);
        const matches = text.match(regex);
        let replacedText = text;
        if (matches) {
          for (const match of matches) {
            let newText = match.replace(regex, "$1");
            let useKebab = false;
            if (newText.includes("KEBAB")) {
              newText = newText.split("|")[1];
              useKebab = true;
            }
      
            let value = this.variables[newText];
            if (value && useKebab) {
              value = camelToKebab(value);
            }
      
            replacedText = replacedText.split(match).join(value);
          }
        }
      
        return this.getInfoAndText(replacedText);
      }
}