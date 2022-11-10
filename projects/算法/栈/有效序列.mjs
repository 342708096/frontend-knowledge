/**
 * 对 (a-b)cd(e-f(h-i)g-k) 这样的字符串按括号成组配对并展示

(a-b)
(e-f(h-i)g-k)
(h-i)
顺序不重要
 */

function resolve(str, result=[]) {
    const stack = [] 
    let score = 0
    for (let i=0; i<str.length; i++) {
      const char = str[i]
      if (char === '(' ) {
        stack.push(char)
        score++
      } else if (char === ')') {
        stack.push(char)
        score--
        if (score < 0) {
          throw new Error('format error')
        }
        if (score === 0) {
          result.push(stack.join(''))
          resolve(stack.slice(1,-1).join(''), result)
          stack.length = 0
        } 
      } else if (score > 0){
        stack.push(char)
      }
    }
    return result
  }
  
  console.log(resolve('((a-b)cd(e-f(h-i)g-k))'))