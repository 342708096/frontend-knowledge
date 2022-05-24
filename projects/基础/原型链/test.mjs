Function.prototype.a = () => console.log(1)
Object.prototype.b = () => console.log(2)

function A(){}
var a = new A()

A.b() // 2
A.a() // 1
a.b() // 2
a.a() // is not function

// __function__.a = () => console.log(1)
// __object__.b = () => console.log(2)
// 函数的原型对象是__function__ 所以 A.b()  打印2
// __function__.__proto__ === __object__所以A.a() 打印1
// 对象的原型对象是__object__, 所以a.b() 打印2
// 对象的原型对象不存在a方法, 故调用失败

