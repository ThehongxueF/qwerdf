import request from '@/utils/request'

export default {
  //  获取支部列表
  async getDepartments (params) {
    const { departments, count } = await request({
      url: '/departments',
      method: 'get',
      params
    })
    return { departments, count }
  },

  //  新增/更新支部
  saveDepartments (data) {
    return (data.department.id
      ? request({
        url: `/departments/${data.department.id}`,
        method: 'put',
        data: data
      })
      : request({
        url: '/departments',
        method: 'post',
        data: data
      }))
  },

  // 获取支部详情
  getDepartment (id) {
    return request({
      url: `/departments/${id}`,
      method: 'get'
    })
  },

  // 更新用户排序
  saveUserOrder (data) {
    return request({
      url: `/departments/${data.id}/user_order`,
      method: 'put',
      params: data
    })
  }
}
