/*
 * @Author: zhuzheng013
 * @Date: 2022-05-16 16:31:44
 * @LastEditors: zhuzheng013
 * @LastEditTime: 2022-05-16 18:05:05
 * @Description: 求二维数组规模
 * @FilePath: /algorithm/递归/d2ArraySize.mjs
 */

function process(m, n) {
  if (m <= 0 || n <= 0) {
    return 0
  }
  if (m === 1 && n >= 1) {
    return 1
  }
  if (n === 1 && m >= 1) {
    return 1
  }
  return 1 + process(m-2, n-2)
}
//  x x x x
//  x x x x
//  x x x x
// 顺时针遍历数组
function travel(arr, startX, endX, startY, endY) {
  if ((startX > endX) || (startY > endY)) {
    return 
  }
  let x = startX, y = startY

    while(y < endY) {
      console.log(arr[x][y])
      y++
    }
    while(x < endX) {
      console.log(arr[x][y])
      x++
    }
    while(y > startY) {
      console.log(arr[x][y])
      y--
    }
    while(x > startX) {
      console.log(arr[x][y])
      x--
    }

    travel(arr, ++startX, --endX, ++startY, --endY)
}

function genArr(m, n) {
  const column = new Array(m)
  let count = 0
  for (let i = 0; i< m; i++) {
    const row = new Array(n)
    column[i] = row
    for (let j = 0; j<n; j++) {
      row[j] = ++count
    }
  }
  return column
}
const arr = genArr(5, 4)
console.log('arr', arr)
travel(arr, 0, 4, 0, 3)