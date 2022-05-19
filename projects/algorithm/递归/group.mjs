/*
 * @Author: zhuzheng013
 * @Date: 2022-05-13 18:49:27
 * @LastEditors: zhuzheng013
 * @LastEditTime: 2022-05-13 19:07:49
 * @Description: file content
 * @FilePath: /algorithm/递归/group.mjs
 */
function group(arr, result = []) {
  for (let i = 0; i<arr.length; i++) {
    const item = arr[i]
    merge(result, item)
  }
  return result
}
function merge(result, item) {
  const cache = [[item]]
  for (let i =0 ; i<result.length; i++) {
    cache.push([...result[i], item])
  }
  result.push(...cache)
  return result
}

console.log(group([1, 2, 3, 4]))