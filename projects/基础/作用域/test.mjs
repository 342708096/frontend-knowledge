var b = 10;
(function b(){
    b = 20;
    console.log(b); 
})(); // TypeError: Assignment to constant variable.
// 函数作用域 由内而外查找最近的作用域链, 找到IIFE函数本身, 由于IIFE函数具有const属性所以赋值报错