import { camelToKebab } from "./utils/library/camelToKebab";
import { Component } from "./utils/Component";
import { Template } from "./utils/Template";
import { getVariablesFromInputText } from "./utils/library/getVariablesFromInputText";
import { ConfigFile } from "./utils/CofigFIle";
import { Variables } from "./utils/Variables";
import { Command } from "./utils/Command";
import { Text } from "./utils/Text";

export { camelToKebab, Component };

const variables = {
  name: "PanelFilter",
};
const pathToJson = "/home/tiago/Repos/TestingKeeva/keeva.config.json";

const inputText = "name=LothalWarrior address=CrazyStyles";

function input(
  projectPath: string,
  targetPath: string,
  command: string,
  variablesInput: string
) {
  const configFile = new ConfigFile(projectPath);
  const variables = new Variables(variablesInput).variables;
  const commandDir = new Command(command).folder;
  console.log({
    projectPath,
    targetPath,
    command,
    variablesInput,
    templatesUri: configFile.templateUri,
    methods: configFile.methods,
    variables,
  });
  new Component(variables, targetPath, configFile.templateUri, commandDir).create();
}

input(
  "/home/tiago/Repos/TestingKeeva/",
  "/home/tiago/Repos/PloomesCRMWeb/src/Keeva",
  "Component",
  inputText
);