import Vue from 'vue'
import axios from 'axios'
import { Login } from '@/api'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { Local } from '@/utils/storage'
import router, { resetRouter } from '@/router'
import { COLLEGE_INFO, COLLEGE_SETTING, COLLEGE_DOMAIN_KEY } from '@/data/constant'
import { WSDisconnect } from '@/utils/socket'

const request = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 50000,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  }
})

const state = {
  token: getToken(),
  userInfo: {},
  roles: [],
  collegeInfo: {},
  collegeSetting: {},
  authModules: []
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_USER_INFO: (state, data) => {
    state.userInfo = data
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles
  },
  SET_AUTH_MODULES: (state, authModules) => {
    state.authModules = authModules
  },
  SET_COLLEGE: (state, data) => {
    state.collegeInfo = data
    Vue.ls.set(COLLEGE_INFO, data)
  },
  SET_COLLEGE_SETTING: (state, data) => {
    state.collegeSetting = data
    Vue.ls.set(COLLEGE_SETTING, data)
  }
}

const actions = {
  // user login
  login ({ commit }, userInfo) {
    return new Promise((resolve, reject) => {
      Login.signIn(userInfo).then(({ token, admin_user }) => {
        commit('SET_TOKEN', token)
        commit('SET_USER_INFO', admin_user)
        setToken(token)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // get user info
  getInfo ({ commit, dispatch }) {
    commit('SET_ROLES', ['admin'])
    // return new Promise((resolve, reject) => {
    //   window.sessionStorage.clear()
    //   User.getCurrentUser().then(data => {
    //     data.roles = []
    //     if (!data) {
    //       reject('验证失败，请重新登录')
    //     }
    //     const { role, roles } = data
    //     if (role === ADMIN_ROLE) { // admin
    //       roles.push('admin')
    //     }

    //     // roles must be a non-empty array
    //     if (!roles || roles.length <= 0) {
    //       reject('用户非管理员，请重新登录')
    //     }

    //     commit('SET_ROLES', roles)
    //     commit('SET_USER_INFO', data)
    //     resolve(data)
    //   }).catch(error => {
    //     reject(error)
    //   })
    // })
  },
  // get administrator info
  getAdministratorInfo ({ commit }, user) {
    // return ['Databoard', 'Unit', 'Branch', 'User', 'Content', 'Achievement']
    // return new Promise((resolve, reject) => {
    //   User.getCurrentUser().then(data => {
    //     let authModules = []
    //     const { authorizationModule } = data
    //     if (authorizationModule && authorizationModule.authorizationModules) { // 授权模块JSON string
    //       authModules = authorizationModule.authorizationModules.split(',')
    //     }
    //     // 根据authModules来控制模块，此处先把各模块默认显示
    //     authModules = ['Databoard', 'Unit', 'Branch', 'User', 'Content', 'Achievement']
    //     commit('SET_AUTH_MODULES', authModules)
    //     resolve(authModules)
    //   }).catch(error => {
    //     console.error(error)
    //     resolve([])
    //   })
    // })
  },
  // get college info
  getCollegeInfo ({ commit }, { domain }) {
    return new Promise((resolve, reject) => {
      request({
        url: '/college',
        method: 'get',
        headers: { [COLLEGE_DOMAIN_KEY]: Local.get(COLLEGE_DOMAIN_KEY) },
        params: { domain }
      }).then(({ data }) => {
        if (!data) {
          reject('未获取到有效的高校信息')
        }
        commit('SET_COLLEGE', data)
        resolve(data)
      }).catch(error => {
        if (error.response.data.message) {
          reject(error.response.data)
        } else {
          reject(error)
        }
      })
    })
  },
  // get administrator info
  setCollegeInfo ({ commit }, data) {
    commit('SET_COLLEGE', data)
  },
  setCollegeSetting ({ commit, dispatch }, data) {
    dispatch('settings/changeSetting', {
      key: 'theme',
      value: data.theme
    }, { root: true })
  },

  // user logout
  logout ({ commit, state, dispatch }, message = '') {
    return new Promise((resolve, reject) => {
      commit('SET_TOKEN', '')
      commit('SET_ROLES', [])
      removeToken()
      resetRouter()
      dispatch('tagsView/delAllViews', null, { root: true })
      dispatch('action/reset', null, { root: true })
      WSDisconnect()
      // router.push('/login')
      resolve(message)
    })
  },

  // remove token
  resetToken ({ commit }) {
    return new Promise(resolve => {
      commit('SET_TOKEN', '')
      commit('SET_ROLES', [])
      removeToken()
      resolve()
    })
  },

  // dynamically modify permissions
  changeRoles ({ commit, dispatch }, role) {
    return new Promise(resolve => {
      const token = role + '-token'

      commit('SET_TOKEN', token)
      setToken(token)

      dispatch('getInfo').then(({ roles }) => {
        resetRouter()
        // generate accessible routes map based on roles
        dispatch('permission/generateRoutes', roles, { root: true }).then(accessRoutes => {
          // dynamically add accessible routes
          router.addRoutes(accessRoutes)
          // reset visited views and cached views
          dispatch('tagsView/delAllViews', null, { root: true })
          resolve()
        })
      })
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
