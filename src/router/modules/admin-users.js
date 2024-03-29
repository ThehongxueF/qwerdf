/**
 * 管理员管理
 */
import Layout from '@/layout'
export default {
  path: '/admin-users',
  component: Layout,
  name: 'Admin',
  meta: { title: '管理员管理', icon: 'branch' },
  redirect: { name: 'AdminUsers' },
  children: [
    {
      path: '/admin-users',
      name: 'AdminUsers',
      hidden: true,
      component: () => import('@/views/admin-users/index.vue'),
      meta: { title: '管理员管理', noCache: true, breadcrumb: false }
    },
    {
      path: ':id',
      name: 'AdminUsers.Detail',
      hidden: true,
      meta: { title: '管理员详情' },
      props: true,
      component: () => import('@/views/admin-users/detail/index')
    }
  ]
}
