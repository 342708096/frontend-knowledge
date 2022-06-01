/**
 * Function (paramStr1, paramStr2, ..., functionStr): function(param1, param2)
 * Function 生成函数的时候可以省略 new
 * @param {*} str 
 * @param {*} data 
 * @returns 
 */

function render(str, data) {
    return str.replace(/\{\{([^\{\}]+)\}\}/g, Function('d', 'return function(_,s){with(d) return eval(s)}')(data||{}))
}

console.log(render(`用户信息:{{name}}{{age}}`, {
    name: '小明',
    age: 12
}))