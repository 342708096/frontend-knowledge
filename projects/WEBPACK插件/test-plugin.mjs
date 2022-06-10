class TestPlugin {
    constructor() {
        // 1.设置插件配置
        console.log()
    }
    // 2. 创建compiler对象
    // 3. 遍历所有plugins中插件, 调用插件apply方法
    // 4. 触发各个hooks事件
    apply(compiler) {
        // 注册同步hook, enviroment是同步
        compiler.hooks.enviroment.tap('TestPlugin', () => {
            console.log()
        })
        // 想追加资源最晚节点, 即可以同步, 也可以异步串行
        compiler.hooks.emit.tap('TestPlugin', (compilation) => {
            //使用tap注册异步钩子, 内部不同进行异步操作
        })
        compiler.hooks.emit.tapAsync('TestPlugin', (compilation, callback) => {
            setTimeout(callback, 1000)
        })
        compiler.hooks.emit.tapPromise('TestPlugin', (compilation) => {
            return new Promise((resolve) => {
                setTimeout(resolve, 1000)
            })
        })
        compiler.hooks.make.tapAsync('TestPlugin', (compilation, callback) => {
            // 异步并行钩子
        })
    }
}