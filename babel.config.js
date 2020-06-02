const presets = [
    [
        "@babel/env",
        {
            targets: {
                edge: '12',
                chrome: '23',
                safari: '6',
                firefox: '21',
                ie: '10'
            }
        }
    ]
];
const plugins = [
    [
        '@babel/plugin-transform-runtime',
        {
            corejs: 3
        }
    ]
];
 module.exports = {presets, plugins};