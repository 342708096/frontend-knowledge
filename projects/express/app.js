const express = require('express');
const app = express();
// app.use((req, res) => {
//     res.json({
//         name: 'hello world!'
//     })
// })
app.get('/name', (req, res) => {
    res.send('tom')
})
app.listen(3000, () => {
    console.log('server 启动成功')
})

// 配置nodemon启动以监听文件
