/*
 * @Author: zhuzheng013
 * @Date: 2022-05-14 15:40:05
 * @LastEditors: zhuzheng013
 * @LastEditTime: 2022-05-19 10:30:40
 * @Description: 求数组小和, 利用归并排序
 * @FilePath: /algorithm/排序/smallSum.mjs
 */
function smallSum(arr, low, high, sum={current: 0}) {
  // 先考虑边界条件
  if (low >= high) {
    return sum.current
  }
  const middle = low + ((high - low) >>> 1)
  smallSum(arr, low, middle, sum)
  smallSum(arr, middle + 1, high, sum)
  merge(arr, low, high, middle, sum)
  return sum.current
}

function merge(arr, low, high, middle, sum) {
  const cache = new Array(high - low + 1)
  let cacheIndex = 0
  let leftIndex = low
  let rightIndex = middle + 1
  while(leftIndex <= middle && rightIndex <= high) {
    if (arr[leftIndex] < arr[rightIndex]) {
      cache[cacheIndex] = arr[leftIndex]
      // 左边小于右边, 则产生小和, 其他情形不产生小和
      // [1, 2]  [3, 4] 则产生 两个1 和 两个2
      sum.current += arr[leftIndex] * (high - rightIndex + 1)
      leftIndex++
      cacheIndex++
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

console.log(smallSum([1, 3, 4, 2, 5], 0, 4))