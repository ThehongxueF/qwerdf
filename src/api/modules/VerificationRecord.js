import request from '@/utils/request'

export default {
  /**
	 * 列出所有审核记录
	 * @param params 要传的参数值
	 * @returns 返回接口数据
	 */
  async getRecordsOfUser (userId, params) {
    const { results: records, count } = await request({
      url: `/users/${userId}/verification_records`,
      method: 'get',
      params
    })
    return { records, count }
  }
}
