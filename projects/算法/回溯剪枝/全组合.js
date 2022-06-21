// 求一个数组的全组合

function group(arr) {
    const result = []
    backTracking(arr, 0, [], result)
    return result
}

function backTracking(arr, index, path, result){
    if (path.length) {
        result.push(path.slice())
    }
    for (let i = index; i<arr.length; i++) {
        const current = arr[i]
        path.push(current)
        backTracking(arr, i+1, path, result)
        path.pop()
        while(arr[i+1] === arr[i]) {
            i++
        }
    }
}

console.log(group([1,2,3]))