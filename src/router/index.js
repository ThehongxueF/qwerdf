import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/layout'

Vue.use(Router)

/* Router Modules */
import databoardRoutes from './modules/data-board'
import adminUsersRoutes from './modules/admin-users'
import unitRoutes from './modules/unit'
import branchRoutes from './modules/branch'
import userRoutes from './modules/user'
import contentRoutes from './modules/content'
// import achievementRoutes from './modules/achievement'

/**
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    noCache: true                if set true, the page will no be cached(default is false)
    affix: true                  if set true, the tag will affix in the tags-view
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path(.*)',
        component: () => import('@/views/redirect/index')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/login/new-index'),
    hidden: true
  },
  // {
  //   path: '/agreement',
  //   name: 'agreement',
  //   component: () => import('@/views/agreement/index.vue'),
  //   meta: {
  //     title: '用户协议'
  //   },
  //   hidden: true
  // },
  // {
  //   path: '/privacy',
  //   name: 'privacy',
  //   component: () => import('@/views/privacy/index.vue'),
  //   meta: {
  //     title: '隐私政策'
  //   },
  //   hidden: true
  // },
  {
    path: '/promotional',
    name: 'promotional',
    component: () => import('@/views/promotional/index.vue'),
    meta: {
      title: '推广协议'
    },
    hidden: true
  },
  {
    path: '/auth-redirect',
    component: () => import('@/views/login/auth-redirect'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/error-page/404'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/error-page/401'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    hidden: true,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/home/index'),
        name: 'Home',
        meta: { title: '工作台', icon: 'dashboard', hidden: true, affix: true }
      },
      {
        path: 'personal',
        component: () => import('@/views/personal/index'),
        name: 'Personal',
        hidden: true,
        meta: { title: '个人信息', hidden: true }
      }
    ]
  }
]

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */
export const asyncRoutes = [
  databoardRoutes,
  adminUsersRoutes,
  unitRoutes,
  branchRoutes,
  userRoutes,
  contentRoutes,
  // systemRoutes,
  // achievementRoutes,
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  mode: 'history', // require service support
  base: process.env.VUE_APP_PUBLISH_PATH,
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

export function resetRouter () {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
