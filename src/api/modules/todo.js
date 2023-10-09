import request from '@/utils/request'

export default {
  /**
	 * 列出待办数量
	 * @returns 返回接口数据
	 */
  getToDoCount () {
    return request({
      url: '/todoCount',
      method: 'get'
    })
  },
  /**
	 * 列出待办数量
	 * @returns 返回接口数据
	 */
  async getToDoList (params) {
    const { results: todoList, count } = await request({
      url: '/todo/notifications',
      method: 'get',
      params
    })
    return { todoList, count }
  }
}
