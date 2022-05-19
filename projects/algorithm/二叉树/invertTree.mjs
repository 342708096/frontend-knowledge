/*
 * @Author: zhuzheng013
 * @Date: 2022-05-19 17:11:49
 * @LastEditors: zhuzheng013
 * @LastEditTime: 2022-05-19 17:14:56
 * @Description: file content
 * @FilePath: /algorithm/二叉树/invertTree.mjs
 */
/**
 * 给你一棵二叉树的根节点 root ，翻转这棵二叉树，并返回其根节点。

 

示例 1：



输入：root = [4,2,7,1,3,6,9]
输出：[4,7,2,9,6,3,1]
示例 2：



输入：root = [2,1,3]
输出：[2,3,1]
示例 3：

输入：root = []
输出：[]

来源：力扣（LeetCode）
链接：https://leetcode.cn/problems/invert-binary-tree
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
 * @return {TreeNode}
 */
 var invertTree = function(root) {
  if (root) {
    const left = invertTree(root.left)
    const right = invertTree(root.right)
    root.left = right
    root.right = left
  }
  return root
};