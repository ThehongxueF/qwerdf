import request from '@/utils/request'

export default {
  //  获取主题党日列表
  async getPartyDays (params) {
    const { partyDays, count } = await request({
      url: '/party_days',
      method: 'get',
      params
    })
    return { partyDays, count }
  },

  //  新增/更新主题党日
  savePartyDays (data) {
    return (data.partyDay.id
      ? request({
        url: `/party_days/${data.partyDay.id}`,
        method: 'put',
        data: data
      })
      : request({
        url: '/party_days',
        method: 'post',
        data: data
      }))
  },

  // 获取主题党日详情
  getPartyDay (id) {
    return request({
      url: `/party_days/${id}`,
      method: 'get'
    })
  }
}
