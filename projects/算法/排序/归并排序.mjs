/*
 * @Author: zhuzheng013
 * @Date: 2022-05-13 18:10:58
 * @LastEditors: zhuzheng013
 * @LastEditTime: 2022-05-14 15:33:11
 * @Description: file content
 * @FilePath: /algorithm/排序/mergeSort.mjs
 */

// 递归方式的时间复杂度算法 T(N) = a*T(N/b) + O(N^d)
// 1) log(b, a) > d 复杂度为O(N^log(b, a))
// 3) log(b, a) < d 复杂度为O(N^d)
// 2) log(b, a) = d 复杂度为O(N^d * logN)
function mergeSort(arr, low, high) {
  if (low >= high) {
    return arr
  }
  const middle = low + ((high -  low) >>> 1)
  mergeSort(arr, low, middle)
  mergeSort(arr, middle + 1, high)
  merge(arr, low, high, middle)
  return arr
}

function merge(arr, low, high, middle) {
  const cache = new Array(high - low + 1)
  let cacheIndex = 0 // 缓存器指针, 初始设置为0
  let leftIndex = low; // 左指针
  let rightIndex = middle + 1; // 右指针
  while(leftIndex <= middle && rightIndex <= high) {
    // 哪边值小取哪个
    cache[cacheIndex++] = arr[leftIndex] <= arr[rightIndex] ? arr[leftIndex++] : arr[rightIndex++]
  }
  while(leftIndex <= middle) {
    // 说明左边还有剩余
    cache[cacheIndex++] = arr[leftIndex++]
  }
  while(rightIndex <= high) {
    // 说明右边还有剩余
    cache[cacheIndex++] = arr[rightIndex++]
  }
  // 最后拷贝到原数组
  copy(cache, arr, low)
}

function copy(source, target, low) {
  for (let i=0; i<source.length; i++) {
    target[low + i] = source[i]
  }
}


console.log(mergeSort([4, 1, 2, 8, 0, 7, 3, 5, 6], 0 , 8))