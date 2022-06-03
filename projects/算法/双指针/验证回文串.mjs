/**
 * 125. 验证回文串
给定一个字符串，验证它是否是回文串，只考虑字母和数字字符，可以忽略字母的大小写。

说明：本题中，我们将空字符串定义为有效的回文串。

 

示例 1:

输入: "A man, a plan, a canal: Panama"
输出: true
解释："amanaplanacanalpanama" 是回文串
示例 2:

输入: "race a car"
输出: false
解释："raceacar" 不是回文串
 

提示：

1 <= s.length <= 2 * 105
字符串 s 由 ASCII 字符组成
 */

/**
 * @param {string} s
 * @return {boolean}
 */
 var isPalindrome = function(s) { 
    s = s.replace(/[^A-Za-z0-9]+/g, '').replace(/[A-Za-z0-9]+/g, (s) => s.toLowerCase())
    if (s.length === 1) {
        return true
    }
    let start = 0, end = s.length -1
    while(start < end) {
        if (s.charAt(start) !== s.charAt(end)) {
            return false
        }
        start++
        end--
    }
    return true
};

console.log(isPalindrome( "A man, a plan, a canal: Panama"))