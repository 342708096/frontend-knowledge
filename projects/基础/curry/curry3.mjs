// function curry(fn, argsLength) {
//   const length = argsLength ?? fn.length
//   const collectArgs = []
//   return function collectFn(...args) {
//     collectArgs.push(args)
//     if (collectArgs.length >= length) {
//       return fn.apply(this.collectArgs)
//     }
//     return collectFn
//   }
// }
// 上面的写法, 其实有点问题, 因为相当于函数和收集的参数锁死了, 导致不能复用

function curry2(fn, argsLength) {
  argsLength ??= fn.length // 如果编译报错, 可以变成三元运算符
  return function(...args) {
    if (args.length >= argsLength) {
      return fn.apply(this, args)
    }
    // 产生一个新的函数
    return curry2(fn.bind(this, ...args), argsLength - args.length)
  }
}

(function test() {
  function add(a, b) {
    console.log(a + b)
  }

  const curryA = curry2(add)('a')
  curryA('b')
  curryA('c')
})()