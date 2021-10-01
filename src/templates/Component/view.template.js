const { camelToKebab } = require( "../../utils/library/camelToKebab");

module.exports = (name) => ({
    filename: camelToKebab(name) + '.view',
    ext: 'tsx',
    content: `
import React from 'react'
import ${name}Wrapper from '${camelToKebab(name)}.style'

type I${name}View = {

}

const ${name}View: React.FC<I${name}View> = () => (
    <${name}Wrapper>
        <div>${name} view</div>
    </${name}Wrapper>
)

export default ${name}View
`})