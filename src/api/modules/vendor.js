import request from '@/utils/request'

export default {
  /**
	 * 获取供应商列表
	 * @param params 要传的参数值
	 * @returns 返回接口数据
	 */
  getVendors (params) {
    return request({
      url: '/vendors',
      method: 'get',
      params
    })
  },
  /**
	 * 获取供应商列表
	 * @returns 返回接口数据
	 */
  getAllVendors () {
    return request({
      url: '/vendors/all',
      method: 'get'
    })
  }
}
