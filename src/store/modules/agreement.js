import { Agreement } from '@/api'
const agreement = {
  state: {
    agreement: {
      loginEnable: false,
      registerEnable: false,
      content: ''
    },
    privacy: {
      loginEnable: false,
      registerEnable: false,
      content: ''
    },
    dataPush: {
      loginEnable: false,
      content: ''
    }
  },

  mutations: {
    SET_AGREEMENT (state, data) {
      state.agreement = data
    },
    SET_PRIVACY (state, data) {
      state.privacy = data
    },
    SET_DATAPUSH (state, data) {
      state.dataPush = data
    }
  },

  actions: {
    async getUserAgreements ({ commit }, params) {
      const agreement = await Agreement.getUserAgreements(params)
      if (!agreement) {
        return
      }
      switch (true) {
        case params.type === 'dataPush':
          commit('SET_DATAPUSH', agreement)
          break
        case params.type === 'user':
          commit('SET_AGREEMENT', agreement)
          break
        default:
          commit('SET_PRIVACY', agreement)
      }
    }
  }
}

export default agreement
