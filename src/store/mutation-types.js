// mutation-types.js
const SOCKET_ONOPEN = '[✅ Socket 已连接!]'
const SOCKET_ONCLOSE = '[❌ Socket 断开连接!]'
const SOCKET_ONERROR = '[❌ Socket 错误!!!]'
const SOCKET_ONMESSAGE = '[接收到消息]'
const SOCKET_RECONNECT = '[重连]'
const SOCKET_RECONNECT_ERROR = '[重连失败...]'

export {
  SOCKET_ONOPEN,
  SOCKET_ONCLOSE,
  SOCKET_ONERROR,
  SOCKET_ONMESSAGE,
  SOCKET_RECONNECT,
  SOCKET_RECONNECT_ERROR
}
