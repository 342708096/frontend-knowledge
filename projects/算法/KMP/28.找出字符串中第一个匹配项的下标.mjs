/**
 * 给你两个字符串 haystack 和 needle ，请你在 haystack 字符串中找出 needle 字符串的第一个匹配项的下标（下标从 0 开始）。如果 needle 不是 haystack 的一部分，则返回  -1 。

 

示例 1：

输入：haystack = "sadbutsad", needle = "sad"
输出：0
解释："sad" 在下标 0 和 6 处匹配。
第一个匹配项的下标是 0 ，所以返回 0 。
示例 2：

输入：haystack = "leetcode", needle = "leeto"
输出：-1
解释："leeto" 没有在 "leetcode" 中出现，所以返回 -1 。
 

提示：

1 <= haystack.length, needle.length <= 104
haystack 和 needle 仅由小写英文字符组成

来源：力扣（LeetCode）
链接：https://leetcode.cn/problems/find-the-index-of-the-first-occurrence-in-a-string
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
 */

function getPrefixSuffixMatchTable(sequence) {
  const pi = new Array(sequence.length).fill(0);
  for (let i = 1, j = 0; i < sequence.length; i++) {
      while (j > 0 && sequence[i] !== sequence[j]) {
          j = pi[j - 1];
      }
      if (sequence[i] == sequence[j]) {
          j++;
      }
      pi[i] = j;
  }
  return pi
}

/**
 * @param {string} haystack
 * @param {string} needle
 * @return {number}
 */
 var strStr = function(haystack, needle) {
  const n = haystack.length, m = needle.length;
    if (m === 0) {
        return 0;
    }
    const pi = getPrefixSuffixMatchTable(needle);
    for (let i = 0, j = 0; i < n; i++) {
        while (j > 0 && haystack[i] != needle[j]) {
            j = pi[j - 1]; // 一直回退直到j===0
        }
        if (haystack[i] == needle[j]) {
            j++;
        }
        if (j === m) {
            return i - m + 1;
        }
    }
    return -1;
};


console.log(strStr("mississippi",
"issip"))
