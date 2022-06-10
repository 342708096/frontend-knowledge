#! /usr/bin/env node

const analyzer = (defaultRouterPath, debug) => {
  const fs = require('fs')
  const path = require('path')
  const parser = require('@babel/parser')
  const types = require('@babel/types')
  const traverse = require('@babel/traverse').default
  const exists = fs.existsSync || path.existsSync
  const root = process.cwd()
  const { ROUTER_PATH_JS, ROUTER_PATH_TS } = require('./constant')

  const pageRouters = [] // 收集所有页面路由

  let routerPath = path.resolve(root, ROUTER_PATH_TS)

  if (!exists(routerPath)) {
    routerPath = path.resolve(root, ROUTER_PATH_JS)
  }

  if (defaultRouterPath) {
    routerPath = path.resolve(root, defaultRouterPath)
  }

  if (!exists(routerPath)) {
    console.error(`commit-analyzer: 路由地址 ${routerPath} 不存在，请配置正确的路由文件地址 或联系学敏`)
    console.error(`commit-analyzer: 正确示例 npx commit-analyzer --path=client/src/router.ts`)
    return pageRouters
  }

  if (debug) {
    console.log('commit-analyzer: routerPath is ', routerPath)
  }

  const code = fs.readFileSync(routerPath, 'utf-8')
  const ast = parser.parse(code, {
    sourceType: 'module',
    plugins: [
      'jsx',
      'typescript'
    ]
  })

  traverse(ast, {
    CallExpression (path) {
      try {
        const { node, parentPath } = path
        const { callee } = node
        if (callee.type === 'Import' && types.isArrowFunctionExpression(parentPath)) {
          if (parentPath?.getSibling('key')?.node?.name === 'component') {
            pageRouters.push(node?.arguments?.[0]?.value)
          }
        }
      } catch (e) {
        console.error(`commit-analyzer:${e.message} 此报错可忽略,建议反馈给学敏`)
      }
    }
  })

  return pageRouters
}
module.exports = analyzer
