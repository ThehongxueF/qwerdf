/* 项目支出概览接口。
 *
 * 每个项目都有一个项目支出概览，它包括该支出的审核状态。
 */

import request from '@/utils/request'

export default {
  async find ({ projectId }) {
    const data = await request({
      url: `/projects/${projectId}/expenditure`,
      method: 'get'
    })
    return data
  },
  async submitVerification ({ projectId, projectTemplateId }) {
    await request({
      url: `/projects/${projectId}/expenditure/createApprove`,
      method: 'post',
      data: { projectTemplateId }
    })
  },
  async findVerificationRecords ({ projectId }) {
    const records = await request({
      url: `/projects/${projectId}/expenditure/approves`,
      method: 'get'
    })
    return records
  },
  async verify ({ projectId, ...params }) {
    await request({
      url: `/projects/${projectId}/expenditure/verify`,
      method: 'post',
      data: params
    })
  }
}
