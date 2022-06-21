/**
 * 给定两个整数 n 和 k，返回范围 [1, n] 中所有可能的 k 个数的组合。

你可以按 任何顺序 返回答案。

 

示例 1：

输入：n = 4, k = 2
输出：
[
  [2,4],
  [3,4],
  [2,3],
  [1,2],
  [1,3],
  [1,4],
]
示例 2：

输入：n = 1, k = 1
输出：[[1]]
 

提示：

1 <= n <= 20
1 <= k <= n

来源：力扣（LeetCode）
链接：https://leetcode.cn/problems/combinations
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
 */

var combine = function(n, k) {
    const result = []
    backTracking(n, k, 1, [], result)
    return result
};

function backTracking(n, k, index = 1, path = [], result = []) {
    // 收集条件
    if (path.length === k) {
        // 使用新对象
        result.push(path.slice())
        return
    }
    // 剪枝操作也可以在循环内使用
    // 目标终点
    const need = k - path.length 
    const final = n - need + 1
    for (let i=index; i<= final; i++) {
        path.push(i)
        backTracking(n, k, i+1, path, result)
        // 回溯
        path.pop()
    }
}

console.log(combine(4, 2))