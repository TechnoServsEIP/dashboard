import config from '../../config.json'

export function authGitlab(redirect_uri, state) {
  const scope = ['api', 'read_user', 'read_api', 'read_repository']
  var link = `https://gitlab.com/oauth/authorize?client_id=${
    config.gitlab.app_id
  }&redirect_uri=${redirect_uri}&response_type=code&state=${state}&scope=${scope.join(
    '+',
  )}`
  window.location = link
}

export function getTokenGitlab(redirect_uri, code) {
  return new Promise((resolve) => {
    const url = `https://gitlab.com/oauth/token?client_id=${config.gitlab.app_id}&client_secret=${config.gitlab.secret}&code=${code}&grant_type=authorization_code&redirect_uri=${redirect_uri}`
    //This url is to get Token
    // TODO: Make post call and check if token is available
    console.log(url)
    resolve(true)
  })
}
