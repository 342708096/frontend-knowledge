/**
 * 实现一个算法, 每次并发执行3个请求, 如果超时, 则返回null, 直到全部请求完
 */



async function batchGet(urls, batchNum = 3, timeout=3000 ) {
  return new Promise((resolve) => {
    const result = []
    const executor = (index) => {
      const chunkUrls = urls.slice(index, index+batchNum)
      if (chunkUrls.length === 0) {
        resolve(result)
      }
      Promise.all(chunkUrls.map(url => fetch(url, timeout))).then(res => {
        console.log(...res)
        result.push(...res)
        executor(index+batchNum)
      })
    }
    executor(0)
  })
}

function fetch(url, timeout = 3000) {
  return new Promise(resolve => {
    setTimeout(() => resolve(url), timeout)
  })
  // return Promise.race([window.fetch(url), new Promise((resolve) => {
  //   setTimeout(() => {resolve(null)}, timeout)
  // })])
}

(function () {
  batchGet([1,2,3,4,5]).then((ret) => console.log(ret))
  
})()
