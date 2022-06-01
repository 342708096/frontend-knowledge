/*
 * @Author: zhuzheng013
 * @Date: 2022-05-13 14:57:08
 * @LastEditors: zhuzheng013
 * @LastEditTime: 2022-05-17 18:30:20
 * @Description: file content
 * @FilePath: /algorithm/排序/quick.mjs
 */

import { swap } from "../位运算/xor.mjs"

/**
 * 数组在下标low ~ high 范围内的一次快排, 结果: 使第一项的值排到合适的位置
 * @param {*} arr 被快排的数组
 * @param {*} low 下标low
 * @param {*} high 小标high
 */
function quickSort(arr, low, high) {
  if (low < high) {
    swap(arr, low + (Math.random() * (high - low + 1)) | 0, high)
    const p = patition(arr, low, high)
    quickSort(arr, low, p[0] - 1)
    quickSort(arr, p[1] + 1, high)
  }
}
/**
 * 
 * @param {*} arr 
 * @param {*} l 
 * @param {*} r 
 * @return 返回目标值的左右边界
 */
function patition(arr, l, r) {
  // 小于区的右边界 + 1, 大于区的左边界 - 1
  let less = l, more = r - 1, target = arr[r], targetIndex = r
  while(l <= more) {
    if (arr[l] < target) {
      // 如果 item 小于目标值, 则让 item 和小于区的右边界交换
      swap(arr, l++, less++)
    } else if (arr[l] > target) {
      // 如果 item 大于目标值, 则让 item 和 大于区的左边界交换
      // 此时还没判断换过来的值, 故l指针不需要动
      swap(arr, l, more--)
    } else {
      // 相等的时候
      l++
    }
  }
  // 最终 less 为 目标值的左边界, more 为 目标值的右边界
  swap(arr, more + 1, targetIndex)
  return [less, more + 1]
}

const toBeSorted = [4, 1, 2, 8, 6, 0, 7, 3, 5, 8]
console.log(quickSort(toBeSorted, 0, 9))
console.log(toBeSorted)