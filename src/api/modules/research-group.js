import request from '@/utils/request'

export default {
  /**
	 * 列出所有课题组
	 * @param params 要传的参数值
	 * @returns 返回接口数据
	 */
  async getSubjectTeams (params) {
    const { results: subjectTeams, count } = await request({
      url: '/subjectTeams',
      method: 'get',
      params
    })
    return { subjectTeams, count }
  },
  /**
	 * 新增/更新国家实验室
	 * @param subjectTeam 国家实验室信息
	 * @returns 返回接口数据
	 */
  saveSubjectTeam (subjectTeam) {
    return subjectTeam.id
      ? request({
        url: `/subjectTeams/${subjectTeam.id}`,
        method: 'put',
        data: subjectTeam
      })
      : request({
        url: '/subjectTeams',
        method: 'post',
        data: subjectTeam
      })
  },
  /**
	 * 删除/下线国家实验室
	 * @param params 要传的参数值
	 * @returns 返回接口数据
	 */
  removeSubjectTeam (id) {
    return request({
      url: `/subjectTeams/${id}`,
      method: 'delete'
    })
  },
  /**
	 * 查看国家实验室信息
	 * @returns 返回接口数据
	 */
  async getSubjectTeam (id) {
    return request({
      url: `/subjectTeams/${id}`,
      method: 'get'
    })
  },
  /**
	 * 上线国家实验室
	 */
  publish (id) {
    return request({
      url: `/subjectTeams/${id}/changeState`,
      method: 'post',
      data: { visible: true }
    })
  },
  /**
	 * 下线国家实验室
	 */
  unPublish (id) {
    return request({
      url: `/subjectTeams/${id}/changeState`,
      method: 'post',
      data: { visible: false }
    })
  },
  /**
	 * 审核国家实验室
	 */
  // verify (subjectTeam) {
  //   return request({
  //     url: `/subjectTeams/${subjectTeam.id}/verify`,
  //     method: 'post',
  //     data: { state: subjectTeam.state }
  //   })
  // },
  verify (subjectTeam) {
    if (subjectTeam.state === 'verifing') {
      return request({
        url: `/subjectTeams/${subjectTeam.id}/prepareApprove`,
        method: 'post'
      })
    } else {
      return request({
        url: `/subjectTeams/${subjectTeam.id}/verify`,
        method: 'post',
        data: { state: subjectTeam.state, reason: subjectTeam.reason, isBackToStart: subjectTeam.isStart }
      })
    }
  },
  /**
	 * 获得审核信息
	 * @returns 返回接口数据
	 */
  getSubjectTeamApproves (id) {
    return request({
      url: `/subjectTeams/${id}/approves`,
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
        url: `/subjectTeams/batchPublish`,
        method: 'post',
        data: {
          ids: params.ids
        }
      })
    } else if (params.type === 'unPublished') {
      return request({
        url: `/subjectTeams/batchHide`,
        method: 'post',
        data: {
          ids: params.ids
        }
      })
    } else if (params.type === 'back') {
      return request({
        url: `/subjectTeams/batchBack`,
        method: 'post',
        data: {
          ids: params.ids
        }
      })
    } else {
      return request({
        url: `/subjectTeams/batchVerify`,
        method: 'post',
        data: {
          ids: params.ids,
          state: params.type
        }
      })
    }
  }
}
