import request, { jsonApi } from '@/utils/request'

export default {
  /**
	 * 列出所有模板
	 * @param params 要传的参数值
	 * @returns 返回接口数据
	 */
  async getTemplates (params) {
    const { results: templates, count } = await request({
      url: '/targetApproveTemplates',
      method: 'get',
      params
    })
    return { templates, count }
  },
  /**
	 * 获取模板
	 * @param id 模板id
	 * @returns 返回接口数据
	 */
  getTemplate (id) {
    return request({
      url: `/targetApproveTemplates/${id}`,
      method: 'get'
    })
  },
  /**
	 * 新增/更新模板
	 * @param data 模板信息
	 * @returns 返回接口数据
	 */
  async saveTemplate (data) {
    return data.id
      ? request({
        url: `/targetApproveTemplates/${data.id}`,
        method: 'put',
        data: data
      })
      : request({
        url: '/targetApproveTemplate',
        method: 'post',
        data: data
      })
  },
  /**
	 * 保存模板明细
	 * @param id 模板id
	 * @param list 模板明细
	 * @returns 返回接口数据
	 */
  saveTemplateList (id, list) {
    return jsonApi({
      url: `/targetApproveTemplates/${id}/editProjectTemplateLines`,
      method: 'post',
      data: { projectTemplateLines: list }
    })
  },
  /**
	 * 删除模板
	 * @param id 模板id
	 * @returns 返回接口数据
	 */
  deleteTemplate (id) {
    return request({
      url: `/targetApproveTemplates/${id}`,
      method: 'delete'
    })
  }
}
