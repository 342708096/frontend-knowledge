/*
 * @Author: zhuzheng013
 * @Date: 2022-05-20 22:39:52
 * @LastEditors: zhuzheng013
 * @LastEditTime: 2022-05-20 22:49:14
 * @Description: file content
 * @FilePath: /frontend-knowledge/projects/algorithm/位运算/powerOfTwo.mjs
 */
/**
 * 给你一个整数 n，请你判断该整数是否是 2 的幂次方。如果是，返回 true ；否则，返回 false 。

如果存在一个整数 x 使得 n == 2x ，则认为 n 是 2 的幂次方。

 

示例 1：

输入：n = 1
输出：true
解释：20 = 1
示例 2：

输入：n = 16
输出：true
解释：24 = 16
示例 3：

输入：n = 3
输出：false
示例 4：

输入：n = 4
输出：true
示例 5：

输入：n = 5
输出：false
 

提示：

-231 <= n <= 231 - 1
 

进阶：你能够不使用循环/递归解决此问题吗？

来源：力扣（LeetCode）
链接：https://leetcode.cn/problems/power-of-two
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
 */

var isPowerOfTwo = function(n) {
  if (n <= 0) {
    return false
  }
  //      n -> ...100010000...
  //     ~n -> ...011101111...
  //     -n -> ...011110000... -n === ~n + 1
  // n & -n -> ...000010000...返回了只有一个1的数字
  if ((n & -n) === n) {
    return true
  }
  return false
};