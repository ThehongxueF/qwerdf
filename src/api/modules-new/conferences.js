import request from '@/utils/request'

export default {
  //  获取三会一课列表
  async getConferences (params) {
    const { conferences, count } = await request({
      url: '/conferences',
      method: 'get',
      params
    })
    return { conferences, count }
  },

  //  新增/更新三会一课
  saveConferences (data) {
    return (data.conference.id
      ? request({
        url: `/conferences/${data.conference.id}`,
        method: 'put',
        data: data
      })
      : request({
        url: '/conferences',
        method: 'post',
        data: data
      }))
  },

  // 获取三会一课详情
  getConference (id) {
    return request({
      url: `/conferences/${id}`,
      method: 'get'
    })
  }
}
