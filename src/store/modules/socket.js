import {
  SOCKET_ONOPEN,
  SOCKET_ONCLOSE,
  SOCKET_ONERROR,
  SOCKET_ONMESSAGE,
  SOCKET_RECONNECT,
  SOCKET_RECONNECT_ERROR
} from '../mutation-types'

const socket = {
  state: {
    isConnected: false,
    message: '',
    reconnectError: false
  },
  mutations: {
    [SOCKET_ONOPEN] (state, event) {
      state.isConnected = true
      console.log(SOCKET_ONOPEN)
    },
    [SOCKET_ONCLOSE] (state, event) {
      state.isConnected = false
      console.log(SOCKET_ONCLOSE)
    },
    [SOCKET_ONERROR] (state, event) {
      console.error(state, event)
    },
    // default handler called for all methods
    [SOCKET_ONMESSAGE] (state, event) {
      console.log({ event })
      try {
        state.message = JSON.parse(event.data)
      } catch (e) {
        state.message = event.data
      }
    },
    // mutations for reconnect methods
    [SOCKET_RECONNECT] (state, count) {
      console.info(state, count)
    },
    [SOCKET_RECONNECT_ERROR] (state) {
      state.reconnectError = true
    }
  }
}

export default socket
