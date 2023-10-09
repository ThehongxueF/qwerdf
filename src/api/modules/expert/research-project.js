import request from '@/utils/request'

export default {
  /**
	 * 列出高校所有的研究项目
	 * @param params 要传的参数值
	 * @returns 返回接口数据
	 */
  async getAllResearchProjects (params) {
    const { results: researchProjects, count } = await request({
      url: `/college/researchProjects`,
      method: 'get',
      params
    })
    return { researchProjects, count }
  },
  /**
	 * 列出专家的研究项目
	 * @param expertId 专家ID
	 * @param params 要传的参数值
	 * @returns 返回接口数据
	 */
  async getResearchProjects (expertId, params) {
    const { results: researchProjects, count } = await request({
      url: `/experts/${expertId}/researchProjects`,
      method: 'get',
      params
    })
    return { researchProjects, count }
  },
  /**
	 * 查看研究项目信息
	 * @returns 返回接口数据
	 */
  getResearchProject (id) {
    return request({
      url: `/researchProjects/${id}`,
      method: 'get'
    })
  },
  /**
	 * 新增研究项目
	 * @param researchProject 研究项目信息
	 * @returns 返回接口数据
	 */
  createResearchProject (expertId, researchProject) {
    return request({
      url: `/experts/${expertId}/researchProjects`,
      method: 'post',
      data: researchProject
    })
  },
  /**
	 * 更新研究项目
	 * @param patent 研究项目信息
	 * @returns 返回接口数据
	 */
  updateResearchProject (researchProject) {
    return request({
      url: `/researchProjects/${researchProject.id}`,
      method: 'put',
      data: researchProject
    })
  },
  /**
	 * 删除研究项目
	 * @param id 研究项目ID
	 * @returns 返回接口数据
	 */
  removeResearchProject (id, params) {
    return request({
      url: `/researchProjects/${id}`,
      method: 'delete',
      data: params
    })
  }
}
