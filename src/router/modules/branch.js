/**
 * 支部管理
 */
import Layout from '@/layout'

export default {
  path: '/branchs',
  component: Layout,
  name: 'Branch',
  meta: { title: '支部管理', icon: 'branch' },
  redirect: { name: 'Branchs' },
  children: [
    {
      path: '/branchs',
      name: 'Branchs',
      hidden: true,
      component: () => import('@/views/branch/index.vue'),
      meta: { title: '支部管理', noCache: false, breadcrumb: false }
    }
  ]
}
