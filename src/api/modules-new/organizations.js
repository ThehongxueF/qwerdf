import request from '@/utils/request'

export default {
  //  获取机构列表
  async getOrganizations (params) {
    const { organizations, count } = await request({
      url: '/organizations',
      method: 'get',
      params
    })
    return { organizations, count }
  },

  //  新增/更新机构
  saveOrganizations (data) {
    return (data.organization.id
      ? request({
        url: `/organizations/${data.organization.id}`,
        method: 'put',
        data: data
      })
      : request({
        url: '/organizations',
        method: 'post',
        data: data
      }))
  },

  // 获取机构详情
  getOrganization (id) {
    return request({
      url: `/organizations/${id}`,
      method: 'get'
    })
  }
}
