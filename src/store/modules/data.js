import Vue from 'vue'
import { Tag, User } from '@/api'

const state = {
  tags: [],
  counts: null
}

const mutations = {
  SET_TAGS (state, data) {
    state.tags = data.map(item => ({
      isDisabled: !(item.subordinates && item.subordinates.length > 0), // 没有二级标签禁用
      ...item
    }))
  },
  SET_COUNTS (state, data) {
    state.counts = data
  }
}

const actions = {
  setTags ({ commit }, tags) {
    commit('SET_TAGS', tags)
    Vue.ls.set('DATA_TAGS', tags)
  },
  setCounts ({ commit }, counts) {
    if (counts && counts.length) {
      const countsObj = {}
      counts.forEach(({ type, count }) => {
        countsObj[type] = count
      })
      commit('SET_COUNTS', countsObj)
    } else {
      commit('SET_COUNTS', {})
    }
  },
  async initialTags ({ dispatch }) {
    try {
      const tags = await Tag.getTags()
      dispatch('setTags', tags)
    } catch (e) {
      dispatch('setTags', [])
    }
  },
  async initialCounts ({ dispatch }) {
    try {
      const counts = await User.getUserCounts()
      dispatch('setCounts', counts)
    } catch (e) {
      dispatch('setCounts', null)
    }
  },
  async initialData ({ dispatch }) {
    Promise.all([
      dispatch('initialCounts')
    ])
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
