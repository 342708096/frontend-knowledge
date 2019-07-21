function onceQuickSort(arr, low, high) {
    let key = arr[low] // 默认取第一个为比较值
    while (low < high) {
        while (arr[high] >= key && low < high) {
            high--;
        }
        arr[low] = arr[high]
        while (arr[low] <= key && low < high) {
            low++;
        }
        arr[high] = arr[low]
    }
    // 此时 low === high
    arr[low] = key
    return low // 或者high
}

function quickSort(arr, low, high) {
    low = low || 0
    high = high || arr.length - 1
    if (low >= high) {
        return
    }
    let index = onceQuickSort(arr, low, high)
    quickSort(arr, low, index - 1)
    quickSort(arr, index + 1, high)
    return arr
}

// 快速排序时间复杂度 O(nlogn)

let arr = [4, 8, 2, 3, 6, 1, 5, 9, 7, 10]
quickSort(arr)
console.log(arr)