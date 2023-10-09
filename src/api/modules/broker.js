import request from '@/utils/request'

export default {
  /**
	 * 列出技术经纪人服务的成果/专家/需求/项目数量
	 * @returns 返回接口
	 */
  async getCountsOfBroker (userId) {
    return request({
      url: `/brokers/${userId}/serviceCount`,
      method: 'get'
    })
  },
  /**
	 * 列出技术经纪人服务的成果/专家/需求/项目
	 * @returns 返回接口
	 */
  async getTargetOfBroker (id, params) {
    return request({
      url: `/brokers/${id}/target`,
      method: 'get',
      params
    })
  }
}
