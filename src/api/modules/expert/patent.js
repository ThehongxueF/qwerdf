import request from '@/utils/request'

export default {
  /**
	 * 列出高校的所有专利
	 * @param params 要传的参数值
	 * @returns 返回接口数据
	 */
  async getAllPatents (params) {
    const { results: patents, count } = await request({
      url: `/college/patents`,
      method: 'get',
      params
    })
    return { patents, count }
  },
  /**
	 * 列出专家的专利
	 * @param expertId 专家ID
	 * @param params 要传的参数值
	 * @returns 返回接口数据
	 */
  async getPatents (expertId, params) {
    const { results: patents, count } = await request({
      url: `/experts/${expertId}/patents`,
      method: 'get',
      params
    })
    return { patents, count }
  },
  /**
	 * 查看专利信息
	 * @returns 返回接口数据
	 */
  getPatent (id) {
    return request({
      url: `/patents/${id}`,
      method: 'get'
    })
  },
  /**
	 * 新增专利
	 * @param patent 专利信息
	 * @returns 返回接口数据
	 */
  createPatent (expertId, patent) {
    return request({
      url: `/experts/${expertId}/patents`,
      method: 'post',
      data: patent
    })
  },
  /**
	 * 更新专利
	 * @param patent 专利信息
	 * @returns 返回接口数据
	 */
  updatePatent (patent) {
    return request({
      url: `/patents/${patent.id}`,
      method: 'put',
      data: patent
    })
  },
  /**
	 * 删除专利
	 * @param id 专利ID
	 * @returns 返回接口数据
	 */
  removePatent (id, params) {
    return request({
      url: `/patents/${id}`,
      method: 'delete',
      data: params
    })
  }
}
