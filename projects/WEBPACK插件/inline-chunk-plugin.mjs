const HtmlWebpackPlugin = require('html-webpack-plugin')
/**
 * 作用: webpack打包生成的runtime文件太小了, 可以合并到html中
 * 需要借助html-webpack-plugin实现
 * 在html-webpack-plugin输出index.html前将内联runtime注入进去
 * 删除多余的runtime文件
 * 操作HtmlPlugin? 
 */
class InlineChunkWebpackPlugin {
    constructor(tests) {
        this.tests = tests;
    } 

    apply(compiler) {
        compiler.hooks.compilation.tap('InlineChunkWebpackPlugin', (compilation) => {
            // 1. 获取htmlPlugin的hooks
            // 2. 注册html-webpack-plugin的hooks -> alterAssetTagGroups
            // 3. 从里面将scipt的runtime文件
            const hooks = HtmlWebpackPlugin.getHooks(compilation)
            hooks.alterAssetTagGroups.tap('InlineChunkWebpackPlugin', (assets) => {




                assets.headTags = this.getInlineTag(assets.headTags, compilation.assets) // compoilation.assets 有所有资源
                assets.bodyTags = this.getInlineTag(assets.bodyTags, compilation.assets)
            })
            // 处理完后删除runtime
            hooks.afterEmit.tap('InlineChunkWebpackPlugin', () => {
                Object.keys(compilation.assets).forEach((assetName) => {
                    if (this.tests.some((test) => assetName.match(test))) {
                        delete compilation.assets[assetName]
                    }
                })
            })
        })
    }
    getInlineChunk(tags) {
    /**
     * 目前: [
     * {    
     *      tagName: 'script',
     *      voidTag: false,
     *      meta: { plugin: 'html-webpack-plugin' }
     *      attributes: { defer: true, type: undefined, src: 'js/runtime~main.js.js' }
     * }
     * ]
     * 修改为: 
     * [
     *  {
     *      tagName: 'script',
     *      innerHTML: runtime文件的内容,
     *      closeTag: true
     *  }
     * ]
     * 
     * 
     * 
     */
       return tags.map((tag) => {
            if (tag.tagName !== 'script') return tag
            const filepath = tag.attributes.src
            if (!filepath) return tag // 已经是行内
            if (!/runtime(.*)\.js$/g.test(filepath)) return tag;
            return {
                tagName: 'script',
                innerHTML: assets[filepath].source(),
                closeTag: true,
            }
        })
    }
}