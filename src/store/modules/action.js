import Vue from 'vue'
import dayjs from 'dayjs'
// import { TOKEN_KEY, COLLEGE_DOMAIN_KEY } from '@/data/constant'
// import { Local } from '@/utils/storage'
// import { getToken } from '@/utils/auth'

// const isMobile = () => {
//   const ua = navigator && navigator.userAgent
//   if (/Mobile|Android|iP(hone|od)|IEMobile|BlackBerry|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(ua)) {
//     return true
//   }
//   return false
// }

const state = {
  startTime: null,
  logs: []
}

const mutations = {
  SET_START_TIME (state, data) {
    state.startTime = data
  },

  ADD_LOG (state, data) {
    const { path } = data // 页面路径
    const currentTime = dayjs().format('YYYY-MM-DD HH:mm:ss')

    state.logs.push({
      visitedAt: currentTime, // 访问时间
      path // 访问路径
    })
  },

  CLEAR_LOGS (state) {
    state.logs = []
  },

  BACK_UP (state, data) {
    Vue.ls.set('USER_ANALY_DATA', data)
  }
}

const actions = {
  setStartTime ({ commit }, time) {
    commit('SET_START_TIME', time)
  },

  setVisited ({ commit }) {
    Vue.ls.set('USER_VISITED', 1)
  },

  reset () {
    Vue.ls.remove('USER_VISITED')
    Vue.ls.remove('USER_ANALY_DATA')
  },

  addLog ({ commit }, log) {
    commit('ADD_LOG', log)
  }

  // async pushLogs ({ dispatch, commit, state }) {
  //   const url = process.env.VUE_APP_BASE_API + process.env.VUE_APP_API_PREFIX + '/userViews'
  //   const headers = {
  //     'Content-Type': 'application/json',
  //     [TOKEN_KEY]: getToken(),
  //     [COLLEGE_DOMAIN_KEY]: Local.get(COLLEGE_DOMAIN_KEY)
  //   }

  //   const isVisited = Vue.ls.get('USER_VISITED')
  //   if (!isVisited || +isVisited !== 1) { // 说明是“第一次访问”
  //     dispatch('setVisited')
  //   }

  //   // 要提交给后端的统计数据
  //   const postData = {
  //     date: dayjs().format('YYYY-MM-DD'),
  //     device: isMobile() === true ? 'mobile' : 'pc',
  //     pageVisits: state.logs,
  //     startTime: dayjs(state.startTime).format('HH:mm:ss'),
  //     endTime: dayjs().format('HH:mm:ss'),
  //     userAdd: +isVisited === 1 ? 0 : 1
  //   }

  //   try {
  //     await fetch(url, {
  //       method: 'POST',
  //       headers,
  //       body: JSON.stringify(postData),
  //       keepalive: true
  //     })

  //     commit('CLEAR_LOGS')
  //     commit('SET_START_TIME', null)
  //   } catch (e) {
  //     commit('BACK_UP', postData) // 未推送成功的数据缓存到本地备份
  //   }
  // },
  // async pushBackupLogs ({ commit }) { // 推送备份的记录
  //   const headers = {
  //     'Content-Type': 'application/json',
  //     [TOKEN_KEY]: getToken(),
  //     [COLLEGE_DOMAIN_KEY]: Local.get(COLLEGE_DOMAIN_KEY)
  //   }
  //   const url = process.env.VUE_APP_BASE_API + process.env.VUE_APP_API_PREFIX + '/userViews'
  //   const backup = Vue.ls.get('USER_ANALY_DATA') // 保存到本地

  //   if (backup) {
  //     try {
  //       await fetch(url, {
  //         method: 'POST',
  //         headers,
  //         body: JSON.stringify(backup),
  //         keepalive: true
  //       })
  //     } catch (e) {
  //       commit('BACK_UP', backup)
  //     } finally {
  //       commit('BACK_UP', null)
  //     }
  //   }
  // }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
