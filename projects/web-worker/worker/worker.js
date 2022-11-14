
self.onmessage = (e) => {
  const data = e.data
  data.sort((a, b) => a - b)
  self.postMessage(data)
}
