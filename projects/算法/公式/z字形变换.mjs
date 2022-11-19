/**
 * 将一个给定字符串 s 根据给定的行数 numRows ，以从上往下、从左到右进行 Z 字形排列。

比如输入字符串为 "PAYPALISHIRING" 行数为 3 时，排列如下：

P   A   H   N
A P L S I I G
Y   I   R
之后，你的输出需要从左往右逐行读取，产生出一个新的字符串，比如："PAHNAPLSIIGYIR"。

请你实现这个将字符串进行指定行数变换的函数：

string convert(string s, int numRows);
 

示例 1：

输入：s = "PAYPALISHIRING", numRows = 3
输出："PAHNAPLSIIGYIR"
示例 2：
输入：s = "PAYPALISHIRING", numRows = 4
输出："PINALSIGYAHRPI"
解释：
P     I    N
A   L S  I G
Y A   H R
P     I
示例 3：

输入：s = "A", numRows = 1
输出："A"
 

提示：

1 <= s.length <= 1000
s 由英文字母（小写和大写）、',' 和 '.' 组成
1 <= numRows <= 1000

来源：力扣（LeetCode）
链接：https://leetcode.cn/problems/zigzag-conversion
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
 */

/**
 * @param {string} s
 * @param {number} numRows
 * @return {string}
 */
 var convert = function(s, numRows) {
  if (numRows === 1 || numRows >= s.length) {
    return s
  }
  const step = numRows + numRows - 2
  let result = ''
  for (let i = 0, step1 =step, step2 = 0, multi=0; i<numRows; i++, multi=0, step1 -=2, step2 += 2) {
    while (true) {
      if (multi === 0) {
        result += s[i]
      }
      else if (step2 ===0 ) {
        const nextIndex1 = i + step1*multi
        if (nextIndex1 >= s.length) {
          break
        }
        result += s[i + step1*multi]
      }
      else if (step1 === 0) {
        const nextIndex2 = i + step2*multi
        if (nextIndex2 >= s.length) {
          break
        }
        result += s[i + step2*multi]
      }
      else {
        const nextIndex1 = i + step1*multi + step2*(multi-1)
        const nextIndex2 = nextIndex1 + step2
        if (nextIndex1 >= s.length) {
          break
        }
        result += s[nextIndex1]
        if (nextIndex2 >= s.length) {
          break
        }
        result += s[nextIndex2]
      }
      multi++
    }

  }
  return result
};
