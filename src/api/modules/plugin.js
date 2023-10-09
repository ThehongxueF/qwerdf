import request from '@/utils/request'

export default {
  /**
	 * 列出所有插件
	 * @param params 要传的参数值
	 * @returns 返回接口数据
	 */
  async getPlugins (params) {
    const { results: plugins, count } = await request({
      url: '/plugins',
      method: 'get',
      params
    })
    return { plugins, count }
  },
  /**
	 * 插件详情
	 * @param id 插件ID
	 * @returns 返回接口数据
	 */
  getPlugin (id) {
    return request({
      url: `/plugins/${id}`,
      method: 'get'
    })
  },
  /**
	 * 上下线
	 * @returns 返回接口数据
	 */
  changeState (id, state) {
    return request({
      url: `/plugins/${id}/openState`,
      method: 'put',
      data: {
        openState: state
      }
    })
  },
  /**
	 * 修改插件推送用户
	 * @returns 返回接口数据
	 */
  changeTargetUser (id, params) {
    return request({
      url: `/plugins/${id}/changeTargetUser`,
      method: 'post',
      data: params
    })
  }
}
