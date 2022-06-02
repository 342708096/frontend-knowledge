/*
 * @Author: zhuzheng013
 * @Date: 2022-05-16 19:24:53
 * @LastEditors: zhuzheng013
 * @LastEditTime: 2022-05-17 20:42:15
 * @Description: file content
 * @FilePath: /algorithm/动态规划/checkValidString.mjs
 */
/**
 * 给定一个只包含三种字符的字符串：（ ，） 和 *，写一个函数来检验这个字符串是否为有效字符串。有效字符串具有如下规则：

任何左括号 ( 必须有相应的右括号 )。
任何右括号 ) 必须有相应的左括号 ( 。
左括号 ( 必须在对应的右括号之前 )。
* 可以被视为单个右括号 ) ，或单个左括号 ( ，或一个空字符串。
一个空字符串也被视为有效字符串。
示例 1:

输入: "()"
输出: True
示例 2:

输入: "(*)"
输出: True
示例 3:

输入: "(*))"
输出: True
注意:

字符串大小将在 [1，100] 范围内。

来源：力扣（LeetCode）
链接：https://leetcode.cn/problems/valid-parenthesis-string
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
 */

var checkValidString = function(s) {
  // 未匹配的左括号, 最小数量和最大数量
  let min = 0, max = 0;
  for (let i=0; i<s.length; i++) {
    const char = s.charAt(i)
    if (char === '(') {
      min++
      max++
    } else if (char === ')') {
      min = Math.min(min - 1, 0)
      max--
      if (max < 0) {
        // 说明此时没有匹配的左括号了
        return false
      }
    } else {
      // 当成)时
      min = Math.min(min - 1, 0)
      // 当成(时
      maxCount++
    }
  }
  return min === 0
};
