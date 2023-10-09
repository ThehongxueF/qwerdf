import request from '@/utils/request'
import { jsonApi } from '@/utils/request'

export default {
  /**
	 * 列出资源的所有相关联系人
	 * @param params 要传的参数值
	 * @returns 返回接口数据
	 */
  async getResourceContacts (params) {
    const { results: contacts, count } = await request({
      url: '/resourceContacts',
      method: 'get',
      params
    })
    return { contacts, count }
  },

  /**
	 * 新增/更新需求
	 * @param demand 需求信息
	 * @returns 返回接口数据
	 */
  saveResourceContact (contact) {
    return contact.id
      ? jsonApi({
        url: `/resourceContacts/${contact.id}`,
        method: 'put',
        data: contact
      })
      : jsonApi({
        url: '/resourceContacts',
        method: 'post',
        data: contact
      })
  },
  /**
	 * 删除相关联系人
	 * @param params 要传的参数值
	 * @returns 返回接口数据
	 */
  removeResourceContact (id) {
    return request({
      url: `/resourceContacts/${id}`,
      method: 'delete'
    })
  },
  /**
	 * 查看相关联系人信息
	 * @returns 返回接口数据
	 */
  async getResourceContact (id) {
    return request({
      url: `/resourceContacts/${id}`,
      method: 'get'
    })
  },
  /**
	 * 搜索联系人
	 * @param params 要传的参数值
	 * @returns 返回接口数据
	 */
  async searchResourceContacts (params) {
    const { results: contacts, count } = await request({
      url: '/resourceContacts/search',
      method: 'get',
      params
    })
    return { contacts, count }
  },
  /**
	 * 成果查询企业的接口
	 * @param params 要传的参数值
	 * @returns 返回接口数据
	 */
  async searchAchievementEnterprise (params) {
    const { results: enterprises, count } = await request({
      url: '/resourceContacts/enterprise',
      method: 'get',
      params
    })
    return { enterprises, count }
  },
  /**
	 * 天眼查查询企业的接口
	 * @param params 要传的参数值
	 * @returns 返回接口数据
	 */
  async searchEnterprise (params) {
    return await request({
      url: '/tyan/enterprise/search',
      method: 'get',
      params
    })
  }
}
