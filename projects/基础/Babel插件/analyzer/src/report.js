
const report = (defaultRouterPath, debug) => {
  const { execSync } = require('child_process')
  const { userInfo } = require('os')
  const axios = require('axios')
  const analyzer = require('./analyzer')
  const pageRouters = analyzer(defaultRouterPath, debug)
  const { REPORT_BASE_URL } = require('./constant')

  axios.defaults.baseURL = REPORT_BASE_URL
  // axios.defaults.baseURL = 'http://localhost:8083'
  axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'

  const pageCount = pageRouters.length

  if (!pageCount) return

  let userName = ''
  let userEmail = ''
  let projectGit = ''
  try {
    const gitName = execSync('git config user.name')?.toString()?.trim()
    const gitEmail = execSync('git config user.email')?.toString()?.trim()
    const osName = userInfo()?.username
    const gitInfo = execSync(`git remote -v`)

    userName = gitName || osName || 'unknown'
    userEmail = gitEmail
    projectGit = gitInfo?.toString()?.split(' ')?.[0]?.split('\t')?.[1]
  } catch (e) {
    console.error(`commit-analyzer: report failed`)
  } finally {
    const postData = {
      userName,
      userEmail,
      projectGit,
      pageCount,
      pageRouters
    }
    if (debug) {
      console.log('commit-analyzer: postData is', postData)
    }

    axios.post('/api/alita/saveRouterInfo', postData).catch(_ => console.error(''))
  }
}

module.exports = report
