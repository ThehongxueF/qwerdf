
import * as qs from 'qs'
import request from '@/utils/request'

export default {
  /**
	 * 列出所有合同
	 * @param params 要传的参数值
	 * @returns 返回接口数据
	 */
  async getContracts (params) {
    const { results: contracts, count } = await request({
      url: '/projectContracts',
      method: 'get',
      params
    })
    return { contracts, count }
  },
  /**
	 * 查看合同信息
	 * @returns 返回接口数据
	 */
  async getContract (id) {
    return request({
      url: `/projectContracts/${id}`,
      method: 'get'
    })
  },
  /**
	 * 新增/更新模板
	 * @param data 模板信息
	 * @returns 返回接口数据
	 */
  async saveContract (data) {
    return data.id
      ? request({
        url: `/projectContracts/${data.id}`,
        method: 'put',
        data: data,
        transformRequest: [function (_data) {
          // 这里需要对data中的lines特殊处理，所以先在请求前将已经stringify的数据先序列化
          const parseData = qs.parse(_data, { comma: true }) // 序列化
          // 然后重置lines数据
          parseData.lines = data.lines
          parseData.attachmentIds = data.attachmentIds
          // 最后，重新stringify
          return qs.stringify(parseData, { allowDots: true, indices: true })
        }]
      })
      : request({
        url: '/projectContracts',
        method: 'post',
        data: data,
        transformRequest: [function (_data) {
          // 这里需要对data中的lines特殊处理，所以先在请求前将已经stringify的数据先序列化
          const parseData = qs.parse(_data, { comma: true }) // 序列化
          // 然后重置lines数据
          parseData.lines = data.lines
          parseData.attachmentIds = data.attachmentIds
          // 最后，重新stringify
          return qs.stringify(parseData, { allowDots: true, indices: true })
        }]
      })
  },
  /**
	 * 删除/下线合同
	 * @param params 要传的参数值
	 * @returns 返回接口数据
	 */
  removeContract (id) {
    return request({
      url: `/projectContracts/${id}`,
      method: 'delete'
    })
  },
  /**
	 * 审核合同
	 */
  verify (contract) {
    if (contract.state === 'verifing') {
      return request({
        url: `/projectContracts/${contract.id}/prepareApprove`,
        method: 'post'
      })
    } else {
      return request({
        url: `/projectContracts/${contract.id}/verify`,
        method: 'post',
        data: { state: contract.state, reason: contract.reason, isBackToStart: contract.isStart }
      })
    }
  },
  /**
	 * 获得审核信息
	 * @returns 返回接口数据
	 */
  getContractApproves (id) {
    return request({
      url: `/projectContracts/${id}/approves`,
      method: 'get'
    })
  }
}
