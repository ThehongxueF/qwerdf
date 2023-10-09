import request from '@/utils/request'

export default {
  /**
	 * 列出我的所有跟进
	 * @param params 要传的参数值
	 * @returns 返回接口数据
	 */
  async getFollowNotesOfUser (params) {
    const { results: followNotes = [], count } = await request({
      url: `/followNotes/follower/${params.userId}`,
      method: 'get',
      params
    })
    return { followNotes, count }
  },
  /**
	 * 列出成果/需求/专家/服务下的所有跟进
	 * @param params 要传的参数值
	 * @returns 返回接口数据
	 */
  async getFollowNotesOfTarget (params) {
    const { results: followNotes, count } = await request({
      url: '/followNotes/target',
      method: 'post',
      params
    })
    return { followNotes, count }
  },
  /**
	 * 新增/更新跟进
	 * @param followNote 跟进信息
	 * @returns 返回接口数据
	 */
  saveFollowNote (followNote) {
    return followNote.id
      ? request({
        url: `/followNotes/${followNote.id}`,
        method: 'put',
        data: followNote
      })
      : request({
        url: '/followNotes',
        method: 'post',
        data: followNote
      })
  },
  /**
	 * 查看跟进信息
	 * @returns 返回接口数据
	 */
  getFollowNote (id) {
    return request({
      url: `/followNotes/${id}`,
      method: 'get'
    })
  },
  /**
	 * 获取附件列表
	 * @returns 返回接口
	 */
  async getAttachments (id) {
    return request({
      url: `/followNotes/${id}/attachmentUrls`,
      method: 'get'
    })
  }
}
