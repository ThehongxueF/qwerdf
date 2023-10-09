const protocol = window.location.protocol === 'http:' ? 'ws:' : 'wss:'

const domain = process.env.VUE_APP_COLLEGE_DOMAIN || (window.location.hostname || document.domain)
const WS_URL = process.env.VUE_APP_BASE_WS || `${protocol}//${domain}${process.env.VUE_APP_BASE_API}`

export {
  WS_URL
}
