/*
 * @Author: zhuzheng013
 * @Date: 2022-05-16 16:10:27
 * @LastEditors: zhuzheng013
 * @LastEditTime: 2022-05-16 16:18:52
 * @Description: 继承构造函数Foo
 * @FilePath: /algorithm/原型链/extend.mjs
 */
function Foo(...fp){
  console.log('foo的参数', ...fp)
}

function Bar(...bp) {
  console.log('bar的参数', ...bp)
  Foo.call(this, ...bp)
}

Bar.prototype = Object.create(Foo.prototype)
Bar.prototype.constructor = Bar

// 模拟Object.create
function create(obj){
  function cons() {}
  cons.prototype = obj
  return new cons()
}