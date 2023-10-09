// 前缀
const prefix = process.env.VUE_APP_STORAGE_PREFIX

// 1、window.localStorage 浏览器永久缓存
export const Local = {
  // 设置永久缓存
  set (key, val) {
    window.localStorage.setItem(prefix + key, JSON.stringify(val))
  },
  // 获取永久缓存
  get (key) {
    const json = window.localStorage.getItem(prefix + key)
    return JSON.parse(json)
  },
  // 移除永久缓存
  remove (key) {
    window.localStorage.removeItem(prefix + key)
  },
  // 移除全部永久缓存
  clear () {
    window.localStorage.clear()
  }
}

// 2、window.sessionStorage 浏览器临时缓存
export const Session = {
  // 设置临时缓存
  set (key, val) {
    window.sessionStorage.setItem(prefix + key, JSON.stringify(val))
  },
  // 获取临时缓存
  get (key) {
    const json = window.sessionStorage.getItem(prefix + key)
    return JSON.parse(json)
  },
  // 移除临时缓存
  remove (key) {
    window.sessionStorage.removeItem(prefix + key)
  },
  // 移除全部临时缓存
  clear () {
    window.sessionStorage.clear()
  }
}
