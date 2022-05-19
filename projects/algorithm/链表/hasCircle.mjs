/*
 * @Author: zhuzheng013
 * @Date: 2022-05-16 18:40:19
 * @LastEditors: zhuzheng013
 * @LastEditTime: 2022-05-16 18:49:29
 * @Description: file content
 * @FilePath: /algorithm/链表/hasCircle.mjs
 */
/**
 * 给你一个链表的头节点 head ，判断链表中是否有环。

如果链表中有某个节点，可以通过连续跟踪 next 指针再次到达，则链表中存在环。 为了表示给定链表中的环，评测系统内部使用整数 pos 来表示链表尾连接到链表中的位置（索引从 0 开始）。注意：pos 不作为参数进行传递 。仅仅是为了标识链表的实际情况。

如果链表中存在环 ，则返回 true 。 否则，返回 false 。

 

来源：力扣（LeetCode）
链接：https://leetcode.cn/problems/linked-list-cycle
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
 */
/**
 * 使用快慢指针的方式判断, 如果有环, 则快指针一定能追上慢指针
 * @param {*} head 
 */
var hasCycle = function(head) {
  let slow = head, fast = head
  do {
    slow = slow?.next ?? null
    fast = fast?.next?.next ?? null
  } while (slow !== null && fast !== null && slow !== fast)
  if (slow === null || fast === null) {
    return false
  }
  return true
};