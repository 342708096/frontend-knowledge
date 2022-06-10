/*
 * @Author: zhuzheng013
 * @Date: 2022-05-19 18:04:36
 * @LastEditors: zhuzheng013
 * @LastEditTime: 2022-05-19 18:18:11
 * @Description: file content
 * @FilePath: /algorithm/动态规划/climbStairs.mjs
 */
/**
 * 假设你正在爬楼梯。需要 n 阶你才能到达楼顶。

每次你可以爬 1 或 2 个台阶。你有多少种不同的方法可以爬到楼顶呢？

 

示例 1：

输入：n = 2
输出：2
解释：有两种方法可以爬到楼顶。
1. 1 阶 + 1 阶
2. 2 阶
示例 2：

输入：n = 3
输出：3
解释：有三种方法可以爬到楼顶。
1. 1 阶 + 1 阶 + 1 阶
2. 1 阶 + 2 阶
3. 2 阶 + 1 阶
 

提示：

1 <= n <= 45

来源：力扣（LeetCode）
链接：https://leetcode.cn/problems/climbing-stairs
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
 */

/**
 * @param {number} n
 * @return {number}
 */
 var climbStairs = function(n) {
  if (n === 1) {
    return 1
  }
  if (n === 2) {
    return 2
  }
  return climbStairs(n - 1) + climbStairs(n - 2)
};

console.log(climbStairs(4))

function dp(n) {
  if (n === 1) {
    return 1
  }
  if (n === 2) {
    return 2
  }
  let prev1 = 1, prev2 = 2
  for (let i = 3; i<= n; i++) {
    const next = prev1 + prev2
    prev1 = prev2 
    prev2 = next 
  }
  return prev2 
}