/*class ListNode {
 *     val: number
 *     next: ListNode | null
 *     constructor(val?: number, next?: ListNode | null) {
 *         this.val = (val===undefined ? 0 : val)
 *         this.next = (next===undefined ? null : next)
 *     }
 * }
 */
/**
 * 代码中的类名、方法名、参数名已经指定，请勿修改，直接返回方法规定的值即可
 *
 *
 * @param pHead ListNode类
 * @return ListNode类
 */
 export function EntryNodeOfLoop(pHead) {
  let slow = pHead, fast = pHead
  do {
    slow = slow?.next
    fast = fast?.next?.next
  } while (slow !== fast && fast != null)
  if (fast == null) {
    // 说明链表无环
    return null
  }
  fast = pHead
  // 第二次同速开车,如果相遇则必定是环的入口
  while (slow !== fast) {
    slow = slow?.next
    fast = fast?.next
  }
  return  fast
}
