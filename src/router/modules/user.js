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
      path: 'party-members',
      name: 'User.PartyMembers',
      component: () => import('@/views/user/party-member'),
      meta: { title: '党员管理', noCache: true }
    },
    {
      path: 'developing-partyMembers',
      name: 'User.DevelopingPartyMembers',
      component: () => import('@/views/user/developing-partyMembers'),
      meta: { title: '发展中党员管理', noCache: true }
    }
  ]
}
