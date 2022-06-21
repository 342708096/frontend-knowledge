function perm(arr) {
    const result = []
    backTracking(arr, arr.length, result)
    return result
}


function backTracking (arr, count, result = [], path = []) {
    if (path.length === count) {
        result.push(path.slice())
        return
    }

    for (let i = 0; i< arr.length; i++) {
        path.push(arr[i])
        backTracking([...arr.slice(0, i),...arr.slice(i+1)], count, result, path)
        path.pop()
        // 剪枝操作
        while (arr[i+1] === arr[i]) {
            i++
        }
    }
}

console.log(perm([1, 1, 2]))