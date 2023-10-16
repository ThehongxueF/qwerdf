/**
 * 用户管理
 */
import Layout from '@/layout'

export default {
  path: '/users',
  component: Layout,
  name: 'User',
  meta: { title: '用户管理', icon: 'branch', noCache: false },
  redirect: { name: 'Users' },
  children: [
    {
      path: 'party-members',
      name: 'User.PartyMembers',
      component: () => import('@/views/user/party-member'),
      meta: { title: '党员管理', noCache: true }
    },
    {
      path: 'party-members/:id',
      name: 'PartyMembers.Detail',
      hidden: true,
      component: () => import('@/views/user/party-member/detail'),
      meta: { title: '党员详情', noCache: true }
    },
    {
      path: 'developing-partyMembers',
      name: 'User.DevelopingPartyMembers',
      component: () => import('@/views/user/developing-partyMembers'),
      meta: { title: '发展中党员管理', noCache: true }
    },
    {
      path: 'developing-partyMembers/:id',
      name: 'DevelopingPartyMembers.Detail',
      hidden: true,
      component: () => import('@/views/user/developing-partyMembers/detail'),
      meta: { title: '发展中党员详情', noCache: true }
    }
  ]
}
