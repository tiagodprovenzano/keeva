import { camelToKebab } from "./utils/library/camelToKebab";
import { Component } from "./utils/Component";
import { ConfigFile } from "./utils/CofigFIle";
import { Variables } from "./utils/Variables";
import { Command } from "./utils/Command";
import { TemplateVariables } from "./utils/TemplateVariables";
import { validateInputText } from "./utils/library/validateInputText";

function create(
  projectPath: string,
  targetPath: string,
  command: string,
  variablesInput: string
): void {
  const configFile = new ConfigFile(projectPath);
  const commandDir = new Command(command).folder;
  const variables = new Variables(variablesInput).variables;
  new Component(
    variables,
    targetPath,
    configFile.templateUri,
    commandDir
  ).create();
}

export { camelToKebab, create, ConfigFile, TemplateVariables, validateInputText };

