/*
 * @Author: zhuzheng013
 * @Date: 2022-05-19 16:30:12
 * @LastEditors: zhuzheng013
 * @LastEditTime: 2022-05-19 16:46:33
 * @Description: file content
 * @FilePath: /algorithm/二叉树/levelOrder.mjs
 */
/**
 * 给你二叉树的根节点 root ，返回其节点值的 层序遍历 。 （即逐层地，从左到右访问所有节点）。

 

示例 1：


输入：root = [3,9,20,null,null,15,7]
输出：[[3],[9,20],[15,7]]
示例 2：

输入：root = [1]
输出：[[1]]
示例 3：

输入：root = []
输出：[]

来源：力扣（LeetCode）
链接：https://leetcode.cn/problems/binary-tree-level-order-traversal
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
 */

/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number[][]}
 */
 var levelOrder = function(root) {
  return process([root])
};

function process(group, result = []) {
  let hasNotNull = false
  let currentResult = []
  group.forEach(item => {
    if (item) {
      hasNotNull = true
      currentResult.push(item.val ?? null)
    }    
  })
  if (hasNotNull) {
    result.push(currentResult)
    const nextLevel = group.reduce((a, b) => a.concat(b?.left ?? [], b?.right ?? []), [])
    return process(nextLevel, result)
  }
  return result
}