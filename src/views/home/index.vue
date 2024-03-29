<template>
  <div class="app-container home" />
</template>
<script>

import { getUserInfo } from '@/utils/auth'
const userInfo = getUserInfo()

export default {
  beforeRouteEnter (to, from, next) {
    // 在该处判断是跳往数据看板页还是个人信息页
    if (userInfo.role === '超管') {
      next('/databoard')
    } else {
      next('/admin-users')
    }
  }
}
</script>
