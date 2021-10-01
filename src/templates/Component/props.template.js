const { camelToKebab } = require("../../utils/library/camelToKebab");

module.exports = (name) => ({
    filename: camelToKebab(name) + '.props',
    ext: 'ts',
    content: `type I${name} = {

}

export default I${name}
`})