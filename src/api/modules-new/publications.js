import request from '@/utils/request'

export default {
  //  获取公示公开列表
  async getPublications (params) {
    const { publications, count } = await request({
      url: '/publications',
      method: 'get',
      params
    })
    return { publications, count }
  },

  //  新增/更新公示公开
  savePublications (publication) {
    return (publication.id
      ? request({
        url: `/publications/${publication.id}`,
        method: 'put',
        data: publication
      })
      : request({
        url: '/publications',
        method: 'post',
        data: publication
      }))
  },

  // 获取公示公开详情
  getPublication (id) {
    return request({
      url: `/publications/${id}`,
      method: 'get'
    })
  }
}
