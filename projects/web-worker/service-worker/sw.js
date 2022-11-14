/*
 * @Author: zhuzheng013
 * @Date: 2022-04-24 15:20:25
 * @LastEditors: zhuzheng013
 * @LastEditTime: 2022-04-25 14:13:04
 * @Description: file content
 * @FilePath: /zsy-3d/otherDemo/serviceWorker/sw.js
 */
const CACHE_NAME = 'v1'


function makeRes(body, status = 200, headers = {}) {
  headers['access-control-allow-origin'] = '*'
  return new Response(body, {status, headers})
}

const PREFLIGHT_INIT = {
  status: 204,
  headers: new Headers({
    'access-control-allow-origin': '*',
    'access-control-allow-methods': 'GET,POST,PUT,PATCH,TRACE,DELETE,HEAD,OPTIONS',
    'access-control-max-age': '1728000',
  }),
}

// sw安装阶段，首次安装或有更新时会触发
self.addEventListener('install', event => {

  // 跳过等待过程
  self.skipWaiting()

  console.log('sw安装完成')

})

// sw激活阶段，首次安装或有更新时会触发
self.addEventListener('activate', event => {
  console.log('sw激活成功')
  event.waitUntil(
    // 清除旧缓存
    caches.keys().then((keys) => {
      keys.forEach(item => {
        if (item !== CACHE_NAME) {
          caches.delete(item)
        }
      })
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
  const newRequest = new Request(event.request, {
    headers: {
      ...event.request.headers,
    }
  })
  event.respondWith(
    fetch(newRequest).then(res => {
      const resHdrOld = res.headers
      const resHdrNew = new Headers(resHdrOld)
      let expose = '*'
      let acehOld = false
      for (const [k, v] of resHdrOld.entries()) {
        if (k === 'access-control-allow-origin' ||
            k === 'access-control-expose-headers' ||
            k === 'location' ||
            k === 'set-cookie'
        ) {
          const x = '--' + k
          resHdrNew.set(x, v)
          if (acehOld) {
            expose = expose + ',' + x
          }
          resHdrNew.delete(k)
        }
        else if (acehOld &&
          k !== 'cache-control' &&
          k !== 'content-language' &&
          k !== 'content-type' &&
          k !== 'expires' &&
          k !== 'last-modified' &&
          k !== 'pragma'
        ) {
          expose = expose + ',' + k
        }
      }

      let status = res.status

      resHdrNew.set('access-control-expose-headers', expose)
      resHdrNew.set('access-control-allow-origin', '*')

      resHdrNew.delete('content-security-policy')
      resHdrNew.delete('content-security-policy-report-only')
      resHdrNew.delete('clear-site-data')

      if (status === 301 ||
        status === 302 ||
        status === 303 ||
        status === 307 ||
        status === 308
      ) {
        status = status + 10
      }

      return new Response(res.body, {
        status,
        headers: resHdrNew,
      })

    })
  )
})
