import request from '@/utils/request'

export default {
  //  获取机构列表
  async getPublications (params) {
    const { publications, count } = await request({
      url: '/publications',
      method: 'get',
      params
    })
    return { publications, count }
  },

  //  新增/更新机构
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

  // 获取机构详情
  getPublication (id) {
    return request({
      url: `/publications/${id}`,
      method: 'get'
    })
  }
}
