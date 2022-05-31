/*
 * @Author: zhuzheng013
 * @Date: 2022-05-18 14:54:36
 * @LastEditors: zhuzheng013
 * @LastEditTime: 2022-05-18 15:45:13
 * @Description: file content
 * @FilePath: /algorithm/原型链/bind.mjs
 */
/**
 * Function.prototype.bind
 * thisArg 调用绑定函数使作为this参数传递给目标函数的值.
 * 如果使用new 运算符构造绑定函数, 则忽略该值.
 * 当使用bind在setTimeout中创建一个函数(作为回调函数)时, thisArg传递的任何原始
 * 值都将转换为object. 如果bind函数的参数列表为空, 或者thisArgs 是null和 undefined,
 * 执行作用域的this将被视为新函数的thisArg
 */

// function logLength() {
//   console.log(this.length)
// }

// const newLog = logLength.bind('123')


// setTimeout(newLog)
// newLog() // 3




/**
 * 手动实现bind
 */

Function.prototype.bind = function bind(that, ...partArgs) {
  // 拿到函数本身
  const F = this
  // 获取函数的原型链, 函数作为构造函数时才有显式原型
  const Prototype = F.prototype
  const bindFunction = function (...args){
    if (this instanceof bindFunction) {
      return F.call(this, ...partArgs, ...args)
    }
    return F.call(that, ...partArgs, ...args)
  }
  bindFunction.prototype = Prototype
  return bindFunction
}

function c(a, b) {
  this.a = a
  this.b = b
  console.log(this.a, this.b, this.c)
}
c.prototype = {a: 3, b: 4, c: 5}


const d = c.bind(null, 1)

new d(2)