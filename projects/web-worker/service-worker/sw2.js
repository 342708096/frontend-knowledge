
/*
 * @Author: zhuzheng013
 * @Date: 2022-04-24 15:20:25
 * @LastEditors: zhuzheng013
 * @LastEditTime: 2022-04-25 14:13:04
 * @Description: file content
 * @FilePath: /zsy-3d/otherDemo/serviceWorker/sw.js
 */
const CACHE_NAME = 'v1'
let cacheList = [
  'https://images.unsplash.com/photo-1594627721989-502bf69bf6f3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=765&q=80',
]

// sw安装阶段，首次安装或有更新时会触发
self.addEventListener('install', event => {

  // 跳过等待过程


  console.log('sw安装完成')

  // waitUntil: 当事件触发时调用，接受一个promise
  event.waitUntil(
    caches.open(CACHE_NAME)
    .then(cache => {
      console.log('缓存打开成功')
      return cache.addAll(cacheList).then(() => {
        console.log('缓存成功')
      })
    })
    .then(() => {
      return  self.skipWaiting()
    })
  )
})

// sw激活阶段，首次安装或有更新时会触发
self.addEventListener('activate', event => {
  console.log('sw激活成功')
  event.waitUntil(
    // 清除旧缓存
    caches.keys().then((keys) => {
      console.log('keys=>', keys)
      keys.forEach(item => {
        if (item !== CACHE_NAME) {
          caches.delete(item)
        }
      })
    }).then(() => {
      // 允许一个激活的 service worker 将自己设置为其scope (en-US) 内所有 clients 的 controller .
      // 立即获得页面控制权
      return self.clients.claim()
    })
  )
})

// 监听信息
self.addEventListener('message', event => {
  console.log(`sw: ${event.data}`)
  // event.source.postMessage('Message from sw')

  event.waitUntil(
    self.clients.matchAll().then(function (clients) {
      // console.log('clients===🚀===>', clients)
      if (!clients || clients.length === 0) {
        return;
      }

      // 向每一个客户端发送消息，包括自身
      clients.forEach(function (client) {
        client.postMessage('sw发送给所有页面');
      });
    })
  )
})

// fetch拦截
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
    .then(res => {
      if (res) {
        // cache first
        console.log('Found response in cache:', res)
        return res
      }
      // 没有则远端请求
      return fetch(event.request).then(res => {
        console.log('Response from network is:', res)
        return res
      }).catch(err => {
        // 自定义返回
        console.log('Fetch failed:', err)
        return new Response('Network error')
      })
    })
  )
})
