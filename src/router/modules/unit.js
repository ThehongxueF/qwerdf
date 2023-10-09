/**
 * 单位管理
 */
import Layout from '@/layout'

export default {
  path: '/units',
  component: Layout,
  name: 'Unit',
  meta: { title: '单位管理', icon: 'skill' },
  redirect: { name: 'Units' },
  children: [
    {
      path: '/units',
      name: 'Units',
      hidden: true,
      component: () => import('@/views/unit/index.vue'),
      meta: { title: '单位管理', noCache: false, breadcrumb: false }
    }
  ]
}
