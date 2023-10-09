<template>
  <div class="app-container home" />
</template>
<script>
import router from '@/router'
export default {
  beforeRouteEnter (to, from, next) {
    // 在该处判断是跳往数据看板页还是个人信息页
    const a = 1
    if (a === 1) {
      next('/databoard')
    } else {
      router.push({ name: 'Personal' })
    }
  }
}
</script>
