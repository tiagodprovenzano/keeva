import * as fs from "fs";
import path from "path";

export abstract class Keeva {
  protected name: string;
  protected dirPath: string;
  protected workspaceFolderPath: string | undefined;
  protected commandDir: string;
  
  constructor(
    name: string,
    dirPath: string,
    workspaceFolderPath: string | undefined,
    commandDir: string
  ) {
    this.name = name;
    this.dirPath = dirPath;
    this.workspaceFolderPath = workspaceFolderPath;
    this.commandDir = commandDir;
  }

  protected hasCustomTemplates = () => {
    if (this.workspaceFolderPath) {
      const customTemplatesPath = path.join(
        this.workspaceFolderPath,
        ".keeva",
        "templates",
        this.commandDir
      );
      try {
        fs.readdirSync(customTemplatesPath);
      } catch (error) {
        return false;
      }
      return true;
    }
    return false;
  };
}
