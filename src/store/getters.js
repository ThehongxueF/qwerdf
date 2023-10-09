const getters = {
  sidebar: state => state.app.sidebar,
  size: state => state.app.size,
  device: state => state.app.device,
  theme: state => state.settings.theme,
  visitedViews: state => state.tagsView.visitedViews,
  cachedViews: state => state.tagsView.cachedViews,
  token: state => state.user.token,
  avatar: state => state.user.avatar || require('@/assets/common/default-avatar.png'),
  name: state => state.user.name,
  userInfo: state => state.user.userInfo,
  authModules: state => state.user.authModules,
  collegeInfo: state => state.user.collegeInfo,
  roles: state => state.user.roles,
  tags: state => state.data.tags,
  permission_routes: state => state.permission.routes,
  wsmessage: state => state.socket.message,
  errorLogs: state => state.errorLog.logs,
  userAgreement: state => state.agreement.agreement,
  privacyAgreement: state => state.agreement.privacy,
  dataPushAgreement: state => state.agreement.dataPush,
  userCounts: state => state.data.counts
}
export default getters
