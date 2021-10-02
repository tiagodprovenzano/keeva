import * as fs from "fs";
import path from 'path'
import { IFileExt } from "../../types/IFileExt";
export class File {
  private name: string;
  private content: string;
  private path: string;
  private ext: string;

  constructor(name: string, content: string, path: string, ext: string) {
    this.name = name;
    this.ext = ext;
    this.content = content;
    this.path = path;
  }

  static isFile(string: string){
    return !!string.match(/.kva$/)
  }

  create(){

      const filePath = path.join(this.path, `${this.name}.${this.ext}`)
      fs.writeFile(filePath, this.content, (err) => {
        if(!err){
            console.log('created file at ', filePath);
        }
      })
  }
}
