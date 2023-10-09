import request from '@/utils/request'

export default {
  /**
	 * 列出认领记录
	 * @param params 要传的参数值
	 * @returns 返回接口数据
	 */
  async getClaims (params) {
    return request({
      url: `/researchAchievementClaims`,
      method: 'get',
      params
    })
  },
  /**
	 * 列出专家主页有关的待认领的科研成果
	 * @param expertId 专家ID
	 * @param params 要传的参数值
	 * @returns 返回接口数据
	 */
  async getClaimingOfExpert (expertId, params) {
    return request({
      url: `/experts/${expertId}/researchAchievements/claiming`,
      method: 'get',
      params
    })
  },
  /**
	 * 认领
	 * @param expertID 专家ID
	 * @param data 传递数据
	 * @returns 返回接口数据
	 */
  confirmClaim (expertId, data) {
    return request({
      url: `/experts/${expertId}/claim`,
      method: 'post',
      data
    })
  },
  /**
	 * 删除论文
	 * @param id 论文ID
	 * @returns 返回接口数据
	 */
  rejectClaim (expertId, data) {
    return request({
      url: `/experts/${expertId}/claim`,
      method: 'delete',
      data
    })
  }
}
