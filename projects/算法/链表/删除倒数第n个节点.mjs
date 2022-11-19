/**
 * 描述
给定一个链表，删除链表的倒数第 n 个节点并返回链表的头指针
例如，
给出的链表为: 1\to 2\to 3\to 4\to 51→2→3→4→5, n= 2n=2.
删除了链表的倒数第 nn 个节点之后,链表变为1\to 2\to 3\to 51→2→3→5.

数据范围： 链表长度 0\le n \le 10000≤n≤1000，链表中任意节点的值满足 0 \le val \le 1000≤val≤100
要求：空间复杂度 O(1)O(1)，时间复杂度 O(n)O(n)
备注：
题目保证 nn 一定是有效的
示例1
输入：
{1,2},2
复制
返回值：
{2}
 */


export function removeNthFromEnd(head, n) {
  let p = head
  for (let i = 1 ; i < n; i++) {
    p = p.next
  }
  let q = head, prev = null
  while (p.next) {
    prev = q
    q = q.next
    p = p.next
  }
  if (prev) {
    prev.next = q.next
  } else {
    // 要考虑删除头节点的情况
    return q.next
  }
  return head
}
