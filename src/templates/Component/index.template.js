const { camelToKebab } = require("../../utils/library/camelToKebab");

module.exports = (name) => ({
    filename: 'index',
    ext: 'ts',
    content:`import ${name} from './${camelToKebab(name)}.controller'
import I${name} from './${camelToKebab(name)}.props'

export {
    ${name},
    I${name}
}
`})
