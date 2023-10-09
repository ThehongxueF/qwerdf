
import request from '@/utils/request'

export default {
  /**
	 * 列出所有合同
	 * @param params 要传的参数值
	 * @returns 返回接口数据
	 */
  async getNews (params) {
    const { results: news, count } = await request({
      url: '/news',
      method: 'get',
      params
    })
    return { news, count }
  },
  /**
	 * 查看合同信息
	 * @returns 返回接口数据
	 */
  async getNew (id) {
    return request({
      url: `/news/${id}`,
      method: 'get'
    })
  },
  /**
	 * 新增/更新模板
	 * @param data 模板信息
	 * @returns 返回接口数据
	 */
  async saveNews (data) {
    return data.id
      ? request({
        url: `/news/${data.id}`,
        method: 'put',
        data: data
      })
      : request({
        url: '/news',
        method: 'post',
        data: data
      })
  },
  /**
	 * 删除/下线合同
	 * @param params 要传的参数值
	 * @returns 返回接口数据
	 */
  removeNews (id) {
    return request({
      url: `/news/${id}`,
      method: 'delete'
    })
  },
  /**
	 * 上下线新闻
	 * @param params 要传的参数值
	 * @returns 返回接口数据
	 */
  publishNews (news) {
    return request({
      url: `/news/${news.id}/changeState`,
      method: 'post',
      data: { visible: news.visible }
    })
  },
  /**
	 * 审核合同
	 */
  verify (news) {
    if (news.state === 'verifing') {
      return request({
        url: `/news/${news.id}/prepareApprove`,
        method: 'post'
      })
    } else {
      return request({
        url: `/news/${news.id}/verify`,
        method: 'post',
        data: { state: news.state, reason: news.reason, isBackToStart: news.isStart }
      })
    }
  },
  /**
	 * 获得审核信息
	 * @returns 返回接口数据
	 */
  getNewsApproves (id) {
    return request({
      url: `/news/${id}/approves`,
      method: 'get'
    })
  }
}
