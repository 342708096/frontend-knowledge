const babelPluginFactory =  require('rollup-plugin-babel')
const resolve =  require('rollup-plugin-node-resolve')
const rollup = require('rollup')
const commonjs = require('rollup-plugin-commonjs')
const json = require('rollup-plugin-json')
const {uglify} = require('rollup-plugin-uglify')
const {input, output} = require('./config')

const inputOptions = {
    input,
    plugins: [
        resolve({
            browser: true,
        }),
        babelPluginFactory({
            exclude: 'node_modules/**',
            runtimeHelpers: true
        }),
        commonjs({
            // non-CommonJS modules will be ignored, but you can also
            // specifically include/exclude files
            // include: 'node_modules/**',  // Default: undefined
            // exclude: [ 'node_modules/foo/**', 'node_modules/bar/**' ],  // Default: undefined
            // these values can also be regular expressions
            // include: /node_modules/

            // search for files other than .js files (must already
            // be transpiled by a previous plugin!)
            extensions: [ '.js', '.coffee' ],  // Default: [ '.js' ]

            // if true then uses of `global` won't be dealt with by this plugin
            ignoreGlobal: false,  // Default: false

            // if false then skip sourceMap generation for CommonJS modules
            sourceMap: false,  // Default: true

            // explicitly specify unresolvable named exports
            // (see below for more details)
            namedExports: { 'react': ['createElement', 'Component' ] },  // Default: undefined

            // sometimes you have to leave require statements
            // unconverted. Pass an array containing the IDs
            // or a `id => boolean` function. Only use this
            // option if you know what you're doing!
            ignore: [ 'conditional-runtime-dependency' ]
        }),

        json({
            // All JSON files will be parsed by default,
            // but you can also specifically include/exclude files
            include: 'node_modules/**',
            // exclude: [ 'node_modules/foo/**', 'node_modules/bar/**' ],

            // for tree-shaking, properties will be declared as
            // variables, using either `var` or `const`
            preferConst: true, // Default: false

            // specify indentation for the generated default export —
            // defaults to '\t'
            indent: '  ',

            // ignores indent and generates the smallest code
            compact: true, // Default: false

            // generate a named export for every property of the JSON object
            namedExports: true // Default: true
        }),

        uglify()
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