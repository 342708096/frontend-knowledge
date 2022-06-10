#! /usr/bin/env node

const program = require('commander')
const pkg = require('../package.json')
const checkVersion = require('./check-version')
const report = require('./report')

checkVersion(() => {
  program
    .version(pkg.version)
    .usage('[options]')
    .option('-p, --path [path]', '需要解析的路由文件地址')
    .option('-d, --debug [debug]', '开启调试模式，查看解析日志')
    .parse(process.argv)

  const options = program.opts()

  console.time('commit-analyzer:')

  report(options.path, options.debug)

  if (options.debug) {
    console.timeEnd('commit-analyzer:')
  }
})

// https://www.babeljs.cn/docs/babel-traverse
// https://astexplorer.net/#/KJ8AjD6maa
// https://github.com/Weibozzz/Weibozzz.github.io/blob/master/docs/Utils/Babel/babel%E6%8F%92%E4%BB%B6%E5%BC%80%E5%8F%91.md

/**
 * 统计基本思路
 * 某git仓库上今天 a、b、c分支的路由情况如下
 * a:['x']
 * b:['x,y']
 * c:['x,z']
 * 那么 该仓库里今天新增的页面数量是并集 ['x','y','z']
 * 问题 只增不减 先忽略
 */
