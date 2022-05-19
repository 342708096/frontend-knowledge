import { swap } from "../位运算/xor.mjs"

/*
 * @Author: zhuzheng013
 * @Date: 2022-05-13 16:39:46
 * @LastEditors: zhuzheng013
 * @LastEditTime: 2022-05-13 16:51:52
 * @Description: 选择排序
 * @FilePath: /algorithm/排序/selection.mjs
 */
// 时间复杂度O(n²), 比冒泡的优点是交换次数有可能变少
function selectionSort(arr) {
  if (arr.length <= 1) {
    return arr
  }
  for (let i = 0; i<arr.length; i++) {
    let minIndex = i
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[j] < arr[minIndex]) {
        minIndex = j
      }
    }
    swap(arr, i, minIndex)
  }
  return arr
}

console.log(selectionSort([4, 1, 2, 8, 0, 7, 3, 5, 6]))