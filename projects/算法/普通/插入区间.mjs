
/**
 * 给你一个 无重叠的 ，按照区间起始端点排序的区间列表。

在列表中插入一个新的区间，你需要确保列表中的区间仍然有序且不重叠（如果有必要的话，可以合并区间）。

 

示例 1：

输入：intervals = [[1,3],[6,9]], newInterval = [2,5]
输出：[[1,5],[6,9]]
示例 2：

输入：intervals = [[1,2],[3,5],[6,7],[8,10],[12,16]], newInterval = [4,8]
输出：[[1,2],[3,10],[12,16]]
解释：这是因为新的区间 [4,8] 与 [3,5],[6,7],[8,10] 重叠。
示例 3：

输入：intervals = [], newInterval = [5,7]
输出：[[5,7]]
示例 4：

输入：intervals = [[1,5]], newInterval = [2,3]
输出：[[1,5]]
示例 5：

输入：intervals = [[1,5]], newInterval = [2,7]
输出：[[1,7]]

来源：力扣（LeetCode）
链接：https://leetcode.cn/problems/insert-interval
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
 */

/**
 * @param {number[][]} intervals
 * @param {number[]} newInterval
 * @return {number[][]}
 */
 var insert = function(intervals, newInterval) {
    const result = []
    let merged = false
    intervals.forEach((interval) => {
      if (canMerge(interval, newInterval)) {
        newInterval = merge(interval, newInterval)
      } else if (!merged && interval[0] > newInterval[1]) {
        result.push(newInterval)
        result.push(interval)
        merged = true
      }else {
        result.push(interval)
      }
    })
    if (!merged) {
      result.push(newInterval)
    }
    return result
  };
  
  function merge(arr1, arr2) {
    return [Math.min(arr1[0], arr2[0]), Math.max(arr1[1], arr2[1])]
  }
  
  function canMerge(arr1, arr2) {
    if (arr1[1] < arr2[0]){
      return false
    } else if (arr2[1] < arr1[0]) {
      return false
    } else {
      return true
    }
  }