import request from '@/utils/request'

export default {
  /**
	 * 列出高校所有科技报告
	 * @param params 要传的参数值
	 * @returns 返回接口数据
	 */
  async getAllTechnologyReports (params) {
    const { results: technologyReports, count } = await request({
      url: `/college/technologyReports`,
      method: 'get',
      params
    })
    return { technologyReports, count }
  },
  /**
	 * 列出专家的科技报告
	 * @param expertId 专家ID
	 * @param params 要传的参数值
	 * @returns 返回接口数据
	 */
  async getTechnologyReports (expertId, params) {
    const { results: technologyReports, count } = await request({
      url: `/experts/${expertId}/technologyReports`,
      method: 'get',
      params
    })
    return { technologyReports, count }
  },
  /**
	 * 查看科技报告信息
	 * @returns 返回接口数据
	 */
  getTechnologyReport (id) {
    return request({
      url: `/technologyReports/${id}`,
      method: 'get'
    })
  },
  /**
	 * 新增科技报告
	 * @param technologyReport 科技报告信息
	 * @returns 返回接口数据
	 */
  createTechnologyReport (expertId, technologyReport) {
    return request({
      url: `/experts/${expertId}/technologyReports`,
      method: 'post',
      data: technologyReport
    })
  },
  /**
	 * 更新科技报告
	 * @param technologyReport 科技报告信息
	 * @returns 返回接口数据
	 */
  updateTechnologyReport (technologyReport) {
    return request({
      url: `/technologyReports/${technologyReport.id}`,
      method: 'put',
      data: technologyReport
    })
  },
  /**
	 * 删除科技报告
	 * @param id 科技报告ID
	 * @returns 返回接口数据
	 */
  removeTechnologyReport (id, params) {
    return request({
      url: `/technologyReports/${id}`,
      method: 'delete',
      data: params
    })
  }
}
