1. 二分查找法

```
function binarySearch(arr, search, low, high ) {
	low = low || 0;
	high = high || arr.length - 1
	const mid = (low + high) >>> 1
	if (arr[mid] === search) {
		return mid;
	}
	if (mid < high && search > arr[mid]) {
		return binarySearch(arr,search, mid + 1, high);
	}
	if (low < mid && search < arr[mid]) {
		return binarySearch(arr, search, low, mid - 1, );
	}
	return null
}
```

2. 冒泡排序

```
function bubbleSort(arr, desc) {
    var i, len, j, temp;
    if (!arr || !arr.hasOwnProperty("length"))
        return;
    for (i = 0, len = arr.length; i < len; i++) {
        for (j = i + 1; j < len; j++) {
            if (desc ? arr[i] < arr[j] : arr[i] > arr[j]) {
                swap(arr, i, j);
            }
        }
    }
}
```

3. 快速排序

```
function quickSort(arr, low, high, desc) {
    var index;
    if (!arr || !arr.hasOwnProperty("length") || low >= high)
        return;
    index = onceSort(arr, low, high, desc);
    quickSort(arr, low, index - 1, desc);
    quickSort(arr, index + 1, high, desc);
}

/*一次快排*/
function onceSort(arr, low, high, desc) {
    var key = arr[low];
    while (low < high) {
        while ((desc ? arr[high] <= key : arr[high] >= key) && high > low) {
            high--;
        }
        arr[low] = arr[high];
        while ((desc ? arr[low] >= key : arr[low] <= key) && high > low) {
            low++;
        }
        arr[high] = arr[low];
    }
    arr[low] = key;
    return low;
}

function swap(arr, i, j) {
    var temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
}
```