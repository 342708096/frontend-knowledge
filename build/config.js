// see http://vuejs-templates.github.io/webpack for documentation.
var path = require('path')
var minimist = require('minimist')


var projectInfo = (function () {
// 获取项目名称参数
  var argv = minimist(process.argv.slice(2));
  var name = argv.name; // 项目名称
  // let other = argv._;

  // 检查项目是否存在
  if (!name) {
    throw new Error(`请输入 -- --name={项目名}`)
  }

  var pkg = require(`../projects/${name}/package.json`)
  function parse(str, source) {
    if (typeof str === 'string') {
      return str.replace(/{([$A-Za-z0-9_.]+)}/g, function($1, $2) {
        var properties = $2.split('.')
        properties = properties.map((p) => `[${JSON.stringify(p)}]`)
        return parse(eval('source' + properties.join('')), source)
      })
    } else if (typeof str === 'object') {
      for (var i in str) {
        if (str.hasOwnProperty(i)) {
          str[i] = parse(str[i], source)
        }
      }
    }
    return str
  }
  parse(pkg, pkg)
  var entryPath = path.resolve(__dirname, '..', `projects/${name}/`)

  pkg.input = path.join(entryPath, pkg.input)
  pkg.output.file = path.join(entryPath, pkg.output.file)

  console.log(JSON.stringify(pkg, null, 2) + '\n')
  return pkg
})()


module.exports = projectInfo


