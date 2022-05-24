/**
 * 给你一个按升序排序的整数数组 num（可能包含重复数字），请你将它们分割成一个或多个长度至少为 3 的子序列，其中每个子序列都由连续整数组成。

如果可以完成上述分割，则返回 true ；否则，返回 false 。

 

示例 1：

输入: [1,2,3,3,4,5]
输出: True
解释:
你可以分割出这样两个连续子序列 : 
1, 2, 3
3, 4, 5
示例 2：

输入: [1,2,3,3,4,4,5,5]
输出: True
解释:
你可以分割出这样两个连续子序列 : 
1, 2, 3, 4, 5
3, 4, 5
示例 3：

输入: [1,2,3,4,4,5]
输出: False
 

提示：

1 <= nums.length <= 10000

来源：力扣（LeetCode）
链接：https://leetcode.cn/problems/split-array-into-consecutive-subsequences
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
 */

/**
 * @param {number[]} nums
 * @return {boolean}
 */
 var isPossible = function(nums) {
    return process(nums, 0, nums.length - 1)
};

function process(nums, l, r) {
    if (r - l + 1 < 3) {
        return false
    }
    let redundant = []
    for (let i=l+1; i<=r; i++) {
        if (nums[i] = nums[i-1]) {
            redundant.push(nums[i])
        } else if (num[i] > nums[i-1] + 1) {
            if (redundant.length === 0) {
                return process(nums, i, r)
            }
            return process(redundant, 0, redundant.length-1) && process(nums, i, r)
        }
    }
    if (redundant.length) {
        return process(redundant, 0, redundant.length-1)
    }
    return true
}

console.log(isPossible([1,2,3,4,4,5]))