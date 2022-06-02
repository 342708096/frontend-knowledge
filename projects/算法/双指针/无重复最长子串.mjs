/**
 * 
 * 给定一个字符串 s ，请你找出其中不含有重复字符的 最长子串 的长度。

 

示例 1:

输入: s = "abcabcbb"
输出: 3 
解释: 因为无重复字符的最长子串是 "abc"，所以其长度为 3。
示例 2:

输入: s = "bbbbb"
输出: 1
解释: 因为无重复字符的最长子串是 "b"，所以其长度为 1。
示例 3:

输入: s = "pwwkew"
输出: 3
解释: 因为无重复字符的最长子串是 "wke"，所以其长度为 3。
     请注意，你的答案必须是 子串 的长度，"pwke" 是一个子序列，不是子串。
 

提示：

0 <= s.length <= 5 * 104
s 由英文字母、数字、符号和空格组成

来源：力扣（LeetCode）
链接：https://leetcode.cn/problems/longest-substring-without-repeating-characters
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
 */

/**
 * @param {string} s
 * @return {number}
 */
 var lengthOfLongestSubstring = function(s) {
    let start = 0, end=0, longest = 0, length = s.length
    let set = new Set()
    while(start < length && end < length) {
        const char = s.charAt(end)
        if (!set.has(char)) {
            set.add(char)
            end++
        } else {
            longest = Math.max(longest, set.size)
            set.delete(s.charAt(start))
            start++
        }
    }
    longest = Math.max(set.size, longest)
    return longest
}


console.log(lengthOfLongestSubstring("dvdf"))