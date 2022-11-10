
const signSet = ['+', '-', '*', '/']
function basicCalculator(str) {
    let num = 0
    let preSign = '+'
    const stack = []
    for (let i = 0; i<str.length; i++) {
        const char = str[i]
        if (char >= '0' && char <= '9') {
            num = num * 10 + Number(char)
        }
        if (signSet.includes(char) || i === str.length - 1) {
            if (preSign === '+') {
                stack.push(num)
            } else if (preSign === '-') {
                stack.push(-num)
            } else if (preSign === '*') {
                stack.push(stack.pop() * num)
            } else {
                stack.push(stack.pop() / num | 0)
            }
            preSign = char
            num = 0
        }

    }
    return stack.reduce((a, b) => a + b, 0)
}

function seniorCalculator(str) {
    if (!str.includes('(') && !str.includes(')')) {
        return basicCalculator(str)
    }
    let score = 0, stack = [], preStack = []
    for (let i = 0; i<str.length; i++) {
        const char = str[i]
        if (char === '(') {
            stack.push('(')
            score++
        } else if (char === ')') {
            stack.push(')')
            score--
            if (score === 0) {
                preStack.push(seniorCalculator(stack.slice(1, -1).join('')))
                stack.length = 0
            } else if (score < 0) {
                throw new Error('format error')
            }
        } else if (score === 0){
            preStack.push(char)
        } else {
            stack.push(char)
        }
    }
    if (score !== 0) {
        throw new Error('format error')
    }
    return basicCalculator(preStack.join(''))
}

console.log(basicCalculator('3 +5 / 2'))

console.log(seniorCalculator('(3+5)*(2+10/3)'))