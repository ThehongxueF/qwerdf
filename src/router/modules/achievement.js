/**
 * 成果管理
 */
import Layout from '@/layout'

export default {
  path: '/achievements',
  component: Layout,
  name: 'Achievement',
  meta: { title: '成果管理', icon: 'skill' },
  redirect: { name: 'Achievements' },
  children: [
    {
      path: '/achievements',
      name: 'Achievements',
      hidden: true,
      component: () => import('@/views/achievements/index'),
      meta: { title: '成果列表', noCache: false, breadcrumb: false }
    },
    {
      path: 'add',
      name: 'Achievements.Add',
      hidden: true,
      meta: { title: '新增成果' },
      component: () => import('@/views/achievements/add/index')
    },
    {
      path: ':id',
      name: 'Achievements.Detail',
      hidden: true,
      meta: { title: '成果详情' },
      props: true,
      component: () => import('@/views/achievements/detail/index')
    }
  ]
}
