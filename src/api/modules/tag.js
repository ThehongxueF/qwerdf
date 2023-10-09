import request from '@/utils/request'

export default {
  /**
	 * 以树结构获取高校标签库
	 * @returns 返回接口
	 */
  async getTags () {
    return request({
      url: `/tags`,
      method: 'get'
    })
  },
  /**
	 * 新增/更新标签
	 * @param tag 标签信息
	 * @returns 返回接口数据
	 */
  saveTag (tag) {
    return (tag.id
      ? request({
        url: `/tags/${tag.id}`,
        method: 'put',
        data: tag
      })
      : request({
        url: '/tags',
        method: 'post',
        data: tag
      }))
  },
  /**
	 * 删除/下线标签
	 * @param params 要传的参数值
	 * @returns 返回接口数据
	 */
  removeTag (id) {
    return request({
      url: `/tags/${id}`,
      method: 'delete'
    })
  }
}
