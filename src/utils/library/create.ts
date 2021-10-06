import { Component } from "../Component";
import { ConfigFile } from "../CofigFIle";
import { Variables } from "../Variables";
import { Command } from "../Command";

export function create(
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
