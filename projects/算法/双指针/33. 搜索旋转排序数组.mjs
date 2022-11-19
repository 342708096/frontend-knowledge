/**
 * 整数数组 nums 按升序排列，数组中的值 互不相同 。

在传递给函数之前，nums 在预先未知的某个下标 k（0 <= k < nums.length）上进行了 旋转，使数组变为 [nums[k], nums[k+1], ..., nums[n-1], nums[0], nums[1], ..., nums[k-1]]（下标 从 0 开始 计数）。例如， [0,1,2,4,5,6,7] 在下标 3 处经旋转后可能变为 [4,5,6,7,0,1,2] 。

给你 旋转后 的数组 nums 和一个整数 target ，如果 nums 中存在这个目标值 target ，则返回它的下标，否则返回 -1 。

你必须设计一个时间复杂度为 O(log n) 的算法解决此问题。



示例 1：

输入：nums = [4,5,6,7,0,1,2], target = 0
输出：4
示例 2：

输入：nums = [4,5,6,7,0,1,2], target = 3
输出：-1
示例 3：

输入：nums = [1], target = 0
输出：-1


提示：

1 <= nums.length <= 5000
-104 <= nums[i] <= 104
nums 中的每个值都 独一无二
题目数据保证 nums 在预先未知的某个下标上进行了旋转
-104 <= target <= 104

来源：力扣（LeetCode）
链接：https://leetcode.cn/problems/search-in-rotated-sorted-array
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
 */

/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
 var search = function(nums, target) {
  const mid = findBreakPoint(nums), right = nums[nums.length - 1] , left = nums[0], max = nums[mid], min = nums[mid+1]

  if (mid === -1) {
    return binarySearch(nums, 0, nums.length - 1, target)
  }

  if (target > max) {
    return -1
  }
  if (target < min) {
    return -1
  }

  if (target >= left) {
    return binarySearch(nums, 0, mid, target)
  }
  if (target <= right) {
    return binarySearch(nums, mid+1, nums.length-1, target)
  }
  return -1
};

function findBreakPoint(nums) {
 for (let i=0, j=1; j<nums.length; i++, j++) {
   if (nums[i] > nums[j]) {
     return i
   }
 }
 return -1
}


function binarySearch(arr, left,right,target) {
 if (left > right) {
   return -1
 }
 const mid = left + ((right - left) >> 2)
 if (arr[mid] === target) {
   return mid
 }
 if (arr[mid] > target) {
   return binarySearch(arr, left, mid-1, target)
 }
 return binarySearch(arr, mid+1, right, target)
}
