import { camelToKebab } from "../../utils/library/camelToKebab";

export default (name) => ({
    filename: 'index',
    ext: 'ts',
    content:`
import ${name} from './${camelToKebab(name)}.controller'
import I${name} from './${camelToKebab(name)}.props

export {
    ${name},
    I${name}
}
`})
