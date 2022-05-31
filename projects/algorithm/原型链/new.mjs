/*
 * @Author: zhuzheng013
 * @Date: 2022-05-18 15:47:34
 * @LastEditors: zhuzheng013
 * @LastEditTime: 2022-05-18 16:11:34
 * @Description: file content
 * @FilePath: /algorithm/原型链/new.mjs
 */
/**
 * new 关键字会进行如下的操作：

创建一个空的简单JavaScript对象（即{}）；
为步骤1新创建的对象添加属性__proto__，将该属性链接至构造函数的原型对象 ；
将步骤1新创建的对象作为this的上下文 ；
如果该函数没有返回对象，则返回this。
（译注：关于对象的 constructor，参见 Object.prototype.constructor）

创建一个用户自定义的对象需要两步：

通过编写函数来定义对象类型。
通过 new 来创建对象实例。
创建一个对象类型，需要创建一个指定其名称和属性的函数；对象的属性可以指向其他对象，看下面的例子：

当代码 new Foo(...) 执行时，会发生以下事情：

一个继承自 Foo.prototype 的新对象被创建。
使用指定的参数调用构造函数 Foo，并将 this 绑定到新创建的对象。new Foo 等同于 new Foo()，也就是没有指定参数列表，Foo 不带任何参数调用的情况。
由构造函数返回的对象就是 new 表达式的结果。如果构造函数没有显式返回一个对象，则使用步骤1创建的对象。（一般情况下，构造函数不返回值，但是用户可以选择主动返回对象，来覆盖正常的对象创建步骤）
你始终可以对已定义的对象添加新的属性。例如，car1.color = "black" 语句给 car1 添加了一个新的属性 color，并给这个属性赋值 "black"。但是，这不会影响任何其他对象。要将新属性添加到相同类型的所有对象，你必须将该属性添加到 Car 对象类型的定义中。
 */


function __new__(constructor, ...args) {
  const that = Object.create(constructor.prototype)
  const ret = constructor.call(that, ...args)
  // 如果是引用类型, 最终应该最后返回该引用类型, null除外
  if (typeof ret === 'function' || (typeof ret === 'object' && ret !== null)) {
    return ret
  }
  return that
}


function con() {
  return null
}

console.log(__new__(con))
console.log(new con())