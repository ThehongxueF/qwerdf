import request from '@/utils/request'

export default {
  /**
	 * 更新高校
	 * @param college 高校信息
	 * @returns 返回接口数据
	 */
  update (college) {
    return request({
      url: `/college`,
      method: 'put',
      data: college
    })
  },
  /**
	 * 获取推送服务配置
	 * @param params 要传的参数值
	 * @returns 返回接口数据
	 */
  getDataSync ({ dataType, vendor }) {
    return request({
      url: '/college/dataSyncConfig',
      method: 'get',
      params: { dataType, vendor }
    })
  },
  /**
   * 上传服务推送配置
   * @param {} data
   * @returns
   */
  changeDataSync (data) {
    return request({
      url: `/college/dataSyncConfig/change`,
      method: 'post',
      data
    })
  }
}
