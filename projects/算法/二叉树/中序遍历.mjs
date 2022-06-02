/**
 * 左根右
 * 
 * 中根遍历
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
 * @return {number[]}
 */
 var inorderTraversal = function(root) {
    return process(root)
};

function process(node, result=[]) {
    if (node === null) {
        return result
    }
    process(node.left, result)
    result.push(node.val)
    process(node.right, result)
    return result
}