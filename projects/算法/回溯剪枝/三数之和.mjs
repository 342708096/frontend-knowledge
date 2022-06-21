function threeSum(arr) {
    arr = arr.sort((a,b) => a-b)
    let result = []
    backTracking(arr, 0, 3, [], result)
    return result
}

function backTracking(arr, index, count = 3, path, result) {
    if (path.length === count) {
        if (path.reduce((a, b) => a + b) === 0) {
            result.push(path.slice())
        }
        return
    }
    // 剪枝
    if (count - path.length > arr.length - index) {
        return
    }
    for (let i=index; i<arr.length;i++) {
        path.push(arr[i])
        backTracking(arr, i+1, count, path, result)
        path.pop()
        while (arr[i+1] === arr[i]) {
            i++
        }
    }
}

console.log(threeSum([-1,0,1,2,-1,-4]))