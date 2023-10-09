// import Vue from 'vue'
import defaultSettings from '@/settings'
// import { COLLEGE_INFO } from '@/data/constant'

const title = defaultSettings.title || '技术转移综合管理系统'

export default function getPageTitle (pageTitle) {
  // const collegeInfo = Vue.ls.get(COLLEGE_INFO)
  // const collegeName = collegeInfo && collegeInfo.name || ''
  const collegeName = '中国工程院院士专家成果转化中心运营平台'
  if (pageTitle) {
    return `${pageTitle} - ${collegeName} ${title}`
  }
  return `${collegeName}${title}`
}
