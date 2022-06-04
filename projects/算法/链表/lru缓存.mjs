/*
 * @Author: zhuzheng013
 * @Date: 2022-05-20 12:33:50
 * @LastEditors: zhuzheng013
 * @LastEditTime: 2022-05-20 14:56:16
 * @Description: file content
 * @FilePath: /frontend-knowledge/projects/algorithm/Map/lru.mjs
 */

/**
 * 
 * 请你设计并实现一个满足  LRU (最近最少使用) 缓存 约束的数据结构。
实现 LRUCache 类：
LRUCache(int capacity) 以 正整数 作为容量 capacity 初始化 LRU 缓存
int get(int key) 如果关键字 key 存在于缓存中，则返回关键字的值，否则返回 -1 。
void put(int key, int value) 如果关键字 key 已经存在，则变更其数据值 value ；如果不存在，则向缓存中插入该组 key-value 。如果插入操作导致关键字数量超过 capacity ，则应该 逐出 最久未使用的关键字。
函数 get 和 put 必须以 O(1) 的平均时间复杂度运行。

 

示例：

输入
["LRUCache", "put", "put", "get", "put", "get", "put", "get", "get", "get"]
[[2], [1, 1], [2, 2], [1], [3, 3], [2], [4, 4], [1], [3], [4]]
输出
[null, null, null, 1, null, -1, null, -1, 3, 4]

解释
LRUCache lRUCache = new LRUCache(2);
lRUCache.put(1, 1); // 缓存是 {1=1}
lRUCache.put(2, 2); // 缓存是 {1=1, 2=2}
lRUCache.get(1);    // 返回 1
lRUCache.put(3, 3); // 该操作会使得关键字 2 作废，缓存是 {1=1, 3=3}
lRUCache.get(2);    // 返回 -1 (未找到)
lRUCache.put(4, 4); // 该操作会使得关键字 1 作废，缓存是 {4=4, 3=3}
lRUCache.get(1);    // 返回 -1 (未找到)
lRUCache.get(3);    // 返回 3
lRUCache.get(4);    // 返回 4
 

提示：

1 <= capacity <= 3000
0 <= key <= 10000
0 <= value <= 105
最多调用 2 * 105 次 get 和 put


来源：力扣（LeetCode）
链接：https://leetcode.cn/problems/lru-cache
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
 */
function LinkedList(key, val) {
  this.key = key
  this.val = val
  this.prev = this.next = null
}
/**
 * @param {number} capacity
 */
 var LRUCache = function(capacity) {
  this.head = null
  this.trail = null
  this.size = 0
  this.capacity = capacity
  this.cache = new Map()
};

/** 
 * 查询缓存里是否有, 有的话提升优先级
 * @param {number} key
 * @return {number}
 */
LRUCache.prototype.get = function(key) {
  
  if (this.cache.has(key)) {
    let node = this.cache.get(key)
    if (this.head === node) {
      return node.val
    }
    let prev = node.prev, next = node.next, head = this.head
    this.head = node
    node.prev = null
    node.next = head
    head.prev = node

    if (this.trail === node) {
      prev.next = null
      this.trail = prev
    } else {
      prev.next = next
      next.prev = prev
    }
    return node.val
  }
  return -1
};

/** 
 * @param {number} key 
 * @param {number} value
 * @return {void}
 */
LRUCache.prototype.put = function(key, value) {
  if (this.cache.has(key)) {
    this.cache.get(key).val = value
    this.get(key)
    return 
  }
  if (this.size === 0) {
    this.head = new LinkedList(key, value)
    this.trail = this.head
    this.size++
    this.cache.set(key, this.head)
    return
  }
  let head = this.head

  // 添加到头部
  this.head = new LinkedList(key, value)
  this.head.next = head
  if (head) {
    head.prev = this.head
  }
  // 添加到缓存
  this.cache.set(key, this.head)
  this.size++

  if (this.size > this.capacity) {
    // 去掉尾
    let trail = this.trail
    this.cache.delete(this.trail.key)
    if (trail.prev) {
      trail.prev.next = null
    }
    this.trail = trail.prev
    this.size--
    delete trail
  }
};

/**
 * Your LRUCache object will be instantiated and called as such:
 * var obj = new LRUCache(capacity)
 * var param_1 = obj.get(key)
 * obj.put(key,value)
 */

//  ["LRUCache", "put", "put", "get", "put", "get", "put", "get", "get", "get"]
//  [[2], [1, 1], [2, 2], [1], [3, 3], [2], [4, 4], [1], [3], [4]]
const lruCache = new LRUCache(3)

lruCache.put(1, 1) // null 1
lruCache.put(2, 2) // null 2 1
lruCache.put(3, 3) // null 3 2 1
lruCache.put(4, 4) // null 4 3 2
lruCache.get(4) // 4  4 3 2
lruCache.get(3) // 3 3 4 2
lruCache.get(2) // 2 2 3 4
lruCache.get(1) // -1
lruCache.put(5, 5) // null 5 2 3
lruCache.get(1) // -1
lruCache.get(2) // 2 2 5 3
lruCache.get(3) // 3 3 5 2
lruCache.get(4) // -1
lruCache.get(5) // 5 5 3 2