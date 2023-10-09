import cloneDeep from 'lodash/cloneDeep'
import request from '@/utils/request'
import encrypt from '@/utils/encrypt'
import EncryptApi from './encrypt'

export default {
  /**
	 * 列出高校的成员
	 * @param params 要传的参数值
	 * @returns 返回接口数据
	 */
  async getUsers (params) {
    const { results: users = [], count } = await request({
      url: '/users',
      method: 'get',
      params
    })
    return { users, count }
  },
  /**
	 * 列出没有被关联的专家用户
	 * @param params 要传的参数值
	 * @returns 返回接口数据
	 */
  async getUnExpertUsers (params) {
    const { results: users = [], count } = await request({
      url: '/unAttachmentExpertUsers',
      method: 'get',
      params
    })
    return { users, count }
  },
  /**
	 * 列出联系人
	 * @param params 要传的参数值
	 * @returns 返回接口数据
	 */
  async getUserContacts (params) {
    const { results: users = [], count } = await request({
      url: 'user/contacts',
      method: 'get',
      params
    })
    return { users, count }
  },
  /**
	 * 新增/更新用户
	 * @param user 用户信息
	 * @returns 返回接口数据
	 */
  async saveUser (user) {
    const requestData = cloneDeep(user)
    const { password } = user
    const encryptOption = await EncryptApi.keys() // 获取加密所需参数

    if (password) {
      requestData.password = encrypt(password, encryptOption)
    }

    return requestData.id
      ? request({
        url: `/users/${requestData.id}`,
        method: 'put',
        data: requestData
      })
      : request({
        url: '/users',
        method: 'post',
        data: requestData
      })
  },
  /**
	 * 列出高校的成员
	 * @param params 要传的参数值
	 * @returns 返回接口数据
	 */
  getUser (id) {
    return request({
      url: `/users/${id}`,
      method: 'get'
    })
  },
  /**
	 * 列出高校的成员
	 * @param params 要传的参数值
	 * @returns 返回接口数据
	 */
  removeUser (id) {
    return request({
      url: `/users/${id}`,
      method: 'delete'
    })
  },
  /**
	 * 查看个人信息
	 * @returns 返回接口数据
	 */
  getCurrentUser () {
    return request({
      url: '/user',
      method: 'get'
    })
  },
  /**
	 * 更新个人信息
	 * @param user 用户信息
	 * @returns 返回接口数据
	 */
  updateCurrentUser (user) {
    return request({
      url: '/user',
      method: 'put',
      data: user
    })
  },
  /**
	 * 获取当前用户关联的专家
	 * @returns 返回接口数据
	 */
  getUserRelativeExpert (id) {
    return request({
      url: `/users/${id}/relativeExpert`,
      method: 'get'
    })
  },
  /**
	 * 更新个人信息
	 * @param id 用户id
   * @param enable 是否启用
	 * @returns 返回接口数据
	 */
  enable (id, enable) {
    return request({
      url: `/users/${id}/enable`,
      method: enable ? 'post' : 'delete'
    })
  },
  /**
	 * 更新密码
	 * @param data
	 * @returns 返回接口数据
	 */
  async changePassword ({ oldPassword, password }) {
    const encryptOption = await EncryptApi.keys() // 获取加密所需参数

    return request({
      url: `/user/password`,
      method: 'put',
      data: {
        oldPassword: encrypt(oldPassword, encryptOption),
        password: encrypt(password, encryptOption)
      }
    })
  },
  /**
   * 获取用户的成果
   * @param id 用户id
   */
  async getAchievementsOfUser (id, params) {
    const { results: achievements, count } = await request({
      url: `/users/${id}/achievements`,
      params
    })
    return { achievements, count }
  },
  /**
   * 获取用户的需求
   * @param id 用户id
   */
  async getDemandsOfUser (id, params) {
    const { results: demands, count } = await request({
      url: `/users/${id}/demands`,
      params
    })
    return { demands, count }
  },
  /**
   * 获取用户的项目备案
   * @param id 用户id
   */
  async getProjectsOfUser (id, params) {
    const { results: projects, count } = await request({
      url: `/users/${id}/projects`,
      params
    })
    return { projects, count }
  },
  /**
   * 获取专家用户的申领状态
   * @param id 用户id
   */
  async getClaim (id) {
    return request({
      url: `/users/${id}/claims`
    })
  },
  /**
   * 获取企业用户的需求/对接数
   * @param id 用户id
   */
  async getCount (id) {
    return request({
      url: `/users/${id}/demandAndDockingCount`
    })
  },
  /**
	 * 审核用户
	 */
  verify (user) {
    return request({
      url: `/users/${user.id}/verify`,
      method: 'post',
      data: { state: user.state }
    })
  },
  /**
	 * 解除校内用户与专家主页绑定关系
	 */
  deleteExpertRelation (id) {
    return request({
      url: `/users/${id}/deleteExpertRelation`,
      method: 'post'
    })
  },
  /**
   * 获取忘记密码短信验证码
   * @param params 要传的参数值
   * @returns
   */
  async forgetCode (params) {
    const encryptOption = await EncryptApi.keys() // 获取加密所需参数
    return request({
      url: `/user/forgetCode`,
      method: 'post',
      data: { ...params, mobile: await encrypt(params.mobile, encryptOption) }
    })
  },
  /**
   * 获取更改密码短信验证码
   * @param params 要传的参数值
   * @returns
   */
  async changePasswordByCode ({ mobile, smsCode, password }) {
    const encryptOption = await EncryptApi.keys() // 获取加密所需参数
    return request({
      url: `/user/changePasswordByCode`,
      method: 'post',
      data: { mobile: await encrypt(mobile, encryptOption), code: smsCode, newPassword: await encrypt(password, encryptOption) }
    })
  },
  /**
	 * 批量处理
   * @param params 要传的参数值
	 * @returns 返回接口数据
	 */
  batchProcessing (params) {
    if (params.type === 'published') {
      return request({
        url: `/users/batchPublish`,
        method: 'post',
        data: {
          ids: params.ids
        }
      })
    } else if (params.type === 'unPublished') {
      return request({
        url: `/users/batchHide`,
        method: 'delete',
        data: {
          ids: params.ids
        }
      })
    } else if (params.type === 'back') {
      return request({
        url: `/users/batchBack`,
        method: 'post',
        data: {
          ids: params.ids
        }
      })
    } else {
      return request({
        url: `/users/batchVerify`,
        method: 'post',
        data: {
          ids: params.ids,
          state: params.type
        }
      })
    }
  },
  /**
	 * 获取个人的各种统计数量
	 * @returns 返回接口数据
	 */
  getUserCounts () {
    return request({
      url: '/user/count',
      method: 'get'
    })
  },
  /**
   * 更改手机号时获取短信验证码
   * @param params 要传的参数值
   * @returns
   */
  async checkMobileVerification ({ mobile, captchaCode, captchaId }) {
    const encryptOption = await EncryptApi.keys() // 获取加密所需参数
    return request({
      url: `/user/checkMobileVerification`,
      method: 'post',
      data: { mobile: await encrypt(mobile, encryptOption), captchaCode: captchaCode, captchaId: captchaId }
    })
  },
  /**
   * 验证手机号
   * @param params 要传的参数值
   * @returns
   */
  async confirmOldMobile ({ code }) {
    return request({
      url: `/user/confirmOldMobile`,
      method: 'post',
      data: { code: code }
    })
  },
  /**
   * 更新手机号
   * @param params 要传的参数值
   * @returns
   */
  async updateMobile ({ mobile, code }) {
    const encryptOption = await EncryptApi.keys() // 获取加密所需参数
    return request({
      url: `/user/updateMobile`,
      method: 'post',
      data: { mobile: await encrypt(mobile, encryptOption), code: code }
    })
  }
}
