/**
 * 左右根
 */

 var postorderTraversal = function(root) {
    return process(root)
};


function process(node, result=[]) {
    if (node === null) {
        return result
    }
    process(node.left, result)
    process(node.right, result)
    result.push(node.val)
    return result
}