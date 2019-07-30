// 求一个数组的全组合

function getGroup(arr, index = 0, group = []) {
    if (index < arr.length) {
        let patch = [[arr[index]]]

        for (let i = 0; i< group.length; i++) {
            patch.push(group[i].concat(arr[index]))
        }
        group.push(...patch)
        return getGroup(arr, index + 1, group)
    } else {
        return group
    }
}

console.log(getGroup([1,2,3]))