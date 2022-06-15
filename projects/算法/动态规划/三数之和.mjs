/**
 * 给你一个包含 n 个整数的数组 nums，判断 nums 中是否存在三个元素 a，b，c ，使得 a + b + c = 0 ？请你找出所有和为 0 且不重复的三元组。

注意：答案中不可以包含重复的三元组。

 

示例 1：

输入：nums = [-1,0,1,2,-1,-4]
输出：[[-1,-1,2],[-1,0,1]]
示例 2：

输入：nums = []
输出：[]
示例 3：

输入：nums = [0]
输出：[]
 

提示：

0 <= nums.length <= 3000
-105 <= nums[i] <= 105

来源：力扣（LeetCode）
链接：https://leetcode.cn/problems/3sum
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
 */

/**
 * @param {number[]} nums
 * @return {number[][]}
 */
 var threeSum = function(nums) {
    nums = nums.sort((a,b) => a - b) 
    const ret = []
    // -2 -1 0 1 2
    for (let i=0;i < nums.length;i++) {
      if (nums[i] > 0) {
        break
      }
      if(i > 0 && nums[i] === nums[i-1]) {
        continue;
      }
      let j = i +1, k = nums.length -1
      while (j < k) {
        const sum = nums[i] + nums[j] + nums[k]
        if ( sum === 0) {
          ret.push([nums[i], nums[j], nums[k]])
          while (j<k && nums[j] === nums[++j]){
          }
          while (j<k && nums[k] === nums[--k]){ 
          }
        } else if (sum < 0) {
          j++
        } else if (sum > 0) {
          k--
        }
      }
    }
    return ret
  };