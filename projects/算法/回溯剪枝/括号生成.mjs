/**
 * 数字 n 代表生成括号的对数，请你设计一个函数，用于能够生成所有可能的并且 有效的 括号组合。

 

示例 1：

输入：n = 3
输出：["((()))","(()())","(())()","()(())","()()()"]
示例 2：

输入：n = 1
输出：["()"]
 

提示：

1 <= n <= 8

来源：力扣（LeetCode）
链接：https://leetcode.cn/problems/generate-parentheses
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
 */

var generateParenthesis = function(n) {
    const result = []
    backTracking( n, [], 0, result)
    return result
};

function backTracking(count = 3, path = [], score = 0, result = []){
    if (path.length === count * 2) {
        if (score === 0) {
            result.push(path.join(''))
        }
        return
    }
    if (score === count) {
        path.push(')')
        score--
        backTracking(count, path, score, result)
        path.pop()
    } else if (score === 0) {
        path.push('(')
        score++
        backTracking(count, path, score, result)
        path.pop()
    } else {
        const arr = ['(', ')']
        for (let i=0; i<2; i++) {
            let nextScore = score, originScore = score
            if (i === 0){
                nextScore += 1
            } else {
                nextScore -= 1
            }
            path.push(arr[i])
            score = nextScore
            backTracking( count, path, score, result)
            path.pop()
            score = originScore
        }
    }
    }


console.log(generateParenthesis(3))