// 比较两个字符串是否存在包含关系

// 例如 字符串 'ABCEBDDWE' 是否包含 'ABD'

// 1. 先计算部分匹配表对targetStr

function kmpTargetMap(targetStr) {
    let prefix = []
    let suffix = []
    let partMatch = []

    for (let i = 0, j = targetStr.length; i < j; i++) {
        let newStr = targetStr.slice(0, i + 1)
        if  (newStr.length === 1) {
            partMatch[i] = 0
        } else {
            for (let k = i - 1; k >= 0; k--) {
                prefix[k] = newStr.slice(0, k + 1)
                suffix[k] = newStr.slice(-k-1)
                if (prefix[k] === suffix[k]) {
                    partMatch[i] = prefix[k].length
                    break
                }
            }
            if (!partMatch[i]) {
                partMatch[i] = 0
            }
        }

    }
    return partMatch
}

//demo

console.log(kmpTargetMap('AAAAAA'));

// 回退算法

function kmp(source, target) {
    let map = kmpTargetMap(target)
    console.log(map)
    for(let i = 0; i < source.length;) {
        for (let j = 0; j < target.length; ) {
            if (source.charAt(i + j) === target.charAt(j)) {
                // 先判断收敛情况
                if (j === target.length - 1) {
                    return i
                } else {
                    j ++
                }

            } else {
                // 需要查表来确定需要平移多少位
                // 移动位数 = 已匹配的字符数 - 对应的部分匹配值
                let move = 1 // 至少移动一位
                if (j >= 1) {
                  move = j - map[j - 1]
                }
                console.log(`当前索引为${i}, 已匹配${j},匹配值为${target.slice(0, j)}, 需要右移动${move}`)
                i += move
                break
            }
        }
    }
    return -1
}

console.log(kmp('BBC ABCDAB ABCDABCDABDE', 'ABCDABC'))