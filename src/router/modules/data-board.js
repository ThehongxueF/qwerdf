/**
 * 数据看板
 */
import Layout from '@/layout'

export default {
  path: '/',
  component: Layout,
  name: 'Databoard',
  meta: { title: '数据看板', icon: 'dashboard' },
  redirect: { name: 'Databoard' },
  children: [
    {
      path: '/databoard',
      name: 'Databoard',
      component: () => import('@/views/databoard/index'),
      meta: { title: '数据看板', breadcrumb: false, hidden: true, affix: true }
    }
  ]
}
