<!--
* 表格渲染组件。
*
*
* @emit
* send 发送验证码 需回调start() finish()
-->
<template>
  <el-button
    :disabled="state.start"
    :class="state.start ? 'captcha-time' : 'captcha-button'"
    @click="sendSmsCode"
  >
    {{ (!state.start && '获取验证码') || state.time + '秒后重新获取' }}
  </el-button>
</template>
<script>
export default {
  name: 'SmsButton',
  data () {
    return {
      state: {
        time: 60,
        start: false
      }
    }
  },
  methods: {
    sendSmsCode () {
      const { state } = this
      const interval = window.setInterval(() => {
        if (state.time-- <= 0) {
          state.time = 60
          state.start = false
          window.clearInterval(interval)
        }
      }, 1000)
      this.$emit(
        'send',
        (start) => {
          state.start = true
        },
        (finish) => {
          clearInterval(interval)
          state.time = 60
          state.start = false
        }
      )
    }
  }
}
</script>
<style lang="scss" scoped>
.captcha {
  &-button {
  }

  &-time {
    text-decoration: none;
  }
}
</style>
