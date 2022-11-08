
// 1. 求前后缀匹配表

/**
 * 获取字符串对应的每一个位置的最长前后缀匹配表
 * @param {} sequence 
 * @return 最长前后缀表
 */
function getPrefixSuffixMatchTable(sequence) {
  const length = sequence.length
  const table = new Array(length).fill(-1) // 默认用-1填充
  for (let i = 1; i < length; ++i) {
    let j = table[i - 1]; // 前一位的最长匹配长度-1(下标)
    // 这里保存长度-1的目的是为了和坐标映射
    // 当找到前一位的最长匹配长度(下标)但是当前和j+1不等时
    while(j !== -1 && sequence[j+1] !== sequence[i]) {
      // j 回退到上一级匹配位置, * 回退算法
      j = table[j]
    }
    if (sequence[j + 1] === sequence[i]) {
      table[i] = j + 1
    }
  }
  return table
} 

// console.log(getPrefixSuffixMatchTable('AAbAAA')) // [ -1, 0, -1, 0, 1, 1 ]

/**
 * 给你一个字符串 sequence ，如果字符串 word 连续重复 k 次形成的字符串是 sequence 的一个子字符串，那么单词 word 的 重复值为 k 。单词 word 的 最大重复值 是单词 word 在 sequence 中最大的重复值。如果 word 不是 sequence 的子串，那么重复值 k 为 0 。

给你一个字符串 sequence 和 word ，请你返回 最大重复值 k 。

 

示例 1：

输入：sequence = "ababc", word = "ab"
输出：2
解释："abab" 是 "ababc" 的子字符串。
示例 2：

输入：sequence = "ababc", word = "ba"
输出：1
解释："ba" 是 "ababc" 的子字符串，但 "baba" 不是 "ababc" 的子字符串。
示例 3：

输入：sequence = "ababc", word = "ac"
输出：0
解释："ac" 不是 "ababc" 的子字符串。
 

提示：

1 <= sequence.length <= 100
1 <= word.length <= 100
sequence 和 word 都只包含小写英文字母。

来源：力扣（LeetCode）
链接：https://leetcode.cn/problems/maximum-repeating-substring
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
 */
function maxRepeating(sequence, word) {
  const index = sequence.indexOf(word[0])
  if (index === -1) {
    return 0
  }
  // 1. 先求前后缀匹配表
  const matchTable = getPrefixSuffixMatchTable(word)
  // 2. sequence在每个位置的结果表
  const length = sequence.length
  const resultTable = new Array(length).fill(0)
  for (let i = 0, j = 0; i < length; ) {
    // 第一次一定是等于的
    if (word[j] === sequence[i]) {
      
      if (j === word.length - 1) {
        resultTable[i] = (i >= word.length ? resultTable[i-word.length]: 0) +1;
        j = matchTable[j]
        ++i
        continue
      }
      ++j;
      ++i;
    } else if (j!== 0){
      j = matchTable[j]
    } else {
      ++i
    }
  }
  console.log(resultTable)
}


maxRepeating('abababaa', 'ba')