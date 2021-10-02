import * as fs from "fs";
import * as path from "path";
import { File } from "../File";
import { Text } from "../Text";

export class TemplateVariables {
  private templateUri: string;
  private _variables: string[] = [];
  constructor(templateUri: string) {
    this.templateUri = templateUri;
  }

  private addVariable(variable: string) {
    if (!this._variables.includes(variable)) {
      this._variables.push(variable);
    }
  }

  private addVariablesFromText(text: string) {
    const variables = Text.getVariablesFromText(text);
    for (const variable of variables) {
      this.addVariable(variable);
    }
  }

  get variables() {
    this.find();
    return this._variables;
  }

  private checkFileTextContent(uri: string) {
    if (fs.existsSync(uri)) {
      const text = fs.readFileSync(uri, {encoding: 'utf-8'});
      if (text) this.addVariablesFromText(text);
    }
  }

  private find() {
    const loopDir = (dirPath: string) => {
      const exists = fs.existsSync(dirPath);
      if (exists) {
        const dir = fs.readdirSync(dirPath);
        if (dir) {
          for (const name of dir) {
            this.addVariablesFromText(name);
            if (File.isFile(name)) {
              this.checkFileTextContent(path.join(dirPath, name))
            } else {
              loopDir(path.join(dirPath, name));
            }
          }
        }
      }
    };
    loopDir(this.templateUri);
  }
}
