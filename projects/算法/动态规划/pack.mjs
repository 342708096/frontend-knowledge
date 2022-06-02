/*
 * @Author: zhuzheng013
 * @Date: 2022-05-15 00:40:58
 * @LastEditors: zhuzheng013
 * @LastEditTime: 2022-05-15 18:47:01
 * @Description: file content
 * @FilePath: /algorithm/动态规划/pack.mjs
 */
/**
 * 动态规划: 如果你发现有重复调用的过程, 在算过过程把答案记下来, 共下次直接使用
 * 背包问题
 * w: [1, 2, 5, 6, 7]
 * v: [1, 6, 18, 22, 28]
 * size: 10
 */
/**
 * 
 * @param {*} w 重量数组
 * @param {*} v 价值数组
 * @param {*} size 包大小
 * return 最大价值
 */
function pack(w, v, size) {
  return process(w, v, 0, size)
}

function process(w, v, i, left) {
  if (i>= w.length) {
    return 0
  }
  if (left < 0) {
    return 0
  }
  const weight = w[i]
  const value = v[i]
  if (weight > left) {
    // 则只能选择不放
    return process(w, v, i+1, left)
  }
  const putIn = value + process(w, v, i + 1, left - weight)
  const noPutIn = process(w, v, i+1, left)
  return Math.max(putIn, noPutIn)
} 

console.log(pack([1, 2, 5, 6, 7, 0], [1, 6, 18, 22, 28, 1], 10))