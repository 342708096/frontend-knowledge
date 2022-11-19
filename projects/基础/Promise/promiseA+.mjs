

class Promise {
    state = 'pending' // fulfilled rejected
    value = undefined
    reason = undefined
    onResolvedCallbacks = []
    onRejectedCallbacks = []
    constructor(executor) {
        let resolve = value => {
            if (this.state === 'pending') {
                this.state = 'fulfilled'
                this.value = value
                this.onResolvedCallbacks.forEach(fn => fn())
            }
        }
        let reject = reason => {
            if (this.state === 'pending') {
                this.state = 'rejected'
                this.reason = reason
                this.onRejectedCallbacks.forEach(fn => fn())
            }
        }
        // 同步执行executor
        try {
            executor(resolve, reject)
        } catch (err) {
            reject(err)
        }
    }
    then(onfulfilled, onRejected) {
        // onfulfilled如果不是函数，就忽略onfulfilled，直接返回value
        onfulfilled = typeof onfulfilled === 'function' ? onfulfilled : value => value;
        // onRejected如果不是函数，就忽略onRejected，直接扔出错误
        onRejected = typeof onRejected === 'function' ? onRejected : err => { throw err };
         const nextPromise = new Promise((resolve, reject) => {
            const resolvefulfilled = () => {
                setTimeout(() => {
                    try {
                        const fulfilledPromise = onfulfilled(this.value)
                        resolvePromise(nextPromise, fulfilledPromise, resolve, reject)
                    } catch (e) {
                        reject(e)
                    }

                })
            }
            const rejectRejected = () => {
                setTimeout(() => {
                    try {
                        const rejectedPromise = onRejected(this.reason)
                        resolvePromise(nextPromise, rejectedPromise, resolve, reject)
                    } catch (e) {
                        reject(e)
                    }
                })
            }
            if (this.state === 'fulfilled') {
                resolvefulfilled()
            }
            else if (this.state === 'rejected') {
                rejectRejected()
            }
            else if (this.state === 'pending') {
                this.onResolvedCallbacks.push(resolvefulfilled)
                this.onRejectedCallbacks.push(rejectRejected)
            }
        })
        return nextPromise
    }
    catch(onRejected){
        return this.then(undefined, onRejected)
    }
    /**
     * 不会接收任何参数, settled的结果和上一次相同
     * 备注： 在finally回调中 throw（或返回被拒绝的promise）将以 throw() 指定的原因拒绝新的promise.
    */
    finally(callback){
        const stateGetter = () => {
            if (this.state === 'fulfilled') {
                return ['fulfilled', this.value]
            } else if (this.state === 'rejected') {
                return ['rejected', this.reason]
            }
        }
        const nextPromise = new Promise((resolve,reject) => {
            const handleCallback = () => {
                setTimeout(() => {
                    try {
                        const finallyPromise = callback()
                        resolveFinally(nextPromise, finallyPromise, stateGetter, resolve, reject)
                    } catch (e) {
                        reject(e)
                    }
                })
            }
            if (this.state === 'fulfilled' || this.state === 'rejected') {
                handleCallback()
            }
            else if (this.state === 'pending') {
                this.onResolvedCallbacks.push(handleCallback)
                this.onRejectedCallbacks.push(handleCallback)
            }
        })
        return nextPromise
    }
    static resolve(value) {
        return new Promise((resolve) => {
            resolve(value)
        })
    }
    static reject(err) {
        return new Promise ((resolve, reject) => {
            reject(err)
        })
    }
    /**
     * 谁先settled就返回谁的结果
     * @param {*} promises
     * @returns
     */
    static race(promises) {
        return new Promise((resolve, reject) => {
            for (let i=0; i<promises.length; i++) {
                promises[i].then(resolve, reject)
            }
        })
    }
    /**
     * 该方法返回一个新的promise对象，该promise对象在iterable参数对象里所有的promise对象都成功的时候才会触发成功，
     * 一旦有任何一个iterable里面的promise对象失败则立即触发该promise对象的失败。这个新的promise对象在触发成功状态以后，
     * 会把一个包含iterable里所有promise返回值的数组作为成功回调的返回值，顺序跟iterable的顺序保持一致；如果这个新的promise
     * 对象触发了失败状态，它会把iterable里第一个触发失败的promise对象的错误信息作为它的失败错误信息。
     * @param {*} promises
     * @returns
     */
    static all(promises) {
        const result = []
        let count = 0
        return new Promise((resolve, reject) => {
            for (let i =0; i<promises.length; i++) {
                // 块级作用域, 没有问题
                promises[i].then((data) => {
                    result[i] = data
                    if (++count === promises.length) {
                        resolve(result)
                    }
                }, reject)
            }
        })
    }
    /**
     * 举凡有一个成功就返回该成功的结果, 否则返回全部失败的Error
     * @param {*} promises
     */
    static any(promises) {
        const result = []
        let count = 0
        return new Promise((resolve, reject) => {
            for (let i=0; i<promises.length; i++) {
                promises[i].then(resolve, (reason) => {
                    result[i] = reason
                    if (++count === promises.length) {
                        reject(new AggregateError(result, 'All Promises rejected'))
                    }
                })
            }
        })
    }
    /**
     * 该方法返回一个在所有给定的promise都已经fulfilled或rejected后的promise，并带有一个对象数组，每个对象表示对应的promise结果
     */
    static allSettled(promises) {
        const result = []
        let count = 0
        return new Promise((resolve) => {
            for (let i=0; i<promises.length; i++) {
                promises[i].then(
                    (data) => {
                        result[i] = data
                        if (++count === promises.length) {
                            resolve(result)
                        }
                    },
                    (reason) => {
                        result[i] = reason
                        if (++count === promises.length) {
                            resolve(result)
                    }
                    }
                )
            }
        })
    }
}

function isPromise(promise) {
    if (promise != null && (typeof promise === 'object' || typeof promise === 'function')) {
        if (typeof promise.then === 'function') {
            return true
        }
    }
    return false
}

function resolvePromise(promise, returned, resolve, reject){
    // 循环引用报错
    if(promise === returned){
      return reject(new TypeError('Chaining cycle detected for promise'));
    }
    if (isPromise(returned)) {
        // 返回是promise则等待该promise resolve
        returned.then(nextReturned => {
            resolvePromise(promise, nextReturned, resolve, reject)
        }, reject)
    } else {
        resolve(returned)
    }
}


function resolveFinally(promise, returned, stateGetter, resolve, reject) {
    // 循环引用报错
    if(promise === returned){
        return reject(new TypeError('Chaining cycle detected for promise'));
    }
    if (isPromise(returned)) {
        returned.then(nextReturned => {
            resolveFinally(promise, nextReturned, stateGetter, resolve, reject)
        }, reject)
    } else {
        const [state, valueOrReason] = stateGetter()
        if (state === 'fulfilled') {
            resolve(valueOrReason)
        } else if (state === 'rejected') {
            reject(valueOrReason)
        }
    }
}



function promiseFactory(timeout, val, state = 'fulfilled') {
    return new Promise((resolve, reject) => {
        if (state === 'fulfilled') {
            setTimeout(resolve, timeout * 1000, val)
        } else {
            setTimeout(reject, timeout * 1000, val)
        }
    })
}

// Promise.all([promiseFactory(1, 1), promiseFactory(2, 2)]).then(res => { console.log(res) })

// Promise.reject(3).finally(() => {  throw  123 }).catch(console.log)



// promiseFactory(3, 3).finally(() => {  return  Promise.resolve(123) }).then(console.log)

// promiseFactory(3, 3, 'rejected').finally(() => {  return  Promise.resolve(123) }).then(console.log, console.log)

// promiseFactory(3, 3, 'rejected').finally(() => {  return  Promise.reject(123) }).then(console.log, console.log)
