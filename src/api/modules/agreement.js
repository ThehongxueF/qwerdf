import request from '@/utils/request'

export default {
  /**
	 * 获取用户协议
   * @params params要传的参数值
	 * @returns 返回接口数据
	 */
  async getUserAgreements (params) {
    return await request({
      url: `/userAgreements`,
      method: 'get',
      params: params
    })
  }
}
