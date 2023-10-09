// 招商信息管理的 API 模块

import request from '@/utils/request'

export default {
  async list (params) {
    const { results: achievements, count } = await request({
      url: '/business',
      method: 'get',
      params
    })
    return { achievements, count }
  },
  find (id) {
    return request({
      url: `/business/${id}`,
      method: 'get'
    })
  },
  save (business) {
    return (business.id
      ? request({
        url: `/business/${business.id}`,
        method: 'put',
        data: { ...business }
      })
      : request({
        url: '/business',
        method: 'post',
        data: { ...business }
      }))
  },
  destroy (id) {
    return request({
      url: `/business/${id}`,
      method: 'delete'
    })
  },
  publish (id) {
    return request({
      url: `/business/${id}/changeVisible`,
      method: 'post',
      data: { visible: true }
    })
  },
  unPublish (id) {
    return request({
      url: `/business/${id}/changeVisible`,
      method: 'post',
      data: { visible: false }
    })
  },
  verify (business) {
    if (business.state === 'verifing') {
      return request({
        url: `/business/${business.id}/prepareApprove`,
        method: 'post'
      })
    } else {
      return request({
        url: `/business/${business.id}/verify`,
        method: 'post',
        data: { state: business.state, reason: business.reason, isBackToStart: business.isStart }
      })
    }
  },
  getAchievementApproves (id) {
    return request({
      url: `/business/${id}/approves`,
      method: 'get'
    })
  },
  popularize (id, params) {
    return request({
      url: `/business/${id}/popularize`,
      method: 'post',
      data: params
    })
  },
  popularizeLogs (id, params) {
    return request({
      url: `/business/${id}/popularizeLogs`,
      method: 'get',
      params
    })
  },
  batchProcessing (params) {
    if (params.type === 'published') {
      return request({
        url: `/business/batchPublish`,
        method: 'post',
        data: {
          ids: params.ids
        }
      })
    } else if (params.type === 'unPublished') {
      return request({
        url: `/business/batchHide`,
        method: 'post',
        data: {
          ids: params.ids
        }
      })
    } else if (params.type === 'back') {
      return request({
        url: `/business/batchBack`,
        method: 'post',
        data: {
          ids: params.ids
        }
      })
    } else {
      return request({
        url: `/business/batchVerify`,
        method: 'post',
        data: {
          ids: params.ids,
          state: params.type
        }
      })
    }
  }
}
