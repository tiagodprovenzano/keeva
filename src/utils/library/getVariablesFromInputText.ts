export function getVariablesFromInputText(text: string) {
  const regex = new RegExp(/[a-zA-Z\d\w-]{0,}=[a-zA-Z\d\w-]{0,}/gm);

  const variables: Record<string, string> = {};

  for (const match of text.match(regex) || []) {
    const tokens = match.split("=");
    const variableName = tokens[0];
    const value = tokens[1];
    variables[variableName] = value;
  }
  return variables;
}
