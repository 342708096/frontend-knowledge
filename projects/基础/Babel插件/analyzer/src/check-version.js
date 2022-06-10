const request = require('request')
const semver = require('semver')
const chalk = require('chalk')
const packageConfig = require('../package.json')
const defaultRegistry = 'https://registry.npmjs.org'

module.exports = done => {
  if (!semver.satisfies(process.version, packageConfig.engines.node)) {
    return console.log(chalk.red(
      '  You must upgrade node to >=' + packageConfig.engines.node + '.x to use commit-analyzer'
    ))
  }

  request({
    url: `${defaultRegistry}/commit-analyzer`,
    timeout: 1000
  }, (err, res, body) => {
    if (!err && res.statusCode === 200) {
      const latestVersion = JSON.parse(body)['dist-tags'].latest
      const localVersion = packageConfig.version
      if (semver.lt(localVersion, latestVersion)) {
        console.log()
        console.log(`${chalk.yellow('🏡   A newer version of commit-analyzer is available')}: ${chalk.red(localVersion)} -> ${chalk.green(latestVersion)}`)
        console.log(`${chalk.yellow('Run the following command to update:')}`)
        console.log(`${chalk.green(`> npm i ${packageConfig.name} -g --registry=${defaultRegistry}`)}`)
        console.log()
      }
    }
    done()
  })
}
