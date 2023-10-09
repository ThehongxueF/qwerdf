import request from '@/utils/request'

export default {
  /**
	 * 列出高校的所有项目
	 * @param params 要传的参数值
	 * @returns 返回接口数据
	 */
  async getProjects (params) {
    const { results: projects, count } = await request({
      url: '/projects',
      method: 'get',
      params
    })
    return { projects, count }
  },
  /**
	 * 新增/更新项目
	 * @param project 项目信息
	 * @returns 返回接口数据
	 */
  saveProject (project) {
    return (project.id
      ? request({
        url: `/projects/${project.id}`,
        method: 'put',
        data: project
      })
      : request({
        url: '/projects',
        method: 'post',
        data: project
      }))
  },
  /**
	 * 新增项目资金到账
	 * @param project 项目信息
	 * @returns 返回接口数据
	 */
  createProjectFund (projectId, data) {
    return request({
      url: `/projects/${projectId}/funds`,
      method: 'post',
      data
    })
  },
  /**
	 * 更新项目资金到账
	 * @param project 项目信息
	 * @returns 返回接口数据
	 */
  updateProjectFund (fund) {
    return request({
      url: `/projects/funds/${fund.id}`,
      method: 'post',
      data: { fund }
    })
  },
  /**
	 * 删除/下线项目
	 * @param params 要传的参数值
	 * @returns 返回接口数据
	 */
  removeProject (id) {
    return request({
      url: `/projects/${id}`,
      method: 'delete'
    })
  },
  /**
	 * 查看项目信息
	 * @returns 返回接口数据
	 */
  getProject (id) {
    return request({
      url: `/projects/${id}`,
      method: 'get'
    })
  },
  /**
	 * 审核项目
	 */
  verify (project) {
    if (project.state === 'verifing') {
      return request({
        url: `/projects/${project.id}/prepareApprove`,
        method: 'post'
      })
    } else {
      return request({
        url: `/projects/${project.id}/verify`,
        method: 'post',
        data: { state: project.state, reason: project.reason, isBackToStart: project.isStart }
      })
    }
  },
  /**
	 * 获取有时限的下载地址
   * @param id 项目ID
	 * @returns 返回接口数据
	 */
  getDownloadUrl (id) {
    return request({
      url: `/projects/${id}/download`,
      method: 'get'
    })
  },
  /**
	 * 导出
   * @param id 项目ID
	 * @returns 返回接口数据
	 */
  export (params) {
    return request({
      url: `/projects/export`,
      method: 'get',
      params,
      responseType: 'blob'
    })
  },
  /**
	 * 开始项目审核
	 * @returns 返回接口数据
	 */
  startProjectApproves (id) {
    return request({
      url: `/projects/${id}/prepareApprove`,
      method: 'post'
    })
  },
  /**
	 * 获得审核信息
	 * @returns 返回接口数据
	 */
  getProjectApproves (id) {
    return request({
      url: `/projects/${id}/approves`,
      method: 'get'
    })
  }
}
