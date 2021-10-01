import * as fs from "fs";
import path from "path";
import { File } from "../File";
import { Keeva } from "../Keeva";

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
    if(hasCustomTemplates){
        if(this.workspaceFolderPath) {
            templatesPath = path.join(this.workspaceFolderPath, '.keeva','templates', this.commandDir)
            dir = fs.readdirSync(templatesPath)
        };
    }else{
        dir = fs.readdirSync(templatesPath);
    }  
    for (const templateFileName of dir) {
      const templatePath = path.join(templatesPath, templateFileName);
      const templateFn = require(templatePath);
      if (typeof templateFn === "function") {
        const template = templateFn(this.name);
        const filename = template.filename;
        const ext = template.ext;
        const content = template.content;
        new File(filename, content, targetFolderPath, ext).create();
      }
    }
  }
}
