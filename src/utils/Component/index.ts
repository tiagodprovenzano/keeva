import * as fs from "fs";
import path from "path";
import { File } from "../File";
import { Template } from "../Template";
import { Text } from "../Text";

export class Component {
  private variables: Record<string, string>
  private targetDirPath: string
  private templateUri: string
  constructor(variables: Record<string, string>, targetDirPath: string, templatesUri: string, commandDir: string) {
    this.variables = variables;
    this.targetDirPath = targetDirPath;
    this.templateUri = path.join(templatesUri, commandDir)
  }

  create() {

    const loopDir = (targetDirPath: string, parentFolderParsed: string = '', parentFolderUnparsed: string = '') => {
      const targetFolderPath = path.join(targetDirPath, parentFolderParsed);
      try {
        fs.readdirSync(targetFolderPath);
      } catch (error) {
        fs.mkdirSync(targetFolderPath);
      }

      let dir: string[] = fs.readdirSync(path.join(this.templateUri, parentFolderUnparsed))
      const createFile = (templateFileName: string) => {
        const templatePath = path.join(this.templateUri, parentFolderUnparsed, templateFileName);
        const {content, info} = new Template(templatePath, this.variables).parse()
        if (content && info) {
          new File(info.filename, content, targetFolderPath, info.ext).create();
        }
      }
  
      for (const templateFileName of dir) {
        if(templateFileName.match(/.kva$/)){
          createFile(templateFileName)
        }else{
          const parsedTemplateFileName = new Text(templateFileName, this.variables).parse()
          loopDir(targetDirPath, path.join(parentFolderParsed, parsedTemplateFileName), path.join(parentFolderUnparsed, templateFileName))
        }
      }
    }

    loopDir(this.targetDirPath)
    
  }
}
