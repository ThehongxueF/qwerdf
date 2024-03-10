import axios from 'axios'
import * as qs from 'qs'
import { MessageBox, Message } from 'element-ui'
import store from '@/store'
import { TOKEN_KEY, COLLEGE_DOMAIN_KEY } from '@/data/constant'
import { Local } from '@/utils/storage'
import { getToken } from '@/utils/auth'
import { toCamelcase, toSnakecase } from '@/utils/field-style'

// 配置新建一个 axios 实例
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API + process.env.VUE_APP_API_PREFIX,
  timeout: 50000,
  headers: { 'Content-Type': 'application/json' }
})
// 添加请求拦截器
service.interceptors.request.use(
  (config) => {
    config.headers[COLLEGE_DOMAIN_KEY] = `${Local.get(COLLEGE_DOMAIN_KEY)}`
    // 在发送请求之前做些什么 token
    const token = getToken()
    if (token) {
      config.headers[TOKEN_KEY] = token
    }
    if (config.data) {
      config.data = toSnakecase(config.data)
    }
    if (config.params) {
      config.data = toSnakecase(config.params)
    }
    // config.data = qs.stringify(config.data, { arrayFormat: 'comma' })
    return config
  },
  (error) => {
    // 对请求错误做些什么
    return Promise.reject(error)
  }
)

// 添加响应拦截器
service.interceptors.response.use(
  (response) => {
    // 对响应数据做点什么
    const res = response.data
    if (res.code && res.code !== 0) {
      return Promise.reject(service.interceptors.response)
    } else {
      return toCamelcase(response.data)
    }
  },
  (error) => {
    // 对响应错误做点什么
    if (error.message.indexOf('timeout') !== -1) {
      Message.error('网络超时')
    } else if (error.message === 'Network Error') {
      Message.error('网络连接错误')
    } else {
      const data = error.response.data
      if (data) {
        // `token` 过期或者账号已在别处登录
        if (data.code === 'INVALID_TOKEN') {
          Local.clear() // 清除浏览器全部临时缓存
          store.dispatch('user/logout') // 登出
          MessageBox.alert('你已被登出，请重新登录', '提示', {})
            .then(() => {
              window.location.href = `${process.env.VUE_APP_PUBLISH_PATH !== '/' ? process.env.VUE_APP_PUBLISH_PATH : ''}/login`// 去登录页
            })
            .catch(() => {})
        } else {
          if (error.response.data.message) {
            Message.error(error.response.data.message) // TODO: 原来是这里会愚蠢地一直报告错误
            return Promise.reject(error.response.data)
          } else {
            console.error('接口未知错误', error)
          }
        }
      }
    }
    return Promise.reject(error)
  }
)
// 配置新建一个 axios 实例
const service2 = axios.create({
  baseURL: process.env.VUE_APP_BASE_API + process.env.VUE_APP_API_PREFIX,
  timeout: 50000,
  headers: { 'Content-Type': 'application/json' }
})
// 添加请求拦截器
service2.interceptors.request.use(
  (config) => {
    config.headers[COLLEGE_DOMAIN_KEY] = `${Local.get(COLLEGE_DOMAIN_KEY)}`
    // 在发送请求之前做些什么 token
    const token = getToken()
    if (token) {
      config.headers[TOKEN_KEY] = token
    }
    return config
  },
  (error) => {
    // 对请求错误做些什么
    return Promise.reject(error)
  }
)

// 添加响应拦截器
service2.interceptors.response.use(
  (response) => {
    // 对响应数据做点什么
    const res = response.data
    if (res.code && res.code !== 0) {
      // `token` 过期或者账号已在别处登录
      if (res.code === 401 || res.code === 4001) {
        Local.clear() // 清除浏览器全部临时缓存
        window.location.href = '/' // 去登录页
        MessageBox.alert('你已被登出，请重新登录', '提示', {})
          .then(() => {})
          .catch(() => {})
      }
      return Promise.reject(service2.interceptors.response)
    } else {
      return response.data
    }
  },
  (error) => {
    console.log({ error })
    // 对响应错误做点什么
    if (error.message.indexOf('timeout') !== -1) {
      Message.error('网络超时')
    } else if (error.message === 'Network Error') {
      Message.error('网络连接错误')
    } else {
      if (error.response.data) {
        if (error.response.data.message) {
          Message.error(error.response.data.message)
        } else {
          Message.error('未知错误信息：', error.response)
        }
      }
    }
    return Promise.reject(error)
  }
)

// 配置新建一个 axios 实例
const service3 = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 50000,
  headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
})

// 添加请求拦截器
service3.interceptors.request.use(
  (config) => {
    config.headers[COLLEGE_DOMAIN_KEY] = `${Local.get(COLLEGE_DOMAIN_KEY)}`
    // 在发送请求之前做些什么 token
    const token = getToken()
    if (token) {
      config.headers[TOKEN_KEY] = token
    }
    config.data = qs.stringify(config.data, { arrayFormat: 'comma' })
    return config
  },
  (error) => {
    // 对请求错误做些什么
    return Promise.reject(error)
  }
)

// 添加响应拦截器
service3.interceptors.response.use(
  (response) => {
    // 对响应数据做点什么
    const res = response.data
    if (res.code && res.code !== 0) {
      // `token` 过期或者账号已在别处登录
      if (res.code === 401 || res.code === 4001) {
        Local.clear() // 清除浏览器全部临时缓存
        window.location.href = '/' // 去登录页
        MessageBox.alert('你已被登出，请重新登录', '提示', {})
          .then(() => {})
          .catch(() => {})
      }
      return Promise.reject(service3.interceptors.response)
    } else {
      return response.data
    }
  },
  (error) => {
    console.log({ error })
    // 对响应错误做点什么
    if (error.message.indexOf('timeout') !== -1) {
      Message.error('网络超时')
    } else if (error.message === 'Network Error') {
      Message.error('网络连接错误')
    } else {
      if (error.response.data) {
        if (error.response.data.message) {
          Message.error(error.response.data.message)
        } else {
          Message.error('未知错误信息：', error.response)
        }
      }
    }
    return Promise.reject(error)
  }
)

// 导出 axios 实例
export default service

export {
  service2 as jsonApi
}

export {
  service3 as globalApi
}
