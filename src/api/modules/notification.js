import request from '@/utils/request'

export default {
  /**
	 * 列出我的所有消息
	 * @param params 要传的参数值
	 * @returns 返回接口数据
	 */
  async getNotifications (params) {
    const { results: notifications, count } = await request({
      url: '/notifications',
      method: 'get',
      params
    })
    return { notifications, count }
  },
  /**
	 * 读取消息
	 * @returns 返回接口数据
	 */
  async read (id) {
    return request({
      url: `/notifications/${id}`,
      method: 'get'
    })
  },
  /**
	 * 已读所有
	 * @returns 返回接口数据
	 */
  async readAll () {
    return request({
      url: `/notifications/all`,
      method: 'get'
    })
  },
  /**
	 * 获取要跳转的type和id
	 * @returns 返回接口数据
	 */
  async getTarget ({ id, ...params }) {
    return request({
      url: `/notifications/${id}/getTarget`,
      method: 'get',
      params: params
    })
  }
}
