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
    const countMap = new Map();
    const endMap = new Map();
    for (const x of nums) {
        const count = (countMap.get(x) || 0) + 1;
        countMap.set(x, count);
    }
    for (const x of nums) {
        const count = countMap.get(x) || 0;
        if (count > 0) {
            const prevEndCount = endMap.get(x - 1) || 0;
            // 优先往前贪心
            if (prevEndCount > 0) {
                countMap.set(x, count - 1);
                endMap.set(x - 1, prevEndCount - 1);
                endMap.set(x, (endMap.get(x) || 0) + 1);
            } else {
                // 前面贪不成再考虑后面
                const count1 = countMap.get(x + 1) || 0;
                const count2 = countMap.get(x + 2) || 0;
                if (count1 > 0 && count2 > 0) {
                    countMap.set(x, count - 1);
                    countMap.set(x + 1, count1 - 1);
                    countMap.set(x + 2, count2 - 1);
                    endMap.set(x + 2, (endMap.get(x + 2) || 0) + 1);
                } else {
                    return false;
                }
            }
        }
    }
    return true;
};
