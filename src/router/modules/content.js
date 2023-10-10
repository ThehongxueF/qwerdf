/**
 * 内容管理
 */
import Layout from '@/layout'

export default {
  path: '/contents',
  component: Layout,
  name: 'Content',
  meta: { title: '内容管理', icon: 'branch', noCache: false },
  redirect: { name: 'Contents' },
  children: [
    {
      path: 'three-lessons',
      name: 'Content.ThreeLessons',
      component: () => import('@/views/content/three-lessons/index'),
      meta: { title: '三会一课', noCache: true }
    },
    {
      path: 'theme-party',
      name: 'Content.ThemeParty',
      component: () => import('@/views/content/theme-party/index'),
      meta: { title: '主题党日', noCache: true }
    },
    {
      path: 'publicity',
      name: 'Content.Publicity',
      component: () => import('@/views/content/publicity/index'),
      meta: { title: '公示公开', noCache: true }
    },
    {
      path: 'add-module',
      name: 'Content.AddModule',
      component: () => import('@/views/content/add-module/index'),
      meta: { title: '添加模块', noCache: true }
    }
  ]
}
