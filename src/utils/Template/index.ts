import { readFileSync } from "fs";
import { IFileContentAndInfo } from "../../types/IFileContentAndInfo";
import { IParseTemplateContentOptions } from "../../types/IParseTemplateContentOptions";
import { Text } from "../Text";

export class Template {
  private templatePath: string;
  private variables: Record<string, string>;
  constructor(templatePath: string, variables: Record<string, string>) {
    this.templatePath = templatePath;
    this.variables = variables;
  }

  private getTemplate() {
    return readFileSync(this.templatePath, { encoding: "utf-8" });
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
  }

  parse(): IFileContentAndInfo {
    const text = this.getTemplate();
    let replacedText = new Text(text, this.variables).parse();

    return this.getInfoAndText(replacedText);
  }
}

