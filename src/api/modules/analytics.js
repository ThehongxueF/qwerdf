import request from '@/utils/request'

export default {
  /**
	 * 推送UV
	 * @param data 统计数据
	 * @returns 返回接口数据
	 */
  userViews (data) {
    return request({
      url: '/userViews',
      method: 'post',
      data
    })
  }
}
