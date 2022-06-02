/*
 * @Author: zhuzheng013
 * @Date: 2022-05-20 15:26:26
 * @LastEditors: zhuzheng013
 * @LastEditTime: 2022-05-20 16:11:50
 * @Description: file content
 * @FilePath: /frontend-knowledge/projects/algorithm/递归/defineArray.mjs
 */
/**
 * 声明一个数组
 * @param {*} filled 默认填充的数值
 * @param  {...any} sizes 维度和尺寸
 */
export function defineArray(filled, ...sizes) {
  if (sizes.length === 1) {
    return new Array(sizes[0]).fill(filled)
  }
  const [size, ...next] = sizes
  return new Array(size).fill(0).map(() => defineArray(filled, ...next))
}


console.log(defineArray(0, 2, 3, 4))