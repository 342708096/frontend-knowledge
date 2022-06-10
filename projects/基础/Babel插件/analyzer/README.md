## 统计新装修PC项目新增页面数

服务于keAlita的统计,执行git pre-commit钩子时上报页面数量

目前用于统计供应链PC项目开发环境的页面总数


安装

```
npm i commit-analyzer -g
```

配置 示例

```javascript
// package.json
"scripts": {
  "commit-analyzer":"npx commit-analyzer --path=client/src/router.js"  // 普通模式
  "commit-analyzer":"npx commit-analyzer --path=client/src/router.js --debug"  // 调试模式
},
"pre-commit": [
  "commit-analyzer" // here
]
```