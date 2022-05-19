/*
 * @Author: zhuzheng013
 * @Date: 2022-05-18 14:08:16
 * @LastEditors: zhuzheng013
 * @LastEditTime: 2022-05-18 14:54:54
 * @Description: file content
 * @FilePath: /algorithm/原型链/call.mjs
 */
/**
 * Function.prototype.call
 * thisArg: 可选, 注意this可能不是该方法的实际值, 如果是非严格模式下 null 
 * 或者 undefined会自动替换为window全局对象, 原始值会被包装
 */

Function.prototype.call = function(context, ...args) {
  let ctx = context == null ? window : context
  // 如果在浏览器运行可以不加
  if (typeof ctx === 'string') {
    ctx = new String(ctx)
  } else if (typeof ctx === 'number') {
    ctx = new Number(ctx)
  } else if (typeof ctx === 'boolean') {
    ctx = new Boolean(ctx)
  }
  ctx.__fn__ = this
  const result = ctx.__fn__(...args)
  delete ctx.__fn__
  return result
}


function getLength() {
  return this.length
}

console.log(getLength.call('123')) // 3  原始类型会转换为包装类型