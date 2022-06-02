/**
 * 获得数组最小的k个数
 * @param arr
 * @param k
 */


function topK(arr, k) {
    if (k < 0) {
        return [];
    }
    if (k > arr.length) {
        return arr.slice()
    }
    arr = arr.slice(); // 浅拷贝防止修改原数组
    return quickSort(arr, 0, arr.length - 1, k)
}

function quickSort(arr, low, high, k) {
    if (low >= high) {
        return arr.slice(0, k);
    }
    let index = onceQuickSort(arr, low, high)
    if (index === k) {
        return arr.slice(0, k);
    }
    if (index < k) {
        return quickSort(arr, index + 1, high, k)
    }
    if (index > k) {
        return quickSort(arr, low, index - 1, k)
    }
}

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

console.log(topK([ 6, 1, 3, 2, 9, 10, 5, 7, 8, 4], 4))
