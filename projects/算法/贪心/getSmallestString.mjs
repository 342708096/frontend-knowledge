/*
 * @Author: zhuzheng013
 * @Date: 2022-05-19 15:50:04
 * @LastEditors: zhuzheng013
 * @LastEditTime: 2022-05-19 16:16:38
 * @Description: file content
 * @FilePath: /algorithm/贪心/getSmallestString.mjs
 */
/**
 * 小写字符 的 数值 是它在字母表中的位置（从 1 开始），因此 a 的数值为 1 ，b 的数值为 2 ，c 的数值为 3 ，以此类推。

字符串由若干小写字符组成，字符串的数值 为各字符的数值之和。例如，字符串 "abe" 的数值等于 1 + 2 + 5 = 8 。

给你两个整数 n 和 k 。返回 长度 等于 n 且 数值 等于 k 的 字典序最小 的字符串。

注意，如果字符串 x 在字典排序中位于 y 之前，就认为 x 字典序比 y 小，有以下两种情况：

x 是 y 的一个前缀；
如果 i 是 x[i] != y[i] 的第一个位置，且 x[i] 在字母表中的位置比 y[i] 靠前。
 

示例 1：

输入：n = 3, k = 27
输出："aay"
解释：字符串的数值为 1 + 1 + 25 = 27，它是数值满足要求且长度等于 3 字典序最小的字符串。
示例 2：

输入：n = 5, k = 73
输出："aaszz"
 

来源：力扣（LeetCode）
链接：https://leetcode.cn/problems/smallest-string-with-a-given-numeric-value
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
 */

var getSmallestString = function(n, k) {
  if (n === k) {
    return new Array(n).fill('a').join('')
  }
  if (n === 1) {
    return fromCharCode(k)
  }
  // 如果想让前面绝对小, 因为总体的和不变, 那么后面应该绝对大
  // 如果大于等于25, 那么最后一定是z
  if (k - n + 1 >= 26) {
    return getSmallestString(n - 1, k - 26) + 'z'
  }
  const lastChar = fromCharCode(k - n + 1)
  return new Array(n - 1).fill('a').join('') + lastChar
};

function fromCharCode(code) {
  // 1 -> a, 2 -> b
  return String.fromCharCode(code + 96)
}

console.log(getSmallestString(3, 27))