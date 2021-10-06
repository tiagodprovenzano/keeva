import {
  fstat,
  readdirSync,
  readFileSync,
  writeFileSync,
  existsSync,
  mkdirSync
} from "fs";
import path from "path";

type IConfigFileJSON = {
  templatesUri: string;
  methods: { name: string; folder?: string }[];
};

const defaultConfig: IConfigFileJSON = {
  templatesUri: "/home/tiago/Repos/react-keeva/src/templates",
  methods: [{ name: "Component" }],
};

export class ConfigFile {
  static keevaConfigFileName: string = "keeva.config.json";

  private rawContent: string | undefined;
  private projectPath: string;
  private content: IConfigFileJSON | undefined;
  private defaultContent: IConfigFileJSON = defaultConfig;

  constructor(projectPath: string) {
    this.projectPath = projectPath;
    this.getContent();
  }

  private fileExists(): boolean {
    try {
      return !!this.readFile();
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  private readFile(): string | undefined | Buffer {
    return readFileSync(
      path.join(this.projectPath, ConfigFile.keevaConfigFileName),
      {
        encoding: "utf-8",
      }
    );
  }

  private getContent() {
    if (this.fileExists()) {
      this.rawContent = this.readFile() as string;
      this.content = JSON.parse(this.rawContent);
    }
  }

  get templateUri(): string {
    if (this.content) {
      return path.join(this.projectPath, this.content.templatesUri);
    } else {
      return this.defaultContent.templatesUri;
    }
  }
  get methods(): { name: string; folder?: string }[] {
    if (this.content) {
      return this.content.methods;
    } else {
      return this.defaultContent.methods;
    }
  }

  static init(projectPath: string) {
    const pathToConfigFile = path.join(
      projectPath,
      ConfigFile.keevaConfigFileName
    );
    const pathToTemplates = path.join("./.keeva/templates");
    if(!existsSync(pathToTemplates)){
      mkdirSync(pathToTemplates, {recursive: true})
    }
    const config: IConfigFileJSON = {
      templatesUri: pathToTemplates,
      methods: [{ name: "Hello World", folder: "HelloWorldComponents" }],
    };
    writeFileSync(pathToConfigFile, JSON.stringify(config));

    const templateFileName: string = "helloWorld.kva";
    const templateFilePath = path.join(__dirname, '../../templates/HelloWorldComponents', templateFileName);
    if (existsSync(templateFilePath)) {
      const templateFileContent: string = readFileSync(templateFilePath, {
        encoding: "utf8",
      });
      const folderToSave = path.join(pathToTemplates, "HelloWorldComponents")
      if(!existsSync(folderToSave)){
        mkdirSync(folderToSave)
      }
      writeFileSync(
        path.join(folderToSave, templateFileName),
        templateFileContent,
      );
    }
  }
}
