/*
 * @Author: zhuzheng013配
 * @Date: 2022-05-12 11:51:33
 * @LastEditors: zhuzheng013
 * @LastEditTime: 2022-05-19 14:38:12
 * @Description: 异或运算
 * @FilePath: /algorithm/位运算/xor.mjs
 */ 
/**
 * 异或运算的性质c           o
 * 满足交换律和结合律
 * a ^ b === b ^ a
 * 热,
 * (a ^ b) ^ c === a ^ (b ^ c)
 * 
 * a ^ 0 === a
 * a ^ a === 0
 */
                
/**
 * 应用1. 数组下标互换,需要注意, 该下标的引用地址不能一样
 * 优点: 节省内存, 提高运行效率
 * @param {*} arr 
 * @param {*} i 
 * @param {*} j 
 */
export function swap(arr, i, j) {
  // 这里最好加上这个判断
  if (i !== j) { 
    arr[i] = arr[i] ^ arr[j]
    arr[j] = arr[i] ^ arr[j]
    arr[i] = arr[i] ^ arr[j]
  }
}
