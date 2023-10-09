/* 项目预算明细接口。
 *
 * 每个项目有多个项目预算明细，它包含通用的增删改查接口。
 */

import request from '@/utils/request'

export default {
  async list ({ projectId, ...params }) {
    const data = await request({
      url: `/projects/${projectId}/budgetLines`,
      method: 'get',
      params: params
    })
    return { total: data.count, budgetLines: data.results }
  },
  async create ({ projectId, ...params }) {
    await request({
      url: `/projects/${projectId}/budgetLine`,
      method: 'post',
      data: params
    })
  },
  async update ({ id, ...params }) {
    await request({
      url: `/projects/budgetLine/${id}`,
      method: 'put',
      data: params
    })
  },
  async destroy (id) {
    await request({
      url: `/projects/budgetLine/${id}`,
      method: 'delete'
    })
  }
}
