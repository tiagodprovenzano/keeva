const {camelToKebab} = require('../../utils/library/camelToKebab')
module.exports = (name) => ({
    filename: camelToKebab(name) + '.controller',
    ext: 'tsx',
    content: `import React from 'react'
import ${name}View from '${camelToKebab(name)}.view'
import I${name} from '${camelToKebab(name)}.props'

const ${name}: React.FC<I${name}> = (props) => {
    const {} = props;
    return <${name}View />
}

export default ${name}
`,
});
