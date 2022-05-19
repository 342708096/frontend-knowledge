/*
 * @Author: zhuzheng013
 * @Date: 2022-05-14 15:40:05
 * @LastEditors: zhuzheng013
 * @LastEditTime: 2022-05-14 16:31:27
 * @Description: 求数组逆序对
 * @FilePath: /algorithm/排序/reversePair.mjs
 */
function reversePair(arr, low, high, sum=[]) {
  // 先考虑边界条件
  if (low >= high) {
    return sum
  }
  const middle = low + ((high - low) >>> 1)
  reversePair(arr, low, middle, sum)
  reversePair(arr, middle + 1, high, sum)
  merge(arr, low, high, middle, sum)
  return sum
}

function merge(arr, low, high, middle, sum) {
  const cache = new Array(high - low + 1)
  let cacheIndex = 0
  let leftIndex = low
  let rightIndex = middle + 1
  while(leftIndex <= middle && rightIndex <= high) {
    if (arr[leftIndex] > arr[rightIndex]) {
      // [3, 2] [1, 0] => [3, 1] [3, 0] [2, 1] [2, 0]
      calc(arr, leftIndex, rightIndex, high, sum)
      cache[cacheIndex++] = arr[leftIndex++]
      // 左边大于右边则产生逆序对
    } else {
      cache[cacheIndex++] = arr[rightIndex++]
    }
  }
  while(leftIndex <= middle) {
    // 说明左边还有剩余
    cache[cacheIndex++] = arr[leftIndex++]
  }
  while(rightIndex <= high) {
    // 说明右边还有剩余
    cache[cacheIndex++] = arr[rightIndex++]
  }
  // 将cache拷贝回原数组
  copyArr(cache, arr, low)
}

function copyArr(source, target, low) {
  for (let i = 0; i< source.length; i++) {
    target[low + i] = source[i]
  }
}

function calc(arr, left, right, end, sum) {
  for (let i=right; i<=end; i++) {
    sum.push([arr[left], arr[i]])
  }
}

console.log(reversePair([3, 2, 4, 5, 0], 0, 4))
// [ [ 3, 2 ], [ 5, 0 ], [ 4, 0 ], [ 3, 0 ], [ 2, 0 ] ]