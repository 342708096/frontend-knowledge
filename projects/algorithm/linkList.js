function LinkedList(value) {
    this.value = value;
    this.next = null;
}

LinkedList.prototype.toString = function() {
    return this.value + (this.next ?  ' -> ' + this.next.toString() : '');
}

LinkedList.prototype.popLast = function() {
    let current = this
    for (let next = current.next; next && next.next; next = current.next) {
        current = next;
    }
    let last = current.next;
    current.next = null;
    return last;
}

function from(arr) {
    let head = new LinkedList(arr[0]);
    let current = head;
    let i = 1;
    while (i < arr.length) {
        let next = new LinkedList(arr[i++]);
        current.next = next;
        current = next;
    }
    return head;
}

function crossHeadFoot(head) {
    let current = head;
    let next = current.next;
    let last = current.popLast();
    while (next !== last) {
        current.next = last;
        last.next = next;
        current = next;
        next = current.next;
        last = current.popLast();
    }
    current.next = last;
    return head;
}


console.log(crossHeadFoot(from([1, 3,4,52,32,4])).toString())
