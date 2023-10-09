export default function getDomain () {
  const domain = window.location.hostname || document.domain
  return process.env.VUE_APP_COLLEGE_DOMAIN || domain
}
