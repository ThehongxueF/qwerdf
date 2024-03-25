import request from '@/utils/request'

export default {
  //  获取模块列表
  async getDynamicModels (params) {
    const { dynamicModels, count } = await request({
      url: '/dynamic_models',
      method: 'get',
      params
    })
    return { dynamicModels, count }
  },

  //  新增/更新模块
  saveDynamicModels (data) {
    return (data.dynamicModel.id
      ? request({
        url: `/dynamic_models/${data.dynamicModel.id}`,
        method: 'put',
        data: data
      })
      : request({
        url: '/dynamic_models',
        method: 'post',
        data: data
      }))
  },

  // 获取模块详情
  getDynamicModel (id) {
    return request({
      url: `/dynamic_models/${id}`,
      method: 'get'
    })
  }
}
