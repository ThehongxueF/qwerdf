import request from '@/utils/request'

export default {
  /**
	 * 获取附件列表
	 * @returns 返回接口
	 */
  async getAttachments (data) {
    return request({
      url: `/attachments/download`,
      method: 'post',
      data
    })
  }
}
