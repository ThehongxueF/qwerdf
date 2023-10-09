/**
 * 用户管理
 */
import Layout from '@/layout'

export default {
  path: '/users',
  component: Layout,
  name: 'User',
  meta: { title: '用户管理', icon: 'users', noCache: false },
  redirect: { name: 'Users' },
  children: [
    {
      path: '/users',
      name: 'Users',
      hidden: true,
      component: () => import('@/views/users/index'),
      meta: { title: '用户列表', icon: 'users', noCache: false, breadcrumb: false }
    },
    {
      path: 'add',
      name: 'Users.Add',
      hidden: true,
      meta: { title: '新增用户' },
      props: true,
      component: () => import('@/views/users/add/index')
    },
    {
      path: ':id',
      name: 'Users.Detail',
      hidden: true,
      meta: { title: '用户详情' },
      props: true,
      component: () => import('@/views/users/detail/index')
    }
  ]
}
