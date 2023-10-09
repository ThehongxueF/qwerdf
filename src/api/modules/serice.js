import request from '@/utils/request'

export default {
  /**
	 * 列出高校的所有服务
	 * @param params 要传的参数值
	 * @returns 返回接口数据
	 */
  async getServices (params) {
    const { results: services, count } = await request({
      url: '/services',
      method: 'get',
      params
    })
    return { services, count }
  },
  /**
	 * 新增/更新服务
	 * @param service 服务信息
	 * @returns 返回接口数据
	 */
  saveService (service) {
    return service.id
      ? request({
        url: `/services/${service.id}`,
        method: 'put',
        data: service
      })
      : request({
        url: '/services',
        method: 'post',
        data: service
      })
  },
  /**
	 * 删除/下线服务
	 * @param params 要传的参数值
	 * @returns 返回接口数据
	 */
  removeService (id) {
    return request({
      url: `/services/${id}`,
      method: 'delete'
    })
  },
  /**
	 * 查看服务信息
	 * @returns 返回接口数据
	 */
  async getService (id) {
    return request({
      url: `/services/${id}`,
      method: 'get'
    })
  },
  /**
	 * 上线服务
	 */
  publish (id) {
    return request({
      url: `/services/${id}/publish`,
      method: 'post'
    })
  },
  /**
	 * 下线服务
	 */
  unPublish (id) {
    return request({
      url: `/services/${id}/publish`,
      method: 'delete'
    })
  },
  /**
	 * 审核服务
	 */
  verify (service) {
    return request({
      url: `/services/${service.id}/verify`,
      method: 'post',
      data: { state: service.state }
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
        url: `/services/batchPublish`,
        method: 'post',
        data: {
          ids: params.ids
        }
      })
    } else if (params.type === 'unPublished') {
      return request({
        url: `/services/batchHide`,
        method: 'post',
        data: {
          ids: params.ids
        }
      })
    } else if (params.type === 'back') {
      return request({
        url: `/services/batchBack`,
        method: 'post',
        data: {
          ids: params.ids
        }
      })
    } else {
      return request({
        url: `/services/batchVerify`,
        method: 'post',
        data: {
          ids: params.ids,
          state: params.type
        }
      })
    }
  }
}
