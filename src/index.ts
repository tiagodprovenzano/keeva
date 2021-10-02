import { camelToKebab } from "./utils/library/camelToKebab";
import { Component } from "./utils/Component";
import { ConfigFile } from "./utils/CofigFIle";
import { Variables } from "./utils/Variables";
import { Command } from "./utils/Command";

function create(
  projectPath: string,
  targetPath: string,
  command: string,
  variablesInput: string
): void {
  const configFile = new ConfigFile(projectPath);
  const variables = new Variables(variablesInput).variables;
  const commandDir = new Command(command).folder;
  new Component(
    variables,
    targetPath,
    configFile.templateUri,
    commandDir
  ).create();
}

export { camelToKebab, create, ConfigFile };
