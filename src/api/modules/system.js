import request from '@/utils/request'

export default {
  /**
	 * 获取系统设置
	 * @returns 返回接口数据
	 */
  async getSystemSettings () {
    return request({
      url: `/system`,
      method: 'get'
    })
  },
  /**
	 * 新增/更新系统设置
	 * @param system 跟进信息
	 * @returns 返回接口数据
	 */
  saveSystemSettings (systemSettings) {
    return request({
      url: `/system`,
      method: 'put',
      data: systemSettings
    })
  }
}
