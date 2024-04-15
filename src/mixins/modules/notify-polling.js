import { mapGetters } from 'vuex'
import { Notification } from '@/api'
import { formatDate } from '@/utils/formatTime.js'
import {
  SOCKET_ONMESSAGE
} from '@/store/mutation-types'

export default {
  data () {
    return {
      timer: null,
      dateFrom: formatDate(new Date(), 'YYYY-mm-dd HH:MM:SS')
    }
  },
  computed: {
    ...mapGetters(['userInfo', 'authModules']),
    showNotifications () {
      return this.authModules.includes('Notification')
    },
    runPolling () {
      return process.env.VUE_APP_USE_WS === 'false'
    }
  },
  beforeDestroy () {
    if (this.timer) {
      clearInterval(this.timer)
    }
  },
  watch: {
    runPolling: {
      immediate: true,
      handler (state) {
        if (state) {
          this.timer = setInterval(() => {
            this.getNotifies()
          }, process.env.VUE_APP_POLLING_TIME)
        } else {
          clearInterval(this.timer)
        }
      }
    }
  },
  methods: {
    async getNotifies () {
      if (this.showNotifications) {
        try {
          const params = {
            pageNo: 1,
            pageSize: 1000,
            dateFrom: this.dateFrom,
            dateTo: formatDate(new Date(), 'YYYY-mm-dd HH:MM:SS')
          }
          this.dateFrom = params.dateTo
          const { notifications } = await Notification.getNotifications(params)
          notifications.length > 0 & notifications.map(item => {
            this.$store.commit(SOCKET_ONMESSAGE, ({
              data: {
                event: 'notification',
                eventBody: item
              }
            }))
          })
        } catch (err) {
          console.error(err)
        }
      }
    }
  }
}
