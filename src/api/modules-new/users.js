import request from '@/utils/request'

export default {
  //  获取党员列表
  async getUsers (params) {
    const { users, count } = await request({
      url: '/users',
      method: 'get',
      params
    })
    return { users, count }
  },

  //  新增/更新党员
  saveUsers (data) {
    return (data.user.id
      ? request({
        url: `/users/${data.user.id}`,
        method: 'put',
        data: data
      })
      : request({
        url: '/users',
        method: 'post',
        data: data
      }))
  },

  // 获取党员详情
  getUser (id) {
    return request({
      url: `/users/${id}`,
      method: 'get'
    })
  }
}
