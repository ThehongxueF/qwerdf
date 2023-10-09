import { Local } from '@/utils/storage'
import { ROLE, STATE, EXPERT_ACHIEVEMENT_TYPE } from './constant'

/**
 * 行业
 */
export const industryAreas = [
  '农、林、牧、渔业',
  '采矿业',
  '制造业',
  '电力、热力、燃气及水生产和供应业',
  '建筑业',
  '批发和零售业',
  '交通运输、仓储和邮政业',
  '住宿和餐饮业',
  '信息传输、软件和信息技术服务业',
  '金融业',
  '房地产业',
  '租赁和商务服务业',
  '科学研究和技术服务业',
  '水利、环境和公共设施管理业',
  '居民服务、修理和其他服务业',
  '教育',
  '卫生和社会工作',
  '文化、体育和娱乐业',
  '公共管理、社会保障和社会组织',
  '国际组织',
  '其他'
]
/**
 * 技术领域
 */
export const technologyAreaOptions = [
  '信息技术',
  '装备制造',
  '新材料',
  '新能源',
  '节能环保',
  '生物医药',
  '数字创意',
  '检验检测',
  '其他'
]

/**
 * 需求类型
 */
export const demandTypeOptions = [
  '采购高技术产品',
  '开发新产品',
  '优化技术工艺',
  '技术咨询/调研',
  '其他需求'
]

/**
 * 合作方式
 */
export const cooperationWayOptions = [
  '技术转让',
  '技术许可',
  '作价投资',
  '技术开发',
  '技术咨询',
  '技术服务',
  '其他'
]

/**
 * 技术成熟度
 */
export const technologyMaturityOptions = [
  '实验室',
  '样机（样品）',
  '中试',
  '产业化',
  '完成小样测试',
  '已小批量生产',
  '已商品化应用',
  '其他'
]

// 活动类型
export const activityOptions = [
  '展会论坛',
  '互动沙龙',
  '项目路演',
  '培训讲座',
  '走访考察',
  '线上分享'
]

/**
 * 上传相关
 */
export const uploadUrl = `${process.env.VUE_APP_BASE_API}${process.env.VUE_APP_API_PREFIX}/upload`
export const uploadHeaders = {
  'X-Token': Local.get('X-Token'),
  'X-College-Domain': Local.get('X-College-Domain')
}
export const fileType = ['png', 'jpeg', 'jpg', 'zip', 'txt', 'doc', 'docx', 'xls', 'xlsx', 'ppt', 'pdf', 'mp4', 'mkv', 'm2v', 'mp3', 'wav', 'wmv']

// 图片资源上传
export const imgUploadOptions = {
  action: uploadUrl,
  headers: uploadHeaders,
  fileSize: 2,
  responseFn (response, file) {
    return response.url
  }
}

// 文件上传
export const fileUploadOptions = {
  action: uploadUrl,
  fileType: fileType,
  headers: uploadHeaders,
  multiple: true,
  responseFn (response, file) {
    return response.url
  }
}
/**
 * 状态
 */
export const stateMap = {
  [STATE.NEW]: {
    text: '新提交',
    type: 'info'
  },
  [STATE.ACCEPTED]: {
    text: '已通过',
    type: 'success'
  },
  [STATE.VERIFING]: {
    text: '审核中',
    type: 'warning'
  },
  [STATE.REJECTED]: {
    text: '已拒绝',
    type: 'danger'
  }
}

export const stateOptions = Object.entries(stateMap).map(([key, { text }]) => ({
  text,
  value: key
}))

export const dockingStateMap = {
  initial: {
    text: '新提交',
    type: ''
  },
  processing: {
    text: '对接中',
    type: 'warning'
  },
  contacting: {
    text: '联系中',
    type: 'warning'
  },
  closed: {
    text: '已关闭',
    type: 'info'
  },
  completed: {
    text: '对接成功',
    type: 'success'
  }
}

/**
 * [widgetType] [valueType] [example] [param:value]
 * input string
 * number string '1.11'
 * select string 'selection1'
 * multiselect Array ['selection1', 'selection2', 'selection3'] values
 * year string 2020
 * month string '2020-01'
 * date string '2020-01-01'
 * area string '湖南省/长沙市/芙蓉区'
 */
export const enterpriseLabelWidgetType = [
  {
    label: '文本框',
    value: 'input'
  },
  {
    label: '数字',
    value: 'number'
  },
  {
    label: '单选',
    value: 'select'
  },
  {
    label: '多选',
    value: 'multiselect'
  },
  {
    label: '年份',
    value: 'year'
  },
  {
    label: '月份',
    value: 'month'
  },
  {
    label: '日期',
    value: 'date'
  },
  {
    label: '地理位置',
    value: 'area'
  }
]

/**
 * 角色
 */

export const userRoleMap = {
  [ROLE.COLLEGE_ADMIN]: '综合管理员',
  [ROLE.TECHNOLOGY_BROKER]: '技术经纪人',
  [ROLE.EXPERT]: '专家用户',
  [ROLE.ENTERPRISE_PERSON]: '企业用户'
}

export const userRoleList = Object.entries(userRoleMap).map(([key, value]) => ({
  text: value,
  value: key
}))

export const expertAndEnterpriseUserRoleList = [
  {
    text: userRoleMap[ROLE.EXPERT],
    value: ROLE.EXPERT
  },
  {
    text: userRoleMap[ROLE.ENTERPRISE_PERSON],
    value: ROLE.ENTERPRISE_PERSON
  }
]

/**
 * 对接
 */
export const dockingTypeOptions = [
  '咨询成果',
  '咨询需求',
  '咨询专家'
  // '咨询技术服务'
]
/**
 * 服务
 */
export const serviceTypeOptions = [
  '金融服务',
  '咨询服务'
]
/**
 * 交易公示：公示类型
 */
export const publicityTypeOptions = [
  '协议定价',
  '挂牌交易',
  '拍卖',
  '其他'
]
/**
 * 项目备案：转化去向
 */
export const projectDirectionOptions = [
  '国有企业',
  '大型企业',
  '中小微企业',
  '其他企业'
]
/**
 * 项目备案：受财政资助类型
 */
export const projectFundingTypeOptions = [
]
/**
 * 项目备案：转化方式
 */
export const projectModeOptions = [
  '技术转让',
  '技术许可',
  '作价投资',
  '技术开发',
  '技术咨询',
  '技术服务',
  '其他'
]
/**
 * 项目备案：定价方式
 */
export const projectPricingModeOptions = [
  '协议定价',
  '挂牌交易',
  '拍卖',
  '其他'
]
/**
 * 项目审批：模板类别
 */
export const targetTypeOptions = [
  '成果模板',
  '需求模板',
  '专家模板',
  '项目模板',
  '项目支出模板',
  '项目预算模板',
  '招商信息模板',
  '知识库模板',
  '国家重点实验室模板',
  '课题组模板',
  '新闻模板'
]

/**
 * 新增需求：需求性质
 */
export const demandsTypeOptions = [
  '采购高技术产品',
  '开发新产品',
  '优化技术工艺',
  '技术咨询/调研',
  '其他需求'
]

/**
 * 新增需求：需求描述详细等级
 */
export const demandDescriptionType = [
  'I类明确',
  'II类有方向',
  'III类待明确'
]
/**
 * 科研成果
 */
export const expertAchievementMap = {
  [EXPERT_ACHIEVEMENT_TYPE.PATENT]: '发明专利',
  [EXPERT_ACHIEVEMENT_TYPE.PERIPAPER]: '期刊论文',
  [EXPERT_ACHIEVEMENT_TYPE.CONFPAPER]: '会议论文',
  [EXPERT_ACHIEVEMENT_TYPE.PROJECT]: '科研项目',
  [EXPERT_ACHIEVEMENT_TYPE.REPORT]: '科技报告'
}
export const expertAchievementOptions = [
  {
    text: expertAchievementMap[EXPERT_ACHIEVEMENT_TYPE.PATENT],
    value: EXPERT_ACHIEVEMENT_TYPE.PATENT
  },
  {
    text: expertAchievementMap[EXPERT_ACHIEVEMENT_TYPE.PERIPAPER],
    value: EXPERT_ACHIEVEMENT_TYPE.PERIPAPER
  },
  {
    text: expertAchievementMap[EXPERT_ACHIEVEMENT_TYPE.CONFPAPER],
    value: EXPERT_ACHIEVEMENT_TYPE.CONFPAPER
  },
  {
    text: expertAchievementMap[EXPERT_ACHIEVEMENT_TYPE.PROJECT],
    value: EXPERT_ACHIEVEMENT_TYPE.PROJECT
  },
  {
    text: expertAchievementMap[EXPERT_ACHIEVEMENT_TYPE.REPORT],
    value: EXPERT_ACHIEVEMENT_TYPE.REPORT
  }
]

