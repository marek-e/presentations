const CLIENT_ID = 'Ov23lic64L0rqZE1fEBh'
const SCOPE = 'read:user'

window.DCJOAuth = {
  clientId() {
    return CLIENT_ID
  },
  scope() {
    return SCOPE
  },
  redirectUri() {
    const { origin, pathname } = window.location
    if (pathname.startsWith('/clickjacking')) {
      return `${origin}/clickjacking/callback/`
    }
    return `${origin}/callback/`
  },
  buildAuthorizeUrl() {
    return (
      'https://github.com/login/oauth/authorize' +
      '?client_id=' + encodeURIComponent(this.clientId()) +
      '&redirect_uri=' + encodeURIComponent(this.redirectUri()) +
      '&scope=' + encodeURIComponent(this.scope()) +
      '&state=dcj-demo'
    )
  },
}
