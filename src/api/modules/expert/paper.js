import request from '@/utils/request'
import { EXPERT_PAPER_TYPE } from '@/data/constant'

export default {
  /**
	 * 列出高校的所有论文
	 * @param expertId 专家ID
	 * @param params 要传的参数值
	 * @returns 返回接口数据
	 */
  async getAllPapers (type, params) {
    const paperPath = EXPERT_PAPER_TYPE[type]

    const { results: papers, count } = await request({
      url: `/college/${paperPath}Papers`,
      method: 'get',
      params
    })
    return { papers, count }
  },
  /**
	 * 列出专家的论文
	 * @param expertId 专家ID
	 * @param params 要传的参数值
	 * @returns 返回接口数据
	 */
  async getPapers (type, expertId, params) {
    const paperPath = EXPERT_PAPER_TYPE[type]

    const { results: papers, count } = await request({
      url: `/experts/${expertId}/${paperPath}Papers`,
      method: 'get',
      params
    })
    return { papers, count }
  },
  /**
	 * 查看论文信息
	 * @returns 返回接口数据
	 */
  getPaper (type, id) {
    const paperPath = EXPERT_PAPER_TYPE[type]

    return request({
      url: `/${paperPath}Papers/${id}`,
      method: 'get'
    })
  },
  /**
	 * 新增论文
	 * @param paper 论文信息
	 * @returns 返回接口数据
	 */
  createPaper (type, expertId, paper) {
    const paperPath = EXPERT_PAPER_TYPE[type]

    return request({
      url: `/experts/${expertId}/${paperPath}Papers`,
      method: 'post',
      data: paper
    })
  },
  /**
	 * 更新论文
	 * @param paper 论文信息
	 * @returns 返回接口数据
	 */
  updatePaper (type, paper) {
    const paperPath = EXPERT_PAPER_TYPE[type]

    return request({
      url: `/${paperPath}Papers/${paper.id}`,
      method: 'put',
      data: paper
    })
  },
  /**
	 * 删除论文
	 * @param id 论文ID
	 * @returns 返回接口数据
	 */
  removePaper (type, id, params) {
    const paperPath = EXPERT_PAPER_TYPE[type]

    return request({
      url: `/${paperPath}Papers/${id}`,
      method: 'delete',
      data: params
    })
  }
}
