import request from '@/utils/request'

export default {
  /**
	 * 列出高校的所有成果
	 * @param params 要传的参数值
	 * @returns 返回接口数据
	 */
  async getAchievements (params) {
    const { results: achievements, count } = await request({
      url: '/achievements',
      method: 'get',
      params
    })
    return { achievements, count }
  },
  /**
	 * 新增/更新成果
	 * @param achievement 成果信息
	 * @returns 返回接口数据
	 */
  saveAchievement (achievement) {
    return (achievement.id
      ? request({
        url: `/achievements/${achievement.id}`,
        method: 'put',
        data: achievement
      })
      : request({
        url: '/achievements',
        method: 'post',
        data: achievement
      }))
  },
  /**
	 * 删除成果
	 * @param params 要传的参数值
	 * @returns 返回接口数据
	 */
  removeAchievement (id) {
    return request({
      url: `/achievements/${id}`,
      method: 'delete'
    })
  },
  /**
	 * 查看成果信息
	 * @returns 返回接口数据
	 */
  getAchievement (id) {
    return request({
      url: `/achievements/${id}`,
      method: 'get'
    })
  },
  /**
	 * 上线成果
	 */
  publish (id) {
    return request({
      url: `/achievements/${id}/publish`,
      method: 'post'
    })
  },
  /**
	 * 下线成果
	 */
  unPublish (id) {
    return request({
      url: `/achievements/${id}/publish`,
      method: 'delete'
    })
  },
  /**
	 * 审核成果
	 */
  verify (achievement) {
    if (achievement.state === 'verifing') {
      return request({
        url: `/achievements/${achievement.id}/prepareApprove`,
        method: 'post'
      })
    } else {
      return request({
        url: `/achievements/${achievement.id}/verify`,
        method: 'post',
        data: { state: achievement.state, reason: achievement.reason, isBackToStart: achievement.isStart }
      })
    }
  },
  /**
	 * 获得审核信息
	 * @returns 返回接口数据
	 */
  getAchievementApproves (id) {
    return request({
      url: `/achievements/${id}/approves`,
      method: 'get'
    })
  },
  /**
	 * 推广成功
   * @param params 要传的参数值
	 * @returns 返回接口数据
	 */
  popularize (id, params) {
    return request({
      url: `/achievements/${id}/popularize`,
      method: 'post',
      data: params
    })
  },
  /**
	 * 推广成功
   * @param params 要传的参数值
	 * @returns 返回接口数据
	 */
  popularizeLogs (id, params) {
    return request({
      url: `/achievements/${id}/popularizeLogs`,
      method: 'get',
      params
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
        url: `/achievements/batchPublish`,
        method: 'post',
        data: {
          ids: params.ids
        }
      })
    } else if (params.type === 'unPublished') {
      return request({
        url: `/achievements/batchHide`,
        method: 'post',
        data: {
          ids: params.ids
        }
      })
    } else if (params.type === 'back') {
      return request({
        url: `/achievements/batchBack`,
        method: 'post',
        data: {
          ids: params.ids
        }
      })
    } else {
      return request({
        url: `/achievements/batchVerify`,
        method: 'post',
        data: {
          ids: params.ids,
          state: params.type
        }
      })
    }
  }
}

