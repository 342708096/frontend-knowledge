/**
 * 根左右
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
 var preorderTraversal = function(root) {
    return process(root)
};

function process(node, result=[]) {
    if (node === null) {
        return result
    }
    result.push(node.val)
    process(node.left, result)
    process(node.right, result)
    return result
}