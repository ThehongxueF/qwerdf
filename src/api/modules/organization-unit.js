import request from '@/utils/request'

export default {
  /**
	 * 列出高校的组织机构列表
	 * @param params 要传的参数值
	 * @returns 返回接口数据
	 */
  async getOrganizationUnits (params) {
    const { results: organizationUnits, count } = await request({
      url: '/organizationUnits',
      method: 'get',
      params
    })
    return { organizationUnits, count }
  },
  /**
	 * 新增/更新成果
	 * @param organizationUnit 成果信息
	 * @returns 返回接口数据
	 */
  saveOrganizationUnit (organizationUnit) {
    return (organizationUnit.id
      ? request({
        url: `/organizationUnits/${organizationUnit.id}`,
        method: 'put',
        data: organizationUnit
      })
      : request({
        url: '/organizationUnits',
        method: 'post',
        data: organizationUnit
      }))
  },
  /**
	 * 删除/下线成果
	 * @param params 要传的参数值
	 * @returns 返回接口数据
	 */
  removeOrganizationUnit (id) {
    return request({
      url: `/organizationUnits/${id}`,
      method: 'delete'
    })
  },
  /**
	 * 查看成果信息
	 * @returns 返回接口数据
	 */
  getOrganizationUnit (id) {
    return request({
      url: `/organizationUnits/${id}`,
      method: 'get'
    })
  },
  /**
	 * 获取树结构组织机构
	 */
  tree () {
    return request({
      url: `/organizationUnits/tree`,
      method: 'get'
    })
  }
}
