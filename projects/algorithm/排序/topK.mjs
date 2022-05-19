/*
 * @Author: zhuzheng013
 * @Date: 2022-05-19 10:26:55
 * @LastEditors: zhuzheng013
 * @LastEditTime: 2022-05-19 11:49:26
 * @Description: file content
 * @FilePath: /algorithm/排序/topK.mjs
 */
/**
 * 求出数组最大的K个数
 */

import { swap } from "../位运算/xor.mjs"

function topK(arr, k) {
  return quickSort(arr, 0 , arr.length - 1, k)
}

function quickSort(arr, low, high, k) {
  while (high - low + 1 > k) {
    const middle = low + (Math.random() * (high - low + 1)) | 0
    swap(arr, middle, high)
    const middleArr = patition(arr, low, high)
    const maxCount = high - middleArr[0] + 1
    const minCount = high - middleArr[1] + 1
    if (minCount === k || maxCount === k) {
      return arr.slice(-k)
    }
    if (minCount < k && maxCount > k) {
      return arr.slice(-k)
    }
    if (minCount > k) {
      return quickSort(arr, middleArr[1] + 1, high, k)
    }
    return [].concat(quickSort(arr, low, middleArr[0] - 1, k-minCount), arr.slice(-minCount))
  }
  return arr.slice(-k)
}

function patition(arr, low, high) {
  let target =  arr[high], leftBorder = low, rightBorder = high - 1, i = low
  while (i <= rightBorder) {
    if (arr[i] < target) {
      swap(arr, i++, leftBorder++)
    } else if (arr[i] === target) {
      i++
    } else {
      swap(arr, i, rightBorder--)
    }
  }
  swap(arr, rightBorder + 1, high)
  return [leftBorder, rightBorder + 1]
}

console.log(topK([3,2,1,5,6,4], 2)) // [5 6]