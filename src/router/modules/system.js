/**
 * 系统管理
 */
import Layout from '@/layout'

export default {
  path: '/system',
  component: Layout,
  name: 'System',
  meta: { title: '系统管理', icon: 'component', noCache: false },
  redirect: 'noRedirect',
  children: [
    {
      path: 'settings',
      name: 'System.settings',
      component: () => import('@/views/system/index'),
      meta: { title: '系统设置', noCache: true }
    }
    // {
    //   path: 'tags',
    //   name: 'System.tags',
    //   component: () => import('@/views/tags/index'),
    //   meta: { title: '标签库管理', noCache: true }
    // },
    // {
    //   path: 'third-party/:id',
    //   name: 'System.thirdParty.detail',
    //   hidden: true,
    //   props: true,
    //   component: () => import('@/views/system/third-party/detail'),
    //   meta: { title: '开通模块', noCache: true }
    // },
    // {
    //   path: 'administrators',
    //   name: 'SystemAdministrators',
    //   component: () => import('@/views/users/list/admin.vue'),
    //   meta: { title: '管理员管理', noCache: false, breadcrumb: false }
    // },
    // {
    //   path: 'administrators/add',
    //   name: 'Administrators.Add',
    //   hidden: true,
    //   meta: { title: '新增管理员', noCache: true },
    //   props: true,
    //   component: () => import('@/views/users/add/admin.vue')
    // },
    // {
    //   path: 'administrators/:id',
    //   name: 'Administrators.Detail',
    //   hidden: true,
    //   meta: { title: '管理员详情', noCache: true },
    //   props: true,
    //   component: () => import('@/views/users/detail/admin.vue')
    // },
    // {
    //   path: 'organization',
    //   name: 'System.OrganizationUnits',
    //   component: () => import('@/views/organization-units/index'),
    //   meta: { title: '组织机构', breadcrumb: false }
    // },
    // {
    //   path: 'templates',
    //   name: 'SystemTemplates',
    //   component: () => import('@/views/templates/index'),
    //   meta: { title: '审批流管理', noCache: false, breadcrumb: false }
    // },
    // {
    //   path: 'templates/:id',
    //   name: 'Templates.Detail',
    //   hidden: true,
    //   meta: { title: '审批流详情' },
    //   props: true,
    //   component: () => import('@/views/templates/detail/index')
    // }
  ]
}

