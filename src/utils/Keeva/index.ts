import * as fs from "fs";
import path from "path";

type ICustomConfig = {
    templatesUri: string
}

export abstract class Keeva {
  protected name: string;
  protected dirPath: string;
  protected workspaceFolderPath: string | undefined;
  protected commandDir: string;
  protected customConfig: ICustomConfig | null;

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
    const hasCustomConfig = this.hasConfigFile()
    if(hasCustomConfig && this.workspaceFolderPath){
        this.customConfig = require(path.join(this.workspaceFolderPath, ".keeva.config.json"));
        console.log(this.customConfig);
    }else{
        this.customConfig = null
    }
  }

  protected hasConfigFile = (): boolean => {
    if (this.workspaceFolderPath) {
      const configFile = path.join(this.workspaceFolderPath, ".keeva.config.json");
      try {
        fs.readFileSync(configFile);
      } catch (error) {
        return false;
      }
      return true;
    }
    return false;
  };

  protected hasCustomTemplates = () => {
    if (this.workspaceFolderPath && this.customConfig?.templatesUri) {
      const customTemplatesPath = path.join(
        this.workspaceFolderPath,
        this.customConfig?.templatesUri,
        this.commandDir
      );
      console.log({customTemplatesPath});
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
