import request from '@/utils/request'

export default {
  /**
	 * 列出高校的所有国家实验室
	 * @param params 要传的参数值
	 * @returns 返回接口数据
	 */
  async getLaboratories (params) {
    const { results: laboratories, count } = await request({
      url: '/laboratories',
      method: 'get',
      params
    })
    return { laboratories, count }
  },
  /**
	 * 新增/更新国家实验室
	 * @param laboratory 国家实验室信息
	 * @returns 返回接口数据
	 */
  saveLaboratory (laboratory) {
    return laboratory.id
      ? request({
        url: `/laboratories/${laboratory.id}`,
        method: 'put',
        data: laboratory
      })
      : request({
        url: '/laboratories',
        method: 'post',
        data: laboratory
      })
  },
  /**
	 * 删除/下线国家实验室
	 * @param params 要传的参数值
	 * @returns 返回接口数据
	 */
  removeLaboratory (id) {
    return request({
      url: `/laboratories/${id}`,
      method: 'delete'
    })
  },
  /**
	 * 查看国家实验室信息
	 * @returns 返回接口数据
	 */
  async getLaboratory (id) {
    return request({
      url: `/laboratories/${id}`,
      method: 'get'
    })
  },
  /**
	 * 上线国家实验室
	 */
  publish (id) {
    return request({
      url: `/laboratories/${id}/changeState`,
      method: 'post',
      data: { visible: true }
    })
  },
  /**
	 * 下线国家实验室
	 */
  unPublish (id) {
    return request({
      url: `/laboratories/${id}/changeState`,
      method: 'post',
      data: { visible: false }
    })
  },
  /**
	 * 审核国家实验室
	 */
  // verify (laboratory) {
  //   return request({
  //     url: `/laboratories/${laboratory.id}/verify`,
  //     method: 'post',
  //     data: { state: laboratory.state }
  //   })
  // },
  verify (laboratory) {
    if (laboratory.state === 'verifing') {
      return request({
        url: `/laboratories/${laboratory.id}/prepareApprove`,
        method: 'post'
      })
    } else {
      return request({
        url: `/laboratories/${laboratory.id}/verify`,
        method: 'post',
        data: { state: laboratory.state, reason: laboratory.reason, isBackToStart: laboratory.isStart }
      })
    }
  },
  /**
	 * 获得审核信息
	 * @returns 返回接口数据
	 */
  getLaboratoryApproves (id) {
    return request({
      url: `/laboratories/${id}/approves`,
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
        url: `/laboratories/batchPublish`,
        method: 'post',
        data: {
          ids: params.ids
        }
      })
    } else if (params.type === 'unPublished') {
      return request({
        url: `/laboratories/batchHide`,
        method: 'post',
        data: {
          ids: params.ids
        }
      })
    } else if (params.type === 'back') {
      return request({
        url: `/laboratories/batchBack`,
        method: 'post',
        data: {
          ids: params.ids
        }
      })
    } else {
      return request({
        url: `/laboratories/batchVerify`,
        method: 'post',
        data: {
          ids: params.ids,
          state: params.type
        }
      })
    }
  }
}
