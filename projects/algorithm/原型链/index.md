1. Function Foo 的显示原型为 Foo.prototype
2. Foo.prototype.__proto__ === Object.prototype
3. Foo.__proto__ === Function.prototype
4. Function.__proto__ === Function.prototype
5. Function.prototype.__proto__ === Object.prototype
6. Object.prototype.__proto__ === null

总结: 
1. 构造函数的显示原型的隐式原型 为 Object构造器 的 显示原型
2. 构造函数实例的隐式原型 等于 构造函数的显示原型
3. 构造函数的隐式原型 为 Function的显式原型 或 Function的隐式原型

继承关系 

null -> __object__ -> foo
           |
           -> __function__ -> function Bar
                        |
                        -> Function 实例Function(自己跟自己形成蛋生鸡关系)

prototype 只有构造函数才有, 实例没有