function test() {
    return new Promise((resolve, reject) => {
        setTimeout(reject, 1000)
    })
}


let promise = test()

promise.then(()=> {
    console.log('resolve', 1)
}, () => {
    console.log('reject', 1)
})

promise.then(()=> {
    console.log('resolve', 2)
}, () => {
    console.log('reject', 2)
})

promise.then(()=> {
    console.log('resolve', 3)
}, () => {
    console.log('reject', 3)
})