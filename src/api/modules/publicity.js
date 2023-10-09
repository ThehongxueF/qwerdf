import request from '@/utils/request'

export default {
  /**
	 * 列出高校的所有公示
	 * @param params 要传的参数值
	 * @returns 返回接口数据
	 */
  async getPublicityList (params) {
    const { results: publicityList, count } = await request({
      url: '/publicity',
      method: 'get',
      params
    })
    return { publicityList, count }
  },
  /**
	 * 新增/更新公示
	 * @param publicity 公示信息
	 * @returns 返回接口数据
	 */
  savePublicity (publicity) {
    return (publicity.id
      ? request({
        url: `/publicity/${publicity.id}`,
        method: 'put',
        data: publicity
      })
      : request({
        url: '/publicity',
        method: 'post',
        data: publicity
      }))
  },
  /**
	 * 删除/下线公示
	 * @param params 要传的参数值
	 * @returns 返回接口数据
	 */
  removePublicity (id) {
    return request({
      url: `/publicity/${id}`,
      method: 'delete'
    })
  },
  /**
	 * 查看公示信息
	 * @returns 返回接口数据
	 */
  getPublicity (id) {
    return request({
      url: `/publicity/${id}`,
      method: 'get'
    })
  },
  /**
	 * 上线公示
	 */
  publish (id) {
    return request({
      url: `/publicity/${id}/publish`,
      method: 'post'
    })
  },
  /**
	 * 下线公示
	 */
  unPublish (id) {
    return request({
      url: `/publicity/${id}/hide`,
      method: 'delete'
    })
  },
  /**
	 * 审核公示
	 */
  verify (publicity) {
    return request({
      url: `/publicity/${publicity.id}/verify`,
      method: 'post',
      data: { state: publicity.state }
    })
  }
}
