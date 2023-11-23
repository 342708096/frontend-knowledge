Promise.resolve(1).then(2).then(Promise.resolve(3)).finally(() => 4).then(console.log, console.error)  // 1

Promise.resolve(1).then(() => Promise.reject(2)).finally(() => Promise.reject(3)).then(console.log, console.error)// finally 如果reject 则相当于then, 否则返回上一个promise的resolve
