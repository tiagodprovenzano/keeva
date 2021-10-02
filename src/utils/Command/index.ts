export class Command {
  private _folder: string;
  private name: string;
  constructor(name: string, folder?: string) {
    this.name = name;
    this._folder = folder ? folder : name;
  }

  get folder() {
    return this._folder;
  }
}
