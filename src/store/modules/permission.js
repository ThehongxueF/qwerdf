import { asyncRoutes, constantRoutes } from '@/router'

/**
 * Use meta.role to determine if the current user has permission
 * @param roles
 * @param route
 */
function hasPermission (roles, route) {
  if (route.meta && route.meta.roles) {
    return roles.some(role => route.meta.roles.includes(role))
  } else {
    return true
  }
}

/**
 * Use route.name to determine if the current user has auth module
 * @param authModules
 * @param route
 */
function hasAuth (authModules, route) {
  if (route.name) {
    return authModules.some(module => module === route.name)
  } else {
    return true
  }
}

/**
 * Filter asynchronous routing tables
 * @param routes asyncRoutes
 * @param authModules
 */
export function filterAsyncRoutesByAuthModules (routes, modules) {
  const res = []

  routes.forEach(route => {
    const tmp = { ...route }
    if (hasAuth(modules, tmp)) {
      res.push(tmp)
    }
  })

  return res
}

/**
 * Filter asynchronous routing tables by recursion
 * @param routes asyncRoutes
 * @param roles
 */
export function filterAsyncRoutesByRoles (routes, roles, modules) {
  const res = []

  routes.forEach(route => {
    const tmp = { ...route }
    if (hasPermission(roles, tmp)) {
      if (tmp.children) {
        tmp.children = filterAsyncRoutesByRoles(tmp.children, roles, modules)
      }
      res.push(tmp)
    }
  })

  return res
}

const state = {
  routes: [],
  addRoutes: []
}

const mutations = {
  SET_ROUTES: (state, routes) => {
    state.addRoutes = routes
    state.routes = constantRoutes.concat(routes)
  }
}

const actions = {
  generateRoutes ({ commit }, { roles, authModules }) {
    return new Promise(resolve => {
      // 因数据大屏为单独路由，但模块管理不存在改路由选项；故在此做判断由Datav控制 Datav&DataScreens。
      if (authModules.includes('Datav')) {
        authModules.push('DatavScreens')
      } else if (authModules.includes('DatavScreens')) {
        authModules = authModules.filter(router => router !== 'DatavScreens')
      }
      const authedRoutes = filterAsyncRoutesByAuthModules(asyncRoutes, authModules)
      const accessedRoutes = filterAsyncRoutesByRoles(authedRoutes, roles)
      commit('SET_ROUTES', accessedRoutes)
      resolve(accessedRoutes)
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
