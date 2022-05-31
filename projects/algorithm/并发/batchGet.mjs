/**
 * 实现一个算法, 每次并发执行3个请求, 如果超时, 则返回null, 直到全部请求完
 */



async function batchGet(urls, batchNum = 3, timeout=3000) {
  const length = urls.length
  if (length <= batchNum) {
    return Promise.all(urls.map((url) => fetch(url, timeout)))
  }
  const result = await Promise.all(urls.slice(0, batchNum).map((url) => fetch(url, timeout)))
  return [...result, ...batchGet(urls.slice(batchNum), batchNum, timeout)]
}

function fetch(url, timeout = 3000) {
  return Promise.race(window.fetch(url), new Promise((resolve) => {
    setTimeout(() => {resolve(null)}, timeout)
  })
}



