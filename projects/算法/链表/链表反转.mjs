/*
 * @Author: zhuzheng013
 * @Date: 2022-05-16 18:05:20
 * @LastEditors: zhuzheng013
 * @LastEditTime: 2022-05-16 18:37:44
 * @Description: 链表反转
 * @FilePath: /algorithm/链表/reverse.mjs
 */
/**
 * 定义一个函数，输入一个链表的头节点，反转该链表并输出反转后链表的头节点。

 

示例:

输入: 1->2->3->4->5->NULL
输出: 5->4->3->2->1->NULL
 

限制：
0 <= 节点个数 <= 5000
来源：力扣（LeetCode）
链接：https://leetcode.cn/problems/fan-zhuan-lian-biao-lcof
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
假设链表没有环
 */

/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
 var reverseList = function(head) {
   if (head === null) {
     return null
   }
   let preview = null, current = head
   while (current) {
     const next = current.next
     current.next = preview
     preview = current
     current = next
   }
   return preview
};

