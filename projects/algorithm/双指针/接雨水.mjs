/**
 * 给定 n 个非负整数表示每个宽度为 1 的柱子的高度图，计算按此排列的柱子，下雨之后能接多少雨水。

 

示例 1：



输入：height = [0,1,0,2,1,0,1,3,2,1,2,1]
输出：6
解释：上面是由数组 [0,1,0,2,1,0,1,3,2,1,2,1] 表示的高度图，在这种情况下，可以接 6 个单位的雨水（蓝色部分表示雨水）。 
示例 2：

输入：height = [4,2,0,3,2,5]
输出：9
 

提示：

n == height.length
1 <= n <= 2 * 104
0 <= height[i] <= 105

来源：力扣（LeetCode）
链接：https://leetcode.cn/problems/trapping-rain-water
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
 */

/**
 * @param {number[]} height
 * @return {number}
 */
 var trap = function(height) {
    let left = 0, right= height.length - 1
    while(height[left] === 0 && height[right] === 0 && left < right) {
        left++
        right--
    }
    return process(height, left, right)
};


function process(height, left, right) {
    if (left >= right - 1) {
        return 0
    } 
    let total = 0
    if (height[left] <= height[right]) {
        for (let i = left +1; i< right; i++) {
            if (height[i] < height[left]) {
                total += height[left] - height[i]
            } else {
                return total + process(height, i, right)
            }
        }
    } else {
        for (let i = right - 1; i>left; i--) {
            if (height[i] < height[right]) {
                total += height[right] - height[i]
            } else {
                return total + process(height, left, i)
            }
        }
    }
    return total
}

console.log(trap([4,2,0,3,2,5]))