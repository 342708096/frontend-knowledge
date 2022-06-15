/**
 * 给你一个长度为 n 的整数数组 nums 和 一个目标值 target。请你从 nums 中选出三个整数，使它们的和与 target 最接近。

返回这三个数的和。

假定每组输入只存在恰好一个解。

 

示例 1：

输入：nums = [-1,2,1,-4], target = 1
输出：2
解释：与 target 最接近的和是 2 (-1 + 2 + 1 = 2) 。
示例 2：

输入：nums = [0,0,0], target = 1
输出：0
 

提示：

3 <= nums.length <= 1000
-1000 <= nums[i] <= 1000
-104 <= target <= 104

来源：力扣（LeetCode）
链接：https://leetcode.cn/problems/3sum-closest
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
 */

var threeSumClosest = function(nums, target) {
    return process(nums, 0, target)
};


function process(nums, i, similarTarget, restCount = 3, result = 0) {
    if (nums.length - i === restCount) {
        // 只能全要
        while(i<nums.length) {
            result += nums[i++]
        }
        return result
    }
    if (restCount === 1) {
        let min = Math.abs(result + nums[i] - similarTarget), minIndex = i
        if (min === 0) {
            return result + nums[minIndex]
        }
        i++
        while (i < nums.length) {
            const nextMin = Math.abs(result + nums[i] - similarTarget)
            if (nextMin < min) {
                min = nextMin
                minIndex = i
            }
            i++
        }
        return result + nums[minIndex]
    }
    // 要
    let ret1 = process(nums, i+1, similarTarget, restCount-1, result+nums[i])
    // 不要
    let ret2 = process(nums, i+1,similarTarget, restCount, result)
    if (Math.abs(ret1 - similarTarget) < Math.abs(ret2 - similarTarget)) {
        return ret1
    }
    return ret2
}

console.log(threeSumClosest([-55,-24,-18,-11,-7,-3,4,5,6,9,11,23,33], 0))