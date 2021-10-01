const { camelToKebab } = require("../../utils/library/camelToKebab");

module.exports = (name) => ({
    filename: camelToKebab(name) + '.style',
    ext: 'ts',
    content:`import { styled, css } from 'styled-components'

const ${name}Wrapper = styled.div\`\$\{ ({theme}) => css\`

\`\}\`
`})
