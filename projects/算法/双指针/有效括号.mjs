function isValid(s) {
    s = s.replace(/[^\{\}\[\]\(\)]/g, '')
    let score = 0, stack = []
    for (let i=0; i<s.length;i++) {
        const char = s[i]
        if (char === '{' || char === '[' || char === '(') {
            stack.push(char)
            score++
        } else {
            stack.push(char)
            score--
            if (score === 0) {
                let result = validate(stack, levelMap[stack[0]])
                if (result === false) {
                    return false
                }
                stack.length = 0
            }
        }
    }
    return true
}

const levelMap = {
    '{': 3,
    '}': 3,
    '[': 2,
    ']': 2,
    '(': 1,
    ')': 1
}

function validate(stack, level = 3) {
    stack = stack.slice(1, -1)
    if (stack.length === 0) {
        return true
    }
    for (let i =0; i<stack.length; i++) {
        if (levelMap[stack[i]] >= level) {
            return false
        }
    }
    return isValid(stack.join(''))
}