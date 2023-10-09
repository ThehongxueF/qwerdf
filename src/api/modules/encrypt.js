import request from '@/utils/request'

export default {
  /**
	 * 获取加密密钥
	 * @returns 返回接口数据
	 */
  async keys () {
    const { key, initVector: iv } = await request({
      url: `/encryptor/keys`,
      method: 'get'
    })

    return { key, iv }
  }
}
