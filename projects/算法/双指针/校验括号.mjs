/*
 * @Author: zhuzheng013
 * @Date: 2022-05-19 15:16:05
 * @LastEditors: zhuzheng013
 * @LastEditTime: 2022-05-19 15:35:44
 * @Description: file content
 * @FilePath: /algorithm/双指针/checkValidString.mjs
 */
/**
 * 
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
  let minNoPairCount = 0, maxNoPairCount = 0
  for (let i = 0; i<s.length; i++) {
    const char = s.charAt(i)
    if (char === '(') {
     minNoPairCount++
     maxNoPairCount++
    } else if (char === ')') {
     minNoPairCount = Math.max(0, minNoPairCount - 1)
     maxNoPairCount--
     if (maxNoPairCount < 0) {
       return false
     }
    } else {
      // 当成)
      minNoPairCount = Math.max(0, minNoPairCount - 1)
      // 当成(
      maxNoPairCount++
    }
  }
  return minNoPairCount === 0
};

