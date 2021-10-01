import { camelToKebab } from "../../utils/library/camelToKebab";

export default (name) => ({
    filename: camelToKebab(name) + '.style',
    ext: 'ts',
    content:`
import { styled, css } from 'styled-components'

const ${name}Wrapper = styled.div\`\$\{ ({theme}) => css\`

\`\}\`
`})
