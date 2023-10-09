import request from '@/utils/request'

export default {
  /**
	 * 科技成果数，促成对接次数，交易项目数，转化金额
	 * @param params 要传的参数值
	 * @returns 返回接口数据
	 */
  getCounts (params) {
    return request({
      url: '/dataGraph/count',
      method: 'get',
      params
    })
  },
  /**
	 * 按月获取成果数，对接数，项目数
	 * @param params 要传的参数值
	 * @returns 返回接口数据
	 */
  getCountsByMonth (params) {
    return request({
      url: '/dataGraph/countByMonth',
      method: 'get',
      params
    })
  },
  /**
	 * 按组织机构获取成果数，项目数，合同额
	 * @param params 要传的参数值
	 * @returns 返回接口数据
	 */
  getCountsByOrg (params) {
    return request({
      url: '/dataGraph/countByOrganizationUnit',
      method: 'get',
      params
    })
  },
  /**
	 * 项目排行榜
	 * @param params 要传的参数值
	 * @returns 返回接口数据
	 */
  getProjectRank (params) {
    return request({
      url: '/dataGraph/projectRank',
      method: 'get',
      params
    })
  },
  /**
	 * 转化方式分布
	 * @param params 要传的参数值
	 * @returns 返回接口数据
	 */
  getModeDistribution (params) {
    return request({
      url: '/dataGraph/modeDistribution',
      method: 'get',
      params
    })
  },
  /**
	 * 转化去向分布
	 * @param params 要传的参数值
	 * @returns 返回接口数据
	 */
  getDirectionDistribution (params) {
    return request({
      url: '/dataGraph/directionDistribution',
      method: 'get',
      params
    })
  },
  /**
	 * 应用领域分布
	 * @param params 要传的参数值
	 * @returns 返回接口数据
	 */
  getApplicationAreasDistribution (params) {
    return request({
      url: '/dataGraph/applicationAreasDistribution',
      method: 'get',
      params
    })
  },
  /**
	 * 地区项目分布
	 * @param params 要传的参数值
	 * @returns 返回接口数据
	 */
  getLocationDistribution (params) {
    return request({
      url: '/dataGraph/locationDistribution',
      method: 'get',
      params
    })
  }
}
