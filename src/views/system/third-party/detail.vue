<template>
  <div class="app-container">
    <el-card v-loading="pageLoading" shadow="hover">
      <h3>
        <span>{{ plugin.name }}</span>

        <el-button
          v-if="!plugin.collegePlugin"
          :loading="loading"
          type="primary"
          class="fr"
          @click="onOpen"
        >
          开通模块
        </el-button>
        <el-button
          v-else
          :loading="loading"
          :type="plugin.collegePlugin.openState ? 'info' : 'primary'"
          class="fr"
          @click="onChange"
        >
          {{ plugin.collegePlugin.openState ? '取消开通' : '开通模块' }}
        </el-button>
      </h3>

      <p>{{ plugin.introduction }}</p>
    </el-card>
    <template v-if="plugin.operationType === 'achievement' || plugin.operationType === 'demand'">
      <el-card v-if="plugin.collegePlugin&&plugin.collegePlugin.collegeBrokerId || plugin.collegePlugin&&plugin.collegePlugin.openState" shadow="hover">
        <div class="header">
          <h4>联系方式</h4>
          <p>此后的{{ plugin.operationType === 'achievement' ? '成果' : '需求' }}数据将推送至以下人员</p>
          <el-link
            :underline="false"
            icon="el-icon-edit"
            @click="dialogVisible = true"
          >
            编辑
          </el-link>
        </div>
        <div class="content">
          <p>创建人: {{ plugin.collegePlugin && plugin.collegePlugin.publisher && plugin.collegePlugin.publisher.name }}</p>
          <p>技术经纪人: {{ plugin.collegePlugin && plugin.collegePlugin.collegeBroker && plugin.collegePlugin.collegeBroker.name }}</p>
          <p>联系人: {{ plugin.collegePlugin && plugin.collegePlugin.contactor && plugin.collegePlugin.contactor.name }}</p>
        </div>
      </el-card>
    </template>
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="50%"
      :before-close="handleClose"
    >
      <user-info :user-info="plugin.collegePlugin" :type="plugin.operationType" @cancel="dialogVisible = false" @on-submit="saveTargetUser" />
    </el-dialog>

  </div>
</template>

<script>
import { Plugin } from '@/api'
import UserInfo from '../components/userInfo.vue'

export default {
  name: 'ThirdPartyDetail',
  components: {
    UserInfo
  },
  props: {
    id: {
      type: [String, Number],
      required: true
    }
  },
  data () {
    return {
      pageLoading: true,
      plugin: {},
      loading: false,
      dialogVisible: false
    }
  },
  created () {
    this.getDetail()
  },
  methods: {
    async saveTargetUser (data, cb) {
      try {
        await Plugin.changeTargetUser(this.id, data)
        this.$message.success('操作成功')
        this.getDetail()
      } catch (err) {
        if (err && err.code) {
          this.$message.error('操作失败')
        }
      } finally {
        this.dialogVisible = false
        cb()
      }
    },
    handleClose () {
      this.$confirm('注意：放弃编辑，将不会保存此次修改内容！')
        .then(_ => {
          this.dialogVisible = false
        })
        .catch(_ => {})
    },
    async getDetail () {
      this.pageLoading = true
      try {
        const plugin = await Plugin.getPlugin(this.id)
        this.plugin = plugin
      } finally {
        this.pageLoading = false
      }
    },
    async onOpen () {
      this.loading = true
      try {
        await Plugin.changeState(this.id, true)
        this.$message.success('操作成功')
      } finally {
        this.loading = false
        this.getDetail()
      }
    },
    async onChange () {
      this.loading = true
      try {
        const state = this.plugin.collegePlugin.openState
        await Plugin.changeState(this.id, !state)
        this.$message.success('操作成功')
      } finally {
        this.loading = false
        this.getDetail()
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.drawer-content {
  position: relative;
  padding: 32px 32px 100px;
  height: 100%;

  .actions {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    width: 100%;
    padding: 20px;
    box-shadow: 2px 2px 3px 0 rgba(0, 0, 0, .3);
    border-top: 1px solid #dfe6ec;
  }
}
.header{
  display: flex;
  align-items: center;
  justify-content: space-between;
  > h4 {
    width: 100px;
  }
  > p {
    width: 250px;
    text-align: left;
  }
  > a {
    flex: 1;
  }
}
</style>
