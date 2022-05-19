/*
 * @Author: zhuzheng013
 * @Date: 2022-05-19 11:22:01
 * @LastEditors: zhuzheng013
 * @LastEditTime: 2022-05-19 14:52:28
 * @Description: 最大的第K个
 * @FilePath: /algorithm/排序/findKthLargest.mjs
 */
/**
 * 给定整数数组 nums 和整数 k，请返回数组中第 k 个最大的元素。

请注意，你需要找的是数组排序后的第 k 个最大的元素，而不是第 k 个不同的元素。

 

示例 1:

输入: [3,2,1,5,6,4] 和 k = 2
输出: 5
示例 2:

输入: [3,2,3,1,2,4,5,5,6] 和 k = 4
输出: 4
 

提示：

1 <= k <= nums.length <= 104
-104 <= nums[i] <= 104

来源：力扣（LeetCode）
链接：https://leetcode.cn/problems/kth-largest-element-in-an-array
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
 */

import { swap } from "../位运算/xor.mjs"

var findKthLargest = function(nums, k) {
  if  (k > nums.length) {
    return null
  }
  return findKth(nums, 0, nums.length - 1, k)
}
// 查找l~h范围内, 第k大的数
function findKth(arr, l, h, k) {
  let middleIndex = l + (Math.random() * (h - l + 1)) | 0
  swap(arr, middleIndex, h)
  let [eqL, eqR] = patition(arr, l, h)
  let maxCount = h - eqL + 1
  let minCount = h - eqR + 1
  if (k >= minCount && k <= maxCount) {
    return arr[eqL]
  } else if (k < minCount) {
    return findKth(arr, eqR + 1, h, k)
  } else {
    return findKth(arr, l, eqL - 1, k - maxCount)
  }
}

function patition(arr, l, h) {
  let i = l, lBorder = l, hBorder = h - 1, target = arr[h]
  while(i <= hBorder) {
    if (arr[i] < target) {
      swap(arr, i++, lBorder++)
    } else if (arr[i] > target) {
      swap(arr, i, hBorder--)
    } else {
      i++
    }
  }
  swap(arr, ++hBorder, h)
  return [lBorder, hBorder]
}

console.log(findKthLargest([3,2,1,5,6,4],2)) // 5