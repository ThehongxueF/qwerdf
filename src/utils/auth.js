import Vue from 'vue'
import { TOKEN_KEY } from '@/data/constant'

const oneDay = 24 * 60 * 60 * 1000
const oneWeek = 7 * oneDay

export function getToken () {
  const token = Vue.ls.get(TOKEN_KEY)
  return token
}

export function setToken (token) {
  return Vue.ls.set(TOKEN_KEY, token, oneWeek)
}

export function removeToken () {
  return Vue.ls.remove(TOKEN_KEY)
}

export function getUserInfo () {
  const UserInfo = Vue.ls.get('UserInfo')
  return UserInfo
}
