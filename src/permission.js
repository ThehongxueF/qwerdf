import Vue from 'vue'
import router from './router'
import store from './store'
import { Message } from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import { getToken } from '@/utils/auth' // get token from cookie
import getPageTitle from '@/utils/get-page-title'
import { PrevLoading } from '@/utils/loading'
// import { COLLEGE_INFO, COLLEGE_DOMAIN_KEY } from '@/data/constant'
// import getDomain from '@/utils/get-domain'
import { WSConnect } from '@/utils/socket'
// import { Local } from '@/utils/storage'

NProgress.configure({ showSpinner: false }) // NProgress Configuration

const whiteList = ['/login', '/auth-redirect', '/password_reset', '/agreement', '/privacy', '/promotional'] // no redirect whitelist

// 加载 loading
PrevLoading.start()

router.beforeEach(async (to, from, next) => {
  // start progress bar
  NProgress.start()
  // set page title
  document.title = getPageTitle(to.meta.title)

  // 系统设置
  // const setting = await store.dispatch('user/getSystemSetting')
  // await store.dispatch('user/setCollegeSetting', setting)

  // determine whether the user has logged in
  const token = getToken()

  if (token) {
    if (to.path === '/login') {
      // if is logged in, redirect to the home page
      next({ path: '/' })
      NProgress.done()
    } else {
      // determine whether the user has obtained his permission roles through getInfo
      const hasRoles = store.getters.roles && store.getters.roles.length > 0
      if (hasRoles) {
        await store.dispatch('data/initialData')
        next()
      } else {
        try {
          // get user info
          // note: roles must be a object array! such as: ['admin'] or ,['developer','editor']
          const user = await store.dispatch('user/getInfo')
          const roles = user.roles
          await store.dispatch('data/initialData')
          // get auth modules
          const authModules = await store.dispatch('user/getAdministratorInfo', user)
          // 根据用户角色和授权模块生成路由配置
          const accessRoutes = await store.dispatch('permission/generateRoutes', { roles, authModules })
          // dynamically add accessible routes
          router.addRoutes(accessRoutes)

          // socket
          if (store.state.socket.isConnected === false) {
            WSConnect()
          }
          // hack method to ensure that addRoutes is complete
          // set the replace: true, so the navigation will not leave a history record
          next({ ...to, replace: true })
        } catch ({ message = '用户角色错误' }) {
          // remove token and go to login page to re-login
          await store.dispatch('user/resetToken')
          Message.error(message || 'Has Error')
          next(`/login?redirect=${to.path}`)
          NProgress.done()
        }
      }
    }
  } else {
    /* has no token*/

    if (whiteList.indexOf(to.path) !== -1) {
      // in the free login whitelist, go directly
      next()
    } else {
      // other pages that do not have permission to access are redirected to the login page.
      next(`/login?redirect=${to.path}`)
      NProgress.done()
    }
  }
})

router.afterEach((to) => {
  // UV
  store.dispatch('action/addLog', {
    path: to.path
  })
  // finish loading
  PrevLoading.done()
  // finish progress bar
  NProgress.done()
})
