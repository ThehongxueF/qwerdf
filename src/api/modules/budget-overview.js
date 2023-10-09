/* 项目预算概览接口。
 *
 * 每个项目都有一个项目预算概览，它包括该预算的审核状态。
 */

import request from '@/utils/request'

export default {
  async find ({ projectId }) {
    const data = await request({
      url: `/projects/${projectId}/budget`,
      method: 'get'
    })
    return data
  },
  async submitVerification ({ projectId, projectTemplateId }) {
    await request({
      url: `/projects/${projectId}/budget/createApprove`,
      method: 'post',
      data: { projectTemplateId }
    })
  },
  async findVerificationRecords ({ projectId }) {
    const records = await request({
      url: `/projects/${projectId}/budget/approves`,
      method: 'get'
    })
    return records
  },
  async verify ({ projectId, ...params }) {
    await request({
      url: `/projects/${projectId}/budget/verify`,
      method: 'post',
      data: params
    })
  }
}
