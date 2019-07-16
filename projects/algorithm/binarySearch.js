function binarySearch(arr, search, low, high) {
    low  = low || 0
    high = high || arr.length - 1

    const mid = low + ((high - low)>>> 1)

    if (arr[mid] === search) {
        return mid
    }
    if (mid < high && search > arr[mid]) {
        return binarySearch(arr, search, mid + 1,  high)
    }
    if (mid > low && search < arr[mid]) {
        return binarySearch(arr, search, low, mid - 1)
    }
    return null
}






console.log(binarySearch([1,2,3,4,5,6,7,8,9,10], 8))