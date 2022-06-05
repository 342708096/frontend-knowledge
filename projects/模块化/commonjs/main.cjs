// main.js


/**
 * CommonJS 模块输出的是一个值的拷贝，ES6 模块输出的是值的引用。
    CommonJS 模块是运行时加载，ES6 模块是编译时输出接口。
    CommonJS 模块的require()是同步加载模块，ES6 模块的import命令是异步加载，有一个独立的模块依赖的解析阶段。
 */
var mod = require('./lib.cjs');

console.log(mod.counter);  // 3
mod.incCounter();
console.log(mod.counter); // 3