import request from '@/utils/request'

export default {
  /**
	 * 列出所有认领
	 * @param params 要传的参数值
	 * @returns 返回接口数据
	 */
  async getClaims (params) {
    const { results: claims, count } = await request({
      url: '/claims',
      method: 'get',
      params
    })
    return { claims, count }
  },
  /**
	 * 查看认领信息
   * @param id 认领ID
	 * @returns 返回接口数据
	 */
  async getClaim (id) {
    return request({
      url: `/claims/${id}`,
      method: 'get'
    })
  },
  /**
	 * 列出某专家的所有认领
	 * @param params 要传的参数值
	 * @returns 返回接口数据
	 */
  async getClaimsOfExpert (expertId, params = {}) {
    const { results: claims, count } = await request({
      url: `/experts/${expertId}/claims`,
      method: 'get',
      params
    })
    return { claims, count }
  },
  /**
	 * 审核认领
	 */
  verify (id, action) {
    return request({
      url: `/claims/${id}/verify`,
      method: 'post',
      data: { action }
    })
  },
  /**
	 * 批量处理
   * @param params 要传的参数值
	 * @returns 返回接口数据
	 */
  batchProcessing (params) {
    if (params.type === 'published') {
      return request({
        url: `/claims/batchPublish`,
        method: 'post',
        data: {
          ids: params.ids
        }
      })
    } else if (params.type === 'unPublished') {
      return request({
        url: `/claims/batchHide`,
        method: 'post',
        data: {
          ids: params.ids
        }
      })
    } else if (params.type === 'back') {
      return request({
        url: `/claims/batchBack`,
        method: 'post',
        data: {
          ids: params.ids
        }
      })
    } else {
      return request({
        url: `/claims/batchVerify`,
        method: 'post',
        data: {
          ids: params.ids,
          state: params.type
        }
      })
    }
  }
}
