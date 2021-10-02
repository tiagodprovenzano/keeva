import { camelToKebab } from "../..";

export class Text {
  private text: string;
  private variables: Record<string, string>;
  constructor(text: string, variables: Record<string, string>) {
    this.text = text;
    this.variables = variables;
  }

  parse() {
    const regex = new RegExp(/<%([A-Z,a-z,|]{0,})%>/gm);
    const matches = this.text.match(regex);
    let replacedText = this.text;
    if (matches) {
      for (const match of matches) {
        let newText = match.replace(regex, "$1");
        let useKebab = false;
        if (newText.includes("KEBAB")) {
          newText = newText.split("|")[1];
          useKebab = true;
        }

        let value = this.variables[newText];
        if (value && useKebab) {
          value = camelToKebab(value);
        }

        replacedText = replacedText.split(match).join(value);
      }
    }
    return replacedText;
  }
}
