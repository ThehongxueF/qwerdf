import request from '@/utils/request'

export default {
  /**
	 * 列出高校的所有需求
	 * @param params 要传的参数值
	 * @returns 返回接口数据
	 */
  async getDemands (params) {
    const { results: demands, count } = await request({
      url: '/demands',
      method: 'get',
      params
    })
    return { demands, count }
  },
  /**
	 * 新增/更新需求
	 * @param demand 需求信息
	 * @returns 返回接口数据
	 */
  saveDemand (demand) {
    return demand.id
      ? request({
        url: `/demands/${demand.id}`,
        method: 'put',
        data: demand
      })
      : request({
        url: '/demands',
        method: 'post',
        data: demand
      })
  },
  /**
	 * 删除/下线需求
	 * @param params 要传的参数值
	 * @returns 返回接口数据
	 */
  removeDemand (id) {
    return request({
      url: `/demands/${id}`,
      method: 'delete'
    })
  },
  /**
	 * 查看需求信息
	 * @returns 返回接口数据
	 */
  async getDemand (id) {
    return request({
      url: `/demands/${id}`,
      method: 'get'
    })
  },
  /**
	 * 上线需求
	 */
  publish (id) {
    return request({
      url: `/demands/${id}/publish`,
      method: 'post'
    })
  },
  /**
	 * 下线需求
	 */
  unPublish (id) {
    return request({
      url: `/demands/${id}/publish`,
      method: 'delete'
    })
  },
  /**
	 * 审核需求
	 */
  // verify (demand) {
  //   return request({
  //     url: `/demands/${demand.id}/verify`,
  //     method: 'post',
  //     data: { state: demand.state }
  //   })
  // },
  verify (demand) {
    if (demand.state === 'verifing') {
      return request({
        url: `/demands/${demand.id}/prepareApprove`,
        method: 'post'
      })
    } else {
      return request({
        url: `/demands/${demand.id}/verify`,
        method: 'post',
        data: { state: demand.state, reason: demand.reason, isBackToStart: demand.isStart }
      })
    }
  },
  /**
	 * 获得审核信息
	 * @returns 返回接口数据
	 */
  getDemandApproves (id) {
    return request({
      url: `/demands/${id}/approves`,
      method: 'get'
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
        url: `/demands/batchPublish`,
        method: 'post',
        data: {
          ids: params.ids
        }
      })
    } else if (params.type === 'unPublished') {
      return request({
        url: `/demands/batchHide`,
        method: 'post',
        data: {
          ids: params.ids
        }
      })
    } else if (params.type === 'back') {
      return request({
        url: `/demands/batchBack`,
        method: 'post',
        data: {
          ids: params.ids
        }
      })
    } else {
      return request({
        url: `/demands/batchVerify`,
        method: 'post',
        data: {
          ids: params.ids,
          state: params.type
        }
      })
    }
  }
}
