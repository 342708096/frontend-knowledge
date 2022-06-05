function debounce(fn, time) {
    let timer
    return function(...params) {
        if (timer) {
            clearTimeout(timer)
        }
        timer = setTimeout(() => {
            fn.call(this, ...params)
            timer = null
        }, time)
    }
}