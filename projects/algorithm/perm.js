// 实现对一个数组的全排列

function perm(arr, ret = [], pre = []){
    let length = arr.length
    if (!length) {
        ret.push(pre)
        return ret
    }

    for (let i = 0; i < length; i++) {
        let left = [...arr]
            left.splice(i, 1)
        perm(left, ret, pre.concat(arr[i]))
    }
    return ret
}

console.log(perm([1,2,3]))