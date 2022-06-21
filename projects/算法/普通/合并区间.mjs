/**
 * 以数组 intervals 表示若干个区间的集合，其中单个区间为 intervals[i] = [starti, endi] 。请你合并所有重叠的区间，并返回 一个不重叠的区间数组，该数组需恰好覆盖输入中的所有区间 。

 

示例 1：

输入：intervals = [[1,3],[2,6],[8,10],[15,18]]
输出：[[1,6],[8,10],[15,18]]
解释：区间 [1,3] 和 [2,6] 重叠, 将它们合并为 [1,6].
示例 2：

输入：intervals = [[1,4],[4,5]]
输出：[[1,5]]
解释：区间 [1,4] 和 [4,5] 可被视为重叠区间。
 

提示：

1 <= intervals.length <= 104
intervals[i].length == 2
0 <= starti <= endi <= 104

来源：力扣（LeetCode）
链接：https://leetcode.cn/problems/merge-intervals
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
 */

/**
 * @param {number[][]} intervals
 * @return {number[][]}
 */
 var merge = function(intervals) {
    // 先按照开始时间排序
    intervals = intervals.sort((a,b) => a[0] - b[0])
    // 进行两两reduce
    return intervals.reduce((prev, next) => {
        if (prev.length === 0) {
            prev.push(next)
            return prev
        }
        const last = prev[prev.length - 1]
        // [1, 2] [3, 4]
        if (last[1] < next[0]) {
            prev.push(next)
            return prev
        }
        // [1, 5] [2, 3]
        last[1] = Math.max(next[1], last[1])
        return prev
    }, [])
};

console.log(merge([[1,3],[2,6],[8,10],[15,18]]))