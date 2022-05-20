/*
 * @Author: zhuzheng013
 * @Date: 2022-05-20 20:32:26
 * @LastEditors: zhuzheng013
 * @LastEditTime: 2022-05-20 20:55:50
 * @Description: file content
 * @FilePath: /frontend-knowledge/projects/algorithm/图/trie.mjs
 */
/**
 * Trie（发音类似 "try"）或者说 前缀树 是一种树形数据结构，用于高效地存储和检索字符串数据集中的键。这一数据结构有相当多的应用情景，例如自动补完和拼写检查。

请你实现 Trie 类：

Trie() 初始化前缀树对象。
void insert(String word) 向前缀树中插入字符串 word 。
boolean search(String word) 如果字符串 word 在前缀树中，返回 true（即，在检索之前已经插入）；否则，返回 false 。
boolean startsWith(String prefix) 如果之前已经插入的字符串 word 的前缀之一为 prefix ，返回 true ；否则，返回 false 。
 

示例：

输入
["Trie", "insert", "search", "search", "startsWith", "insert", "search"]
[[], ["apple"], ["apple"], ["app"], ["app"], ["app"], ["app"]]
输出
[null, null, true, false, true, null, true]

解释
Trie trie = new Trie();
trie.insert("apple");
trie.search("apple");   // 返回 True
trie.search("app");     // 返回 False
trie.startsWith("app"); // 返回 True
trie.insert("app");
trie.search("app");     // 返回 True
 

提示：

1 <= word.length, prefix.length <= 2000
word 和 prefix 仅由小写英文字母组成
insert、search 和 startsWith 调用次数 总计 不超过 3 * 104 次

来源：力扣（LeetCode）
链接：https://leetcode.cn/problems/implement-trie-prefix-tree
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
 */

var Trie = function() {
  this.p = 0
  this.e = 0
  // 如果字符种类特别多, 那么next可以换成hash表
  this.next = new Array(26).fill(null)
};

/** 
 * @param {string} word
 * @return {void}
 */
Trie.prototype.insert = function(word) {
  if (word === '') {
    return 
  }
  let node = this
  node.p++
  for (let i=0; i< word.length; i++) {
    const charIndex = word.charCodeAt(i) - 'a'.charCodeAt()
    if (!node.next[charIndex]) {
      node.next[charIndex] = new Trie()
    }
    node = node.next[charIndex]
    node.p++
  }
  node.e++
};

/** 
 * @param {string} word
 * @return {boolean}
 */
Trie.prototype.search = function(word) {
  let node = this
  for (let i=0; i< word.length; i++) {
    const charIndex = word.charCodeAt(i) - 'a'.charCodeAt()
    if (!node.next[charIndex]) {
      return false
    }
    node = node.next[charIndex]
  }
  if (node.e === 0) {
    return false
  }
  return true
};

/** 
 * @param {string} prefix
 * @return {boolean}
 */
Trie.prototype.startsWith = function(prefix) {
  let node = this
  for (let i=0; i< prefix.length; i++) {
    const charIndex = prefix.charCodeAt(i) - 'a'.charCodeAt()
    if (!node.next[charIndex]) {
      return false
    }
    node = node.next[charIndex]
  }
  return true
};