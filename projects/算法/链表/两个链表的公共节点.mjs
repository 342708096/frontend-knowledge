/**
 * 输入两个链表，找出它们的第一个公共节点。
 */
 var getIntersectionNode = function(headA, headB) {
    let p1 = headA, p2 = headB
    while (p1 !== p2) {
      p1 = p1 == null ? headB : p1.next
      p2 = p2 == null ? headA : p2.next
    }
    return p1
};
