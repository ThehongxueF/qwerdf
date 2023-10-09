const TOKEN_KEY = 'X-Token'
const COLLEGE_ID_KEY = 'X-College-Id'
const COLLEGE_DOMAIN_KEY = 'X-College-Domain'
const COLLEGE_INFO = 'collge_info'
const COLLEGE_SETTING = 'college_setting'
const ADMIN_ROLE = 'college_admin'

const STATE = {
  NEW: 'new',
  ACCEPTED: 'accepted',
  VERIFING: 'verifing',
  REJECTED: 'rejected'
}

const ROLE = {
  COLLEGE_ADMIN: 'college_admin',
  TECHNOLOGY_BROKER: 'technology_broker',
  EXPERT: 'expert',
  ENTERPRISE_PERSON: 'enterprise_person'
}

const TARGET_TYPE = {
  DEMAND: 'demand',
  ACHIEVEMENT: 'achievement',
  EXPERT: 'expert',
  SERVICE: 'service',
  PROJECT: 'project',
  PROJECTCONTRACT: 'projectContract',
  BUSINESS: 'business',
  ACTIVITY: 'activity',
  NEWS: 'news',
  WIKI: 'wiki',
  PROJECTBUDGET: 'projectBudget',
  PROJECTEXPENDITURE: 'projectExpenditure',
  SUBJECTTEAM: 'subjectTeam',
  LABORATORY: 'laboratory'
}

const EXPERT_PAPER_TYPE = {
  CONF: 'conference', // 会议论文
  PERI: 'periodical' // 期刊论文
}

const EXPERT_ACHIEVEMENT_TYPE = {
  PATENT: 'patent',
  PERIPAPER: 'periodicalPaper',
  CONFPAPER: 'conferencePaper',
  PROJECT: 'researchProject',
  REPORT: 'technologyReport'
}

export {
  TOKEN_KEY,
  COLLEGE_ID_KEY,
  COLLEGE_DOMAIN_KEY,
  COLLEGE_INFO,
  COLLEGE_SETTING,
  ADMIN_ROLE,
  ROLE,
  STATE,
  TARGET_TYPE,
  EXPERT_PAPER_TYPE,
  EXPERT_ACHIEVEMENT_TYPE
}
