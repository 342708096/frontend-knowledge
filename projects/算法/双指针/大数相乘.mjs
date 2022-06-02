/**
 * 43. 字符串相乘
给定两个以字符串形式表示的非负整数 num1 和 num2，返回 num1 和 num2 的乘积，它们的乘积也表示为字符串形式。

注意：不能使用任何内置的 BigInteger 库或直接将输入转换为整数。

 

示例 1:

输入: num1 = "2", num2 = "3"
输出: "6"
示例 2:

输入: num1 = "123", num2 = "456"
输出: "56088"
 

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
 var multiply = function(num1, num2) {
    const result = new Array(num1.length + num2.length).fill(0)
    let  k=result.length-1, l = k
    for (let i=num1.length-1; i>=0; i--) {
        for (let j=num2.length-1; j>=0; j--) {
            let product = (num1.charAt(i) * num2.charAt(j))// 自动类型转换
            result[l] += product
            if (result[l] >= 10) {
                result[l-1] +=  (result[l] / 10) | 0
                result[l] %=  10
            } 
            l--
        }
        k--
        l=k
    }
    while(!result[0] && result.length > 1) {
        result.shift()
    }
    return result.join('')
};

console.log(multiply('0', '0'))