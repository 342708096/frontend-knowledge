/*
 * @Author: zhuzheng013
 * @Date: 2022-05-15 15:39:08
 * @LastEditors: zhuzheng013
 * @LastEditTime: 2022-05-17 15:23:17
 * @Description: file content
 * @FilePath: /algorithm/排序/heapSort.mjs
 */
/**
 * 大根堆: 父节点永远比子节点大, 顺序: 按照顺序逐级向下排列
 * 求父节点: ~~(i - 1)/2,  ~~取整数位置
 * 求左下孩子: index * 2 + 1
 * 求右下孩子: index * 2 + 2
 */

import { swap } from "../位运算/xor.mjs";

/**
 * 某个数现在处在index位置, 继续往上继续移动, 如果比父节点大, 则交换
 * 只用于构建大根堆
 * @param {*} arr 大根堆
 * @param {*} index 处在的位置
 */
function heapInsert(arr, index) {
  while(arr[index] > arr[~~((index - 1) / 2)]) {
    swap(arr, index, ~~((index - 1) / 2))
    index = ~~((index - 1) / 2)
  }
}
/**
 * 将值插入堆任意位置, 任其自然下落的过程, 通常index为0
 * @param {*} arr 
 * @param {*} index 
 * @param {*} heapSize 
 */
function heapify(arr, index, heapSize) {
  // 左孩子下标
  let leftIndex = index * 2 + 1
  // 右孩子下标
  let rightIndex = leftIndex + 1
  while (leftIndex < heapSize) {
    // 和孩子比较
    let largestIndex = (rightIndex < heapSize && arr[rightIndex] > arr[leftIndex]) ? rightIndex : leftIndex
    // 和父比较
    largestIndex = arr[index] > arr[largestIndex] ? index : largestIndex
    if (largestIndex === index) {
      break;
    }
    swap(arr, largestIndex, index)
    // 继续向下heapify
    index = largestIndex
    leftIndex = index * 2 + 1
    rightIndex = leftIndex + 1
  }
}
// 复杂度 N * logN
function heapSort(arr) {
  if (arr.length < 2) {
    return
  }
  for (let i=arr.length-1; i>=0; i--){
    heapify(arr, i, arr.length)
  }
   // 此时数组已调整为大根堆的结构
  let heapSize = arr.length
  // 将堆顶和堆尾交换, 因为堆顶一定是最大值
  swap(arr, 0, --heapSize)
  while (heapSize > 0) {
    heapify(arr, 0, heapSize)
    swap(arr, 0, --heapSize)
  }
}

const toBeSorted = [4, 1, 2, 8, 0, 7, 3, 5, 6]
console.log(toBeSorted)

/**
 * 堆排序扩展题
 * 已知一个几乎有序的数组, 几乎有序是指, 如果把数组排好顺序的话, 每个元素移动的距离
 * 可以不超过k, 并且k相对于数组来说比较小. 请选择一个合适的排序算法针对这个数据进行排序
 * 
 * 分析: 可以构建一个heapSize 为k 的小根堆, 然后
 */