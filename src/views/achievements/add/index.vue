<template>
  <div class="app-container">
    <el-card shadow="hover">
      <el-steps :active="active" finish-status="success" simple>
        <el-step title="填写成果信息" />
        <el-step title="填写联系信息" />
        <el-step title="提交成功等待审核" />
      </el-steps>
      <el-skeleton :loading="reloading" :rows="6" animated class="mt20">
        <div v-if="!reloading" class="form-content mt20">
          <AchievementInfo v-show="active === 0" submit-btn-text="下一步" @on-submit="onAchievementSubmit" />
          <UserInfo v-show="active === 1" submit-btn-text="提交审核" @prev="active = 0" @on-submit="onUserSubmit" />
          <ResultInfo v-show="active === 2" :active="active" icon="success" title="提交成功" sub-title="待管理员审核" />
        </div>
      </el-skeleton>
    </el-card>
  </div>
</template>

<script>
import { cloneDeep } from 'lodash'
import { Achievement } from '@/api'
import AchievementInfo from '../components/achievementInfo.vue'
import UserInfo from '../components/userInfo.vue'
import ResultInfo from '../components/resultInfo.vue'
import { Session } from '@/utils/storage'
export default {
  name: 'AchievementAdd',
  provide () {
    return {
      handleRecreate: this.changeRecreateVal
    }
  },
  components: {
    AchievementInfo,
    UserInfo,
    ResultInfo
  },
  data () {
    return {
      reloading: false,
      recreate: false,
      active: 0,
      achievement: {}
    }
  },
  methods: {
    changeRecreateVal (val = false) {
      this.recreate = val
    },
    reset () {
      this.active = 0
      this.expert = {}
      this.recreate = false
      this.reloading = false
    },
    async onAchievementSubmit (data, cb) {
      try {
        if (data.attachmentIds && data.attachmentIds.length) {
          data.attachmentIds = data.attachmentIds.map(item => item.id ? item.id : item) // HACK
        }
        this.achievement = cloneDeep(data)
        this.active += 1
      } finally {
        cb()
      }
    },
    async onUserSubmit (data, cb) {
      const achievementData = { ...this.achievement, ...data }
      try {
        const achievement = await Achievement.saveAchievement(achievementData)
        if (this.recreate) { // 提交并继续新增
          this.reloading = true
          this.$nextTick(() => {
            this.reset()
            Session.remove('ACHIEVEMENT')
          })
        } else {
          if (achievement) this.active += 1
        }
      } finally {
        cb()
      }
    }
  }
}

</script>

<style lang="scss" scoped>
  .form-content {
    ::v-deep {
      .form-footer {
        text-align: center;
        margin: 40px 0 20px;
      }
    }
  }
</style>
