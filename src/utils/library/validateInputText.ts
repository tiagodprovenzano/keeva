import { Variables } from "../Variables";

export const validateInputText = (
  variablesOnTemplate: string[],
  text: string
): { valid: boolean; missingVariables: string[] } => {
  const variableObject = new Variables(text).variables;
  let isInvalid = false;
  let missingVariables: string[] = [];
  for (const variableOnTemplate of variablesOnTemplate) {
    if (typeof variableObject[variableOnTemplate] !== "string") {
      isInvalid = true;
      missingVariables.push(variableOnTemplate);
    }
  }
  return { valid: !isInvalid, missingVariables };
};
