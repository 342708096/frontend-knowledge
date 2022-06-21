/**
 * 43. 字符串相加
给定两个以字符串形式表示的非负整数 num1 和 num2，返回 num1 和 num2 的和，它们的和也表示为字符串形式。

注意：不能使用任何内置的 BigInteger 库或直接将输入转换为整数。

 

示例 1:

输入: num1 = "2", num2 = "3"
输出: "5"
示例 2:

输入: num1 = "123", num2 = "456"
输出: "579"
 

提示：

1 <= num1.length, num2.length <= 200
num1 和 num2 只能由数字组成。
num1 和 num2 都不包含任何前导零，除了数字0本身。
 */

/**
 * @param {string} num1
 * @param {string} num2
 * @return {string}
 */
 var sum = function(num1, num2) {
    const maxLength = Math.max(num1.length, num2.length)
    const result = new Array( maxLength + 1).fill(0)
    for (let i=0; i< maxLength; i++) {
        let total = Number(num1[num1.length - 1 - i] || 0) + Number(num2[num2.length - 1 - i] || 0)
        result[result.length - 1 - i] += total
        if (result[result.length - 1 - i] >= 10) {
            result[result.length - 2 - i] += (result[result.length - 1 - i] / 10) | 0
            result[result.length - 1 - i] %=  10
        }
    }
    while(!result[0] && result.length > 1) {
        result.shift()
    }
    return result.join('')
};

console.log(sum('99', '999'))