import request from '@/utils/request'
import Patent from './patent'
import Paper from './paper'
import Report from './report'
import ResearchProject from './research-project'
import AchievementClaim from './achievement-claim'

export default {
  /**
	 * 列出高校的所有专家
	 * @param params 要传的参数值
	 * @returns 返回接口数据
	 */
  async getExperts (params) {
    const { results: experts, count } = await request({
      url: '/experts',
      method: 'get',
      params
    })
    return { experts, count }
  },
  /**
	 * 新增/更新专家
	 * @param expert 专家信息
	 * @returns 返回接口数据
	 */
  saveExpert (expert) {
    return expert.id
      ? request({
        url: `/experts/${expert.id}`,
        method: 'put',
        data: expert
      })
      : request({
        url: '/experts',
        method: 'post',
        data: expert
      })
  },
  /**
	 * 删除/下线专家
	 * @param params 要传的参数值
	 * @returns 返回接口数据
	 */
  removeExpert (id) {
    return request({
      url: `/experts/${id}`,
      method: 'delete'
    })
  },
  /**
	 * 查看专家信息
	 * @returns 返回接口数据
	 */
  async getExpert (id) {
    return request({
      url: `/experts/${id}`,
      method: 'get'
    })
  },
  /**
	 * 上线专家
	 */
  publish (id) {
    return request({
      url: `/experts/${id}/publish`,
      method: 'post'
    })
  },
  /**
	 * 下线专家
	 */
  unPublish (id) {
    return request({
      url: `/experts/${id}/publish`,
      method: 'delete'
    })
  },
  /**
	 * 审核专家
	 */
  // verify (expert) {
  //   return request({
  //     url: `/experts/${expert.id}/verify`,
  //     method: 'post',
  //     data: { state: expert.state }
  //   })
  // },
  verify (expert) {
    if (expert.state === 'verifing') {
      return request({
        url: `/experts/${expert.id}/prepareApprove`,
        method: 'post'
      })
    } else {
      return request({
        url: `/experts/${expert.id}/verify`,
        method: 'post',
        data: { state: expert.state, reason: expert.reason, isBackToStart: expert.isStart }
      })
    }
  },
  /**
	 * 获得审核信息
	 * @returns 返回接口数据
	 */
  getExpertApproves (id) {
    return request({
      url: `/experts/${id}/approves`,
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
        url: `/experts/batchPublish`,
        method: 'post',
        data: {
          ids: params.ids
        }
      })
    } else if (params.type === 'unPublished') {
      return request({
        url: `/experts/batchHide`,
        method: 'post',
        data: {
          ids: params.ids
        }
      })
    } else if (params.type === 'back') {
      return request({
        url: `/experts/batchBack`,
        method: 'post',
        data: {
          ids: params.ids
        }
      })
    } else {
      return request({
        url: `/experts/batchVerify`,
        method: 'post',
        data: {
          ids: params.ids,
          state: params.type
        }
      })
    }
  },
  Patent,
  Paper,
  Report,
  ResearchProject,
  AchievementClaim
}
