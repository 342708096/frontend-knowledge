/**
 * 给你一个链表，两两交换其中相邻的节点，并返回交换后链表的头节点。你必须在不修改节点内部的值的情况下完成本题（即，只能进行节点交换）。

 

示例 1：


输入：head = [1,2,3,4]
输出：[2,1,4,3]
示例 2：

输入：head = []
输出：[]
示例 3：

输入：head = [1]
输出：[1]
 

提示：

链表中节点的数目在范围 [0, 100] 内
0 <= Node.val <= 100

来源：力扣（LeetCode）
链接：https://leetcode.cn/problems/swap-nodes-in-pairs
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
 */


/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
 var swapPairs = function(head) {

  let pair1 = head, pair2 = head?.next, next1 = pair2?.next, next2 = next1?.next
  const result = pair2 ?? pair1
  while (pair1 && pair2) {
    pair2.next = pair1
    pair1.next = next2 ?? next1

    pair1 = next1
    pair2 = next2

    next1 = next2?.next
    next2 = next1?.next
  }
  return result
};


var swapPairs = function(head) {
  if (head === null|| head.next === null) {
      return head;
  }
  const newHead = head.next;
  head.next = swapPairs(newHead.next);
  newHead.next = head;
  return newHead;
};
