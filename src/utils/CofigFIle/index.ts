import { readdirSync, readFileSync } from "fs";
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
    return readFileSync(path.join(this.projectPath, "keeva.config.json"), {
      encoding: "utf-8",
    });
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
}
