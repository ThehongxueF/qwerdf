import Vue from 'vue'
import { COLLEGE_INFO } from '@/data/constant'
import { WS_URL } from '@/utils/websocket'
import { getToken } from './auth'
const vm = new Vue()

export const WSConnect = () => {
  if (process.env.VUE_APP_USE_WS === 'true') {
    const college = Vue.ls.get(COLLEGE_INFO)
    const url = `${WS_URL}/ws/${college.id}?token=${getToken()}`
    vm.$connect(url)
  }
}

export const WSDisconnect = () => {
  if (process.env.VUE_APP_USE_WS === 'true') {
    vm.$disconnect()
  }
}
