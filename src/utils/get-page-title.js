// import Vue from 'vue'
import defaultSettings from '@/settings'
// import { COLLEGE_INFO } from '@/data/constant'

const title = defaultSettings.title || '党组织信息公示管理后台'

export default function getPageTitle (pageTitle) {
  // const collegeInfo = Vue.ls.get(COLLEGE_INFO)
  // const collegeName = collegeInfo && collegeInfo.name || ''
  const collegeName = '党组织信息公示管理后台'
  if (pageTitle) {
    return `${pageTitle} - ${collegeName} ${title}`
  }
  return `${collegeName}${title}`
}
