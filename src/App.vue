<template>
  <div id="app">
    <router-view />
    <!-- <ThemePicker class="hidden" /> -->
  </div>
</template>

<script>
import dayjs from 'dayjs'
// import ThemePicker from '@/components/ThemePicker'

const endTime = process.env.VUE_APP_UV_TIME || '23:00:00' // 需要在这个时间之前提交一次UV数据

export default {
  name: 'App',
  // components: { ThemePicker },
  data () {
    return {
      lastTime: `${dayjs().format('YYYY-MM-DD')} ${endTime}`
    }
  },
  async mounted () {
    const currentTime = dayjs().format('YYYY-MM-DD HH:mm:ss')

    this.$store.dispatch('action/setStartTime', currentTime) // 记录本次UV记录的开始时间
    // await this.$store.dispatch('action/pushBackupLogs') // 推送上一次未提交成功的备份数据

    if (dayjs(currentTime).isBefore(dayjs(this.lastTime))) {
      const delay = dayjs(this.lastTime).diff(dayjs(currentTime), 'millisecond')

      setTimeout(async () => { // 定点执行推送
        await this.pushAnalyticsData()
        this.$store.dispatch('action/setStartTime', dayjs().format('YYYY-MM-DD HH:mm:ss')) // 记录本次UV记录的开始时间
      }, delay)
    }

    window.addEventListener('beforeunload', this.pushAnalyticsData) // 监听页面卸载
    this.$once('hook:beforeDestroy', () => {
      window.removeEventListener('beforeunload', this.pushAnalyticsData)
    })
  },
  methods: {
    async pushAnalyticsData () {
      await this.$store.dispatch('action/pushLogs')
    }
  }
}
</script>

<style lang="scss" scoped>
.hidden {
  position: fixed;
  top: -100%;
  left: -100%;
}
</style>
