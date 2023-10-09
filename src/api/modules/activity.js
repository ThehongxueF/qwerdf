import request from '@/utils/request'

const apiHost = '/activities'

/* 获取活动报名列表 */
async function applyList (params) {
  const { results: activityApplicants, count } = await request({
    url: `${apiHost}/participantList`,
    method: 'get',
    params
  })
  return { activityApplicants, count }
}
/**
	 * 导出报名列表
   * @param id 项目ID
	 * @returns 返回接口数据
	 */
function onExport (params) {
  return request({
    url: `${apiHost}/participantList/excel`,
    method: 'get',
    params,
    responseType: 'blob'
  })
}

/* 获取活动内的报名列表 */
function applyListById (id) {
  return request({
    url: `${apiHost}/${id}/activity_applicants/all`,
    method: 'get'
  })
}

/* 更新某活动详情 */
function update (id, data) {
  return request({
    url: `${apiHost}/${id}`,
    method: 'put',
    data
  })
}

/* 获取某活动详情 */
function fetchDetail (id) {
  return request({
    url: `${apiHost}/${id}`,
    method: 'get'
  })
}

/* 创建活动 */
function create (data) {
  return request({
    url: `${apiHost}`,
    method: 'post',
    data: data
  })
}

/* 获取活动列表 */
async function list (params) {
  const { results: activities, count } = await request({
    url: `${apiHost}`,
    method: 'get',
    params
  })
  return { activities, count }
}

/**
 * 置顶
 * @param {*} data
 */
function top (id) {
  return request({
    url: `${apiHost}/${id}/top`,
    method: 'put'
  })
}

/**
 * 取消置顶
 * @param {*} data
 */
function untop (id) {
  return request({
    url: `${apiHost}/${id}/top`,
    method: 'delete'
  })
}
function verify (activity) {
  if (activity.state === 'verifing') {
    return request({
      url: `${apiHost}/${activity.id}/prepareApprove`,
      method: 'post'
    })
  } else {
    return request({
      url: `${apiHost}/${activity.id}/verify`,
      method: 'post',
      data: { state: activity.state, reason: activity.reason, isBackToStart: activity.isStart }
    })
  }
}
// 删除活动
function removeActivity (id) {
  return request({
    url: `${apiHost}/${id}`,
    method: 'delete'
  })
}
/**
	 * 上线
	 */
function publish (id) {
  return request({
    url: `${apiHost}/${id}/changeState`,
    method: 'post',
    data: { visible: true }
  })
}
/**
	 * 下线
	 */
function unPublish (id) {
  return request({
    url: `${apiHost}/${id}/changeState`,
    method: 'post',
    data: { visible: false }
  })
}
/**
 * 获得审核信息
 * @returns 返回接口数据
 */
function getActivityApproves (id) {
  return request({
    url: `${apiHost}/${id}/approves`,
    method: 'get'
  })
}

export default {
  applyList,
  applyListById,
  update,
  fetchDetail,
  create,
  list,
  top,
  untop,
  getActivityApproves,
  verify,
  publish,
  unPublish,
  onExport,
  removeActivity
}
