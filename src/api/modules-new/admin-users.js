import request from '@/utils/request'

export default {
  //  获取管理员列表
  async getAdminUsers (params) {
    const { adminUsers, count } = await request({
      url: '/admin_users',
      method: 'get',
      params
    })
    return { adminUsers, count }
  },

  //  新增/更新管理员
  saveAdminUsers (data) {
    return (data.adminUser.id
      ? request({
        url: `/admin_users/${data.adminUser.id}`,
        method: 'put',
        data: data
      })
      : request({
        url: '/admin_users',
        method: 'post',
        data: data
      }))
  },

  // 获取管理员详情
  getAdminUser (id) {
    return request({
      url: `/admin_users/${id}`,
      method: 'get'
    })
  }
}
