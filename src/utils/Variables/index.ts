import { getVariablesFromInputText } from "../library/getVariablesFromInputText"

type IKeevaVariables = Record<string, string>

export class Variables {
    private inputText: string
    constructor(inputText: string){
        this.inputText = inputText
    }

    get variables(): IKeevaVariables{
        return getVariablesFromInputText(this.inputText)
    }
}