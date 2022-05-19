/*
 * @Author: zhuzheng013
 * @Date: 2022-05-18 16:12:09
 * @LastEditors: zhuzheng013
 * @LastEditTime: 2022-05-18 16:43:45
 * @Description: file content
 * @FilePath: /algorithm/原型链/object_create.mjs
 */

/**
 * 模拟Object.create
 * 如果proto参数不是 null 或非原始包装对象，则抛出一个 TypeError 异常。
 * 老版本不支持proto为null, 并且不支持第二个参数
 */

Object.prototype.create = function(proto, propertiesObject) {
  if (typeof proto !== 'object' && typeof proto !== 'function') {
    throw new Error('type error')
  }
  const Constructor = function() {}
  Constructor.prototype = proto
  const children = new Constructor()
  if (propertiesObject === undefined) {
    return children
  }
  Object.defineProperties(children, propertiesObject)
  return children
}