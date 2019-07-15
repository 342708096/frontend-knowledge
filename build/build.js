const babelPluginFactory =  require('rollup-plugin-babel')
const resolve =  require('rollup-plugin-node-resolve')
const rollup = require('rollup')
const {input, output} = require('./config')

const inputOptions = {
    input,
    plugins: [
        resolve(),
        babelPluginFactory({
            exclude: 'node_modules/**'
        })
    ],
}

const outputOptions = {
    ...output
}

~async function build() {
    const bundle = await rollup.rollup(inputOptions);
    const {code, map} = await bundle.generate(outputOptions)
    await bundle.write(outputOptions)
}()