var detectCycle = function(head) {
    var slow = head, fast = head;
    while (fast && fast.next) {
        slow = slow.next;
        fast = fast.next.next;
        if (slow === fast) {
            break;
        }
    }
    if (fast == null || fast.next == null) {
        return null;
    }
    fast = head;
    var pos = 0;
    while(slow != fast) {
        slow = slow.next;
        fast = fast.next;
        pos ++;
    }
    console.log(slow.val);
    return slow;
};


var head = {
    val: 3,
    next: null
}, node1 = {
    val: 2,
    next: null
}, node2 = {
    val: 0,
    next: null
}, node3 = {
    val: -4,
    next: null
}

head.next = node1;
node1.next= node2;
node2.next = node3;
node3.next = node1;


detectCycle(head);
