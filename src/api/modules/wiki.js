import request from '@/utils/request'

export default {
  /**
	 * 列出所有知识库
	 * @param params 要传的参数值
	 * @returns 返回接口数据
	 */
  async getWikis (params) {
    const { results: wikis, count } = await request({
      url: '/wikis',
      method: 'get',
      params
    })
    return { wikis, count }
  },
  /**
	 * 查看知识库信息
	 * @returns 返回接口数据
	 */
  async getWiki (id) {
    return request({
      url: `/wikis/${id}`,
      method: 'get'
    })
  },
  /**
	 * 新增/更新知识库
	 * @param data 知识库信息
	 * @returns 返回接口数据
	 */
  async saveWiki (data) {
    return data.id
      ? request({
        url: `/wikis/${data.id}`,
        method: 'put',
        data: data
      })
      : request({
        url: '/wikis',
        method: 'post',
        data: data
      })
  },
  /**
	 * 删除知识库
	 * @param params 要传的参数值
	 * @returns 返回接口数据
	 */
  removeWiki (id) {
    return request({
      url: `/wikis/${id}`,
      method: 'delete'
    })
  },
  /**
	 * 删除知识库
	 * @param params 要传的参数值
	 * @returns 返回接口数据
	 */
  publishWiki (wiki) {
    return request({
      url: `/wikis/${wiki.id}/changeVisible`,
      method: 'post',
      data: { visible: wiki.visible }
    })
  },
  /**
	 * 审核知识库
	 */
  verify (wiki) {
    if (wiki.state === 'verifing') {
      return request({
        url: `/wikis/${wiki.id}/prepareApprove`,
        method: 'post'
      })
    } else {
      return request({
        url: `/wikis/${wiki.id}/verify`,
        method: 'post',
        data: { state: wiki.state, reason: wiki.reason, isBackToStart: wiki.isStart }
      })
    }
  },
  /**
	 * 获得审核信息
	 * @returns 返回接口数据
	 */
  getWikiApproves (id) {
    return request({
      url: `/wikis/${id}/approves`,
      method: 'get'
    })
  }
}
