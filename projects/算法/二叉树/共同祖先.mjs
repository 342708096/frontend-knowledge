var lowestCommonAncestor = function(root, p, q) {
    if (contains(root, p) && contains(root, q)) {
      return lowestCommonAncestor(root.left, p, q) || lowestCommonAncestor(root.right, p, q) || root
    } else {
      return null
    }
};


function contains(root, node) {
  if (root === null) {
    return false
  }
  if (root === node) {
    return true
  }
  let lret = contains(root.left, node)
  if (lret) {
    return true
  }
  let rret = contains(root.right, node)
  return rret
}