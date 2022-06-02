function BinaryTree(val) {
    this.value = val;
    this.left = null;
    this.right = null;
}
BinaryTree.prototype.toString = function () {
    return (this.left ? this.left.toString(): '') +  this.value + (this.right ? this.right.toString() : '');
}

BinaryTree.prototype.pushVal = function pushVal(val) {
    pushNode(this, new BinaryTree(val))
    return this;
}

BinaryTree.prototype.find = function find(val) {
    if (this.value === val) {
        return this;
    }
    if (this.value > val) {
        if (!this.left) {
            return null
        }
        return this.left.find(val)
    } else {
        if (!this.right) {
            return null
        }
        return this.right.find(val)
    }
}

function pushNode(current, node) {
    if (!node) {
        return
    }
    if (current.value >= node.value) {
        // 放左边
        if (!current.left) {
            current.left = node
        } else {
            pushNode(current.left, node)
        }
    } else {
        // 放右边
        if (!current.right) {
            current.right = node
        } else {
            pushNode(current.right, node)
        }
    }
}

function generateTree(arr) {
    var head = new BinaryTree(arr[0]), i;
    for (i = 1; i< arr.length; i++) {
        head.pushVal(arr[i]);
    }
    return head;
}




console.log(generateTree([2,3,6,5,8,0,9]).find(6))
