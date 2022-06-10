const fs = require('fs')
const path = require('path')
const exists = fs.existsSync || path.existsSync

const root = path.resolve(__dirname, '..', '..')
const packagePath = path.resolve(root, 'package.json')

if (!exists(packagePath) || !fs.lstatSync(packagePath, {
  throwIfNoEntry: false
}).isFile()) return

try {
  const pkgInfo = require(packagePath)
  if (!pkgInfo['pre-commit']) {
    console.error('commit-analyzer:pre-commit needs to be configured in the project')
    return
  }

  if (!pkgInfo.scripts['commit-analyzer'] && !pkgInfo['pre-commit'].includes('commit-analyzer')) {
    pkgInfo.scripts['commit-analyzer'] = 'npx commit-analyzer --path=client/src/router.js'
    pkgInfo['pre-commit'].push('commit-analyzer')
    fs.writeFileSync(packagePath, JSON.stringify(pkgInfo, null, 2))
  }
} catch (e) {
  console.error('commit-analyzer:')
  console.error('commit-analyzer: Failed to create the necessary information in package.json because:')
  console.error('commit-analyzer: ' + e.message)
}
