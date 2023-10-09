import request from '@/utils/request'

export default {
  /**
	 * 列出所有对接
	 * @param params 要传的参数值
	 * @returns 返回接口数据
	 */
  async getDockings (params) {
    const { results: dockings, count } = await request({
      url: '/dockings',
      method: 'get',
      params
    })
    return { dockings, count }
  },
  /**
	 * 查看对接信息
   * @param id 对接ID
	 * @returns 返回接口数据
	 */
  async getDocking (id) {
    return request({
      url: `/dockings/${id}`,
      method: 'get'
    })
  },
  /**
	 * 列出成果/需求/专家下的所有对接
	 * @param params 要传的参数值
	 * @returns 返回接口数据
	 */
  async getDockingsOfTarget (params) {
    const { results: dockings, count } = await request({
      url: '/dockings/target',
      method: 'post',
      params
    })
    return { dockings, count }
  },
  /**
	 * 列出某用户发起/响应所有对接
	 * @param params 要传的参数值
	 * @returns 返回接口数据
	 */
  async getDockingsOfUser (id, params) {
    const { results: dockings, count } = await request({
      url: `/dockings/user/${id}`,
      method: 'get',
      params
    })
    return { dockings, count }
  },
  /**
	 * 列出某对接的所有消息
	 * @param params 要传的参数值
	 * @returns 返回接口数据
	 */
  async getMessagesOfDocking (dockingId, params = {}) {
    const { results: messages, count } = await request({
      url: `/dockings/${dockingId}/messages`,
      method: 'get',
      params
    })
    return { messages, count }
  }
}
