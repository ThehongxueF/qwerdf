/* 项目支出明细接口。
 *
 * 每个项目有多个项目支出明细，它包含通用的增删改查接口。
 */

import request from '@/utils/request'

export default {
  async list ({ projectId, ...params }) {
    const data = await request({
      url: `/projects/${projectId}/expenditureLines`,
      method: 'get',
      params: params
    })
    return { total: data.count, expenditureLines: data.results }
  },
  async create ({ projectId, ...params }) {
    await request({
      url: `/projects/${projectId}/expenditureLine`,
      method: 'post',
      data: params
    })
  },
  async update ({ id, ...params }) {
    await request({
      url: `/projects/expenditureLine/${id}`,
      method: 'put',
      data: params
    })
  },
  async destroy (id) {
    await request({
      url: `/projects/expenditureLine/${id}`,
      method: 'delete'
    })
  }
}
