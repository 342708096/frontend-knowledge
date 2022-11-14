self.onconnect = (e) => {
  const port = e.ports[0]
  port.onmessage = (e) => {
    const data = e.data
    data.sort((a, b) => a - b)
    port.postMessage(data)
  }

}
