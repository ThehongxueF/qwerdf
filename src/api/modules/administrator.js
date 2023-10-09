import cloneDeep from 'lodash/cloneDeep'
import request from '@/utils/request'
import encrypt from '@/utils/encrypt'
import EncryptApi from './encrypt'

export default {
  /**
	 * 列出高校的管理员
	 * @param params 要传的参数值
	 * @returns 返回接口数据
	 */
  async getAdministrators (params) {
    const { results: administrators = [], count } = await request({
      url: '/administrators',
      method: 'get',
      params
    })
    return { administrators, count }
  },
  /**
	 * 新增/更新管理员
	 * @param administrator 管理员信息
	 * @returns 返回接口数据
	 */
  async saveAdministrator (administrator) {
    const requestData = cloneDeep(administrator)
    const { password } = administrator
    const encryptOption = await EncryptApi.keys() // 获取加密所需参数

    if (password) {
      requestData.password = encrypt(password, encryptOption)
    }

    return requestData.id
      ? request({
        url: `/administrators/${requestData.id}`,
        method: 'put',
        data: requestData
      })
      : request({
        url: '/administrators',
        method: 'post',
        data: requestData
      })
  },
  /**
	 * 列出高校的管理成员
	 * @param params 要传的参数值
	 * @returns 返回接口数据
	 */
  getAdministrator (id) {
    return request({
      url: `/administrators/${id}`,
      method: 'get'
    })
  },
  /**
	 * 移除高校的管理成员
	 * @param id 管理员ID
	 * @returns 返回接口数据
	 */
  removeAdministrator (id) {
    return request({
      url: `/administrators/${id}`,
      method: 'delete'
    })
  },
  /**
	 * 更新个人信息
	 * @param id 管理员id
   * @param enable 是否启用
	 * @returns 返回接口数据
	 */
  enable (id, enable) {
    return request({
      url: `/administrators/${id}/enable`,
      method: enable ? 'post' : 'delete'
    })
  }
}
