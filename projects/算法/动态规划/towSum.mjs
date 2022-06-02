/*
 * @Author: zhuzheng013
 * @Date: 2022-05-18 17:04:04
 * @LastEditors: zhuzheng013
 * @LastEditTime: 2022-05-19 10:21:29
 * @Description: file content
 * @FilePath: /algorithm/动态规划/towSum.mjs
 */
/**
 * 给定一个整数数组 nums 和一个整数目标值 target，请你在该数组中找出 和为目标值 target  的那 两个 整数，并返回它们的数组下标。

你可以假设每种输入只会对应一个答案。但是，数组中同一个元素在答案里不能重复出现。

你可以按任意顺序返回答案。

 

示例 1：

输入：nums = [2,7,11,15], target = 9
输出：[0,1]
解释：因为 nums[0] + nums[1] == 9 ，返回 [0, 1] 。
示例 2：

输入：nums = [3,2,4], target = 6
输出：[1,2]
示例 3：

输入：nums = [3,3], target = 6
输出：[0,1]
 

提示：

2 <= nums.length <= 104
-109 <= nums[i] <= 109
-109 <= target <= 109
只会存在一个有效答案
进阶：你可以想出一个时间复杂度小于 O(n2) 的算法吗？

来源：力扣（LeetCode）
链接：https://leetcode.cn/problems/two-sum
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
 */

var twoSum = function(nums, target) {
  return process(nums, target)
};

function process(nums, target, i =0, count = 2, result=[]) {
  const item = nums[i]
  // 不是最后一个的时候
  if (result.length < count - 1 && i < nums.length - 1) {
  // 要么是, 要么不是
    const result1 =  process(nums, target - item, i +1, count, [...result, i]) 
    if (result1.length === count) {
      return result1
    }
    return process(nums, target, i+1, count, result)
  }
  // 是最后一个的时候
  if (nums[i] === target) {
    return [...result, i]
  } else if (i < nums.length - 1) {
    return process(nums, target, i + 1, count, result)
  }
  return []
}

//[2,7,11,15]
//9

console.log(twoSum([2,7,11,15], 9)) // 0, 1