import Vue from 'vue'
import VueNativeSock from 'vue-native-websocket'
import store from '@/store'
import { WS_URL } from '@/utils/websocket'

import {
  SOCKET_ONOPEN,
  SOCKET_ONCLOSE,
  SOCKET_ONERROR,
  SOCKET_ONMESSAGE,
  SOCKET_RECONNECT,
  SOCKET_RECONNECT_ERROR
} from '@/store/mutation-types'

const mutations = {
  SOCKET_ONOPEN,
  SOCKET_ONCLOSE,
  SOCKET_ONERROR,
  SOCKET_ONMESSAGE,
  SOCKET_RECONNECT,
  SOCKET_RECONNECT_ERROR
}

if (process.env.VUE_APP_USE_WS === 'true') {
  Vue.use(VueNativeSock, WS_URL, {
    store: store,
    mutations: mutations,
    connectManually: true, // 手动连接,
    reconnection: true, // 自动重连
    reconnectionAttempts: 5, // 最多尝试5次重连
    reconnectionDelay: 3000
  })
}
