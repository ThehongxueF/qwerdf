import request from '@/utils/request'

export default {
  /**
	 * 列出高校的所有团队
	 * @param params 要传的参数值
	 * @returns 返回接口数据
	 */
  async getTeams (params) {
    const { results: teams, count } = await request({
      url: '/teams',
      method: 'get',
      params
    })
    return { teams, count }
  },
  /**
	 * 列出某用户的所有团队
	 * @param userId 用户ID
	 * @param params 要传的参数值
	 * @returns 返回接口数据
	 */
  async getTeamsOfUser (userId, params) {
    const teams = await request({
      url: `/users/${userId}/teams`,
      method: 'get',
      params
    })
    const count = (teams && teams.length) || 0
    return { teams, count }
  },
  /**
	 * 新增/更新团队
	 * @param team 团队信息
	 * @returns 返回接口数据
	 */
  saveTeam (team) {
    return (team.id
      ? request({
        url: `/teams/${team.id}`,
        method: 'put',
        data: team
      })
      : request({
        url: '/teams',
        method: 'post',
        data: team
      }))
  },
  /**
	 * 删除团队
	 * @param params 要传的参数值
	 * @returns 返回接口数据
	 */
  removeTeam (id) {
    return request({
      url: `/teams/${id}`,
      method: 'delete'
    })
  },
  /**
	 * 查看团队信息
	 * @returns 返回接口数据
	 */
  getTeam (id) {
    return request({
      url: `/teams/${id}`,
      method: 'get'
    })
  },
  /**
	 * 列出团队成员
	 * @param teamId 团队id
	 * @param params 要传的参数值
	 * @returns 返回接口数据
	 */
  async getMembersOfTeam (teamId, params) {
    const { results: members, count } = await request({
      url: `/teams/${teamId}/members`,
      method: 'get',
      params
    })
    return { members, count }
  },
  /**
	 * 获取团队成员
	 * @param teamId 团队id
	 * @param memberId 成员id
	 * @returns 返回接口数据
	 */
  getMember (teamId, memberId) {
    return request({
      url: `/teams/${teamId}/members/${memberId}`,
      method: 'get'
    })
  },
  /**
	 * 新增团队成员
	 * @param teamId 团队id
	 * @param data 成员信息
	 * @returns 返回接口数据
	 */
  saveMembers (teamId, data) {
    return request({
      url: `/teams/${teamId}/members`,
      method: 'post',
      data
    })
  },
  /**
	 * 更新团队成员
	 * @param teamId 团队id
	 * @param data 成员信息
	 * @returns 返回接口数据
	 */
  updateMember (teamId, memberId, data) {
    return request({
      url: `/teams/${teamId}/members/${memberId}`,
      method: 'put',
      data
    })
  },
  /**
	 * 列出不在指定团队的用户
	 * @param teamId 团队id
	 * @param params 要传的参数值
	 * @returns 返回接口数据
	 */
  async getMembersNotInTeam (teamId, params) {
    const members = await request({
      url: `/teams/${teamId}/members/notIn`,
      method: 'get',
      params
    })
    return members
  },
  /**
	 * 团队服务的成果/专家/需求/项目/服务
	 * @param teamId 团队id
	 * @param params 要传的参数值
	 * @returns 返回接口数据
	 */
  getTargetOfTeam (teamId, params) {
    return request({
      url: `/teams/${teamId}/target`,
      method: 'get',
      params
    })
  },
  /**
	 * 删除团队成员
	 */
  removeMember (teamId, memberId) {
    return request({
      url: `/teams/${teamId}/members/${memberId}`,
      method: 'delete'
    })
  },
  /**
	 * 新增团队成员
	 * @param teamId 团队id
	 * @param data 成员信息
	 * @returns 返回接口数据
	 */
  transformData (oldMember, newMember) {
    const { teamId: sourceTeamId, servantId: sourceServantId } = oldMember
    const { teamId: targetTeamId, servantId: targetServantId } = newMember
    return request({
      url: `/teams/transformData`,
      method: 'post',
      data: {
        sourceTeamId,
        sourceServantId,
        targetTeamId,
        targetServantId
      }
    })
  }
}
