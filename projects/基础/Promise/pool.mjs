function requestFactory(size = 3) {
    let count = 0
    const pool = []
    const exec = (url, resolve, reject) => {
        count++
        fetch(url).then(result => {
            count--
            resolve(result)
            if (count < size) {
               let fn = pool.shift()
               if (fn) {
                fn()
               }
            }
        }, reason => {
            count--
            reject(reason)
            if (count < size) {
                let fn = pool.shift()
                if (fn) {
                 fn()
                }
             }
        })
    }
    return function(url) {
        return new Promise((resolve, reject) => {
            if (count >= size) {
                pool.push(() => {exec(url, resolve, reject)})
                return
            }
            exec(url, resolve, reject)
        })
    }
}


function fetch(url) {
    return new Promise(resolve => setTimeout(() => {
        resolve(url)
    }, 1000))
}

const request = requestFactory(2)

request(1).then(console.log)
request(2).then(console.log)
request(3).then(console.log)
request(4).then(console.log)
request(5).then(console.log)
request(6).then(console.log)
request(7).then(console.log)