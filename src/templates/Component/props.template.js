import { camelToKebab } from "../../utils/library/camelToKebab";

export default (name) => ({
    filename: camelToKebab(name) + '.props',
    ext: 'ts',
    content: `
type I${name} = {

}

export default I${name}
`})