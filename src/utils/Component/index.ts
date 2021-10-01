import * as fs from "fs";
import path from "path";
import { File } from "../File";
import { Keeva } from "../Keeva";
import { Template } from "../Template";

export class Component extends Keeva {
  constructor(name: string, dirPath: string, workspaceFolderPath: string = '') {
    super(name, dirPath, workspaceFolderPath, 'Component');
  }

  create() {
    const targetFolderPath = path.join(this.dirPath, this.name);
    try {
      fs.readdirSync(targetFolderPath);
    } catch (error) {
      fs.mkdirSync(targetFolderPath);
    }

    const hasCustomTemplates = this.hasCustomTemplates()
    let templatesPath = __dirname.replace("utils", "templates");

    let dir: string[] = []
    if(hasCustomTemplates && this.customConfig?.templatesUri){
        if(this.workspaceFolderPath) {
            templatesPath = path.join(this.workspaceFolderPath, this.customConfig.templatesUri, this.commandDir)
            dir = fs.readdirSync(templatesPath)
        };
    }else{
        dir = fs.readdirSync(templatesPath);
    }  
    for (const templateFileName of dir) {
      const templatePath = path.join(templatesPath, templateFileName);
      const {content, info} = new Template(templatePath, {name: this.name}).parse()
      if (content && info) {
        new File(info.filename, content, targetFolderPath, info.ext).create();
      }
    }
  }
}
