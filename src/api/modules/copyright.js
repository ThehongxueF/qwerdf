import { globalApi } from '@/utils/request'

export default {
  /**
	 * 获取版权
	 * @returns 返回接口数据
	 */
  async getCopyright () {
    return await globalApi({
      url: `/global/copyright`,
      method: 'get'
    })
  }
}
