function throttle(fn, time) {
    let lastTime = 0
    let timer
    return function(...params) {
        const now = Date.now()
        const remaining = Math.min(lastTime + time - now, time)

        if (remaining <= 0) {
            if (timer) {
                clearTimeout(timer)
            }
            lastTime = now
            timer = null
            fn.call(this, ...params)
        } else if (!timer) { // 如果没有别的定时器
            timer = setTimeout(() => {
                fn.call(this, ...params)
                timer = null
                lastTime = Date.now()
            }, remaining)
        }
    }
}


let i = 1
function fn() {
    console.log(i++, Date.now())
}
const throttleFn = throttle(fn, 1000)

let flag = setInterval(throttleFn, 700)

setTimeout(() => {
    clearInterval(flag)
}, 10 * 1000)
