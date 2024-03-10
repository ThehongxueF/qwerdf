import cloneDeep from 'lodash/cloneDeep'
import request from '@/utils/request'
import encrypt from '@/utils/encrypt'
import EncryptApi from './encrypt'

export default {
  // 用户登录
  async signIn (data) {
    // const requestData = cloneDeep(data)
    const { password, smsCode } = data

    // const encryptOption = await EncryptApi.keys() // 获取加密所需参数

    if (password) {
      // requestData.password = encrypt(password, encryptOption)
      return request({
        url: '/logins',
        method: 'post',
        // data: requestData
        data: data
      })
    } else if (smsCode) {
      const requestData = cloneDeep(data)
      // const { mobile } = data
      // requestData.mobile = encrypt(mobile, encryptOption)
      return this.signInBySms(requestData)
    }
  },
  /**
	 * 短信验证码登录
   * @params data 要传的参数值
	 * @returns 返回接口数据
	 */
  signInBySms (data) {
    return request({
      url: '/login/bySms',
      method: 'post',
      data
    })
  },
  /**
	 * 获取图片验证码
   * @params params 要传的参数值
	 * @returns 返回接口数据
	 */
  getCaptcha (params) {
    return request({
      url: '/login/acquireCaptchaCode',
      responseType: 'arraybuffer',
      params
    })
  },
  /**
	 * 获取短信验证码
   * @params params 要传的参数值
	 * @returns 返回接口数据
	 */
  async getSmsCode (params) {
    const encryptOption = await EncryptApi.keys() // 获取加密所需参数

    return request({
      url: '/login/acquireSmsCode',
      method: 'post',
      data: { ...params, mobile: encrypt(params.mobile, encryptOption) }
    })
  },
  // 用户退出登录
  signOut (data) {
    return request({
      url: '/logout',
      method: 'post',
      data
    })
  }
}
