// TODO: Make app_id
const app_id = ''
const secret = ''

export function authSelfHosted(redirect_uri, state, address) {
  const scope = ['api', 'read_user', 'read_api', 'read_repository']
  // TODO: Make an authorization page
  var link = `${address}/oauth/authorize?client_id=${app_id}&redirect_uri=${redirect_uri}&response_type=code&state=${state}&scope=${scope.join(
    '+',
  )}`
  window.location = link
}

export function getTokenSelfHosted(redirect_uri, address, code) {
  return new Promise((resolve) => {
    const parameters = `client_id=${app_id}&client_secret=${secret}&code=${code}&grant_type=authorization_code&redirect_uri=${redirect_uri}`
    const link = address + '/oauth/token' + parameters
    console.log(link)
    resolve(true)
  })
}
