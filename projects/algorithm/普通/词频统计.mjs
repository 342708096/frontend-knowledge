//输入。['ab', 'c', 'd', 'ab', 'c'] ====》输出 ['ab1', 'c1', 'd', 'ab2', 'c2']


function process(arr) {
    const map = new Map()
    const result = new Array(arr.length)
    for (let i=0; i<arr.length;i++) {
        const str = arr[i]
        if (map.has(str)) {
            map.get(str).push(i)
        } else {
            map.set(str, [i])
        }
    }
    map.forEach((indexes, str) => {
        if (indexes.length > 1) {
            indexes.forEach((i, index) => {
                result[i] = str + (index + 1)
            })
        } else {
            result[indexes[0]] = str
        }
    })
    return result
}

console.log(process(['ab', 'c', 'd', 'ab', 'c']))