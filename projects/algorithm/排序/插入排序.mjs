import { swap } from "../位运算/xor.mjs"

/*
 * @Author: zhuzheng013
 * @Date: 2022-05-13 16:28:48
 * @LastEditors: zhuzheng013
 * @LastEditTime: 2022-05-17 16:06:31
 * @Description: 插入排序, 将后面的插入前面进行排序, 假设前面已经排好了
 * @FilePath: /algorithm/排序/insertion.mjs
 */
// 时间复杂度O(n²), 最好是n, 算法优于冒泡和选择排序

// 递归方式的时间复杂度算法 T(N) = a*T(N/b) + O(N^d)
// 1) log(b, a) > d 复杂度为O(N^log(b, a))
// 3) log(b, a) < d 复杂度为O(N^d)
// 2) log(b, a) = d 复杂度为O(N^d * logN)

function insertionSort(arr) {
  if (arr.length <= 1) {
    return arr
  }
  for (let i=1; i< arr.length; i++) {
    for (let j = i -1; j >=0; j--) {
      if (arr[j] > arr[j + 1]) {
        swap(arr, j, j+1)
      }
    }
  }
  return arr
}

console.log(insertionSort([4, 1, 2, 8, 0, 7, 3, 5, 6]))