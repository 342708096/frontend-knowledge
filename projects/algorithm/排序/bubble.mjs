/*
 * @Author: zhuzheng013
 * @Date: 2022-05-13 14:41:17
 * @LastEditors: zhuzheng013
 * @LastEditTime: 2022-05-17 16:12:37
 * @Description: 冒泡排序, 时间复杂度O(n²), 空间复杂度O(1)
 * @FilePath: /algorithm/排序/bubble.mjs
 */
import {swap} from '../位运算/xor.mjs'

function bubbleSort(arr) {
  if (arr.length <= 1) {
    return arr
  } 
  for (let i = 0; i<arr.length - 1; i++) {
    // 保证最左边换到的是最小的
    for (let j = i + 1; j<arr.length; j++) {
      if (arr[i] > arr[j]) {
        swap(arr, i, j)
      }
    }
  }
  return arr
}

console.log(bubbleSort([3, 2 ,6, 4, 1]))