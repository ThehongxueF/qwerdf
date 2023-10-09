<template>
  <div class="app-container">
    <el-row :gutter="10">
      <el-col :span="12" :offset="0">
        <el-card shadow="hover" class="mb10">
          <h3>个人信息</h3>
          <el-skeleton :loading="loading" :rows="12" animated>
            <ele-form
              ref="form"
              v-model="user"
              label-position="left"
              :span="24"
              :is-loading="formLoading"
              :form-desc="formDesc"
              @request="handleSubmit"
            />
          </el-skeleton>
        </el-card>
      </el-col>
      <el-col :span="12" :offset="0">
        <el-card shadow="hover" :body-style="{ padding: '32px 20px' }">
          <div class="personal-info-item">
            <div class="item-content">
              <div class="title mb10">
                密码
              </div>
              <div class="content">
                <strong>******</strong>
              </div>
            </div>
            <div class="item-action">
              <el-link type="primary" @click="changePasswordVisible = true">
                <i class="el-icon-edit" />
                修改密码
              </el-link>
            </div>
          </div>
          <el-divider />
        </el-card>
        <el-card shadow="hover" :body-style="{ padding: '32px 20px' }">
          <div class="personal-info-item">
            <div class="item-content">
              <div class="title mb10">
                手机号
              </div>
              <div class="content">
                {{ user.mobile }}
              </div>
            </div>
            <div class="item-action">
              <el-link type="primary" @click="changeMobileVisible = true">
                <i class="el-icon-edit" />
                修改手机号
              </el-link>
            </div>
          </div>
          <el-divider />
        </el-card>
      </el-col>
    </el-row>

    <change-password
      v-model="changePasswordVisible"
      width="500px"
      @submit="changePassword"
    />
    <change-mobile
      v-model="changeMobileVisible"
      :mobile="user.mobile"
      width="500px"
      @validate="validateMobile"
      @submit="changeMobile"
    />
  </div>
</template>

<script>
import ChangePassword from '@/components/common/ChangePassword.vue'
import ChangeMobile from '@/components/common/ChangeMobile.vue'
import { User } from '@/api'
import { formDesc } from './config'

export default {
  name: 'Personal',
  components: { ChangePassword, ChangeMobile },
  data () {
    return {
      loading: true,
      formLoading: false,
      formDesc,
      user: {},
      changePasswordVisible: false,
      changeMobileVisible: false
    }
  },
  mounted () {
    this.fetchDetail()
  },
  methods: {
    async fetchDetail () {
      try {
        this.loading = true
        this.user = await User.getCurrentUser()
        if (this.user.organizationUnits) {
          this.user.organizationUnitIds = this.user.organizationUnits.map(item => `${item.id}`)
        }
      } finally {
        this.loading = false
      }
    },
    async handleSubmit (data) {
      try {
        this.formLoading = true
        await User.updateCurrentUser(data)
        this.$message.success('更新成功')
        this.fetchDetail()
      } finally {
        this.formLoading = false
      }
    },
    async changePassword (data, cb) {
      try {
        await User.changePassword(data)
        this.changePasswordVisible = false
        this.$message.success('修改成功，下次登录生效')
      } finally {
        cb()
      }
    },
    async validateMobile (data, cb) {
      try {
        await User.confirmOldMobile(data)
        this.$message.success('验证旧手机号码成功')
        cb()
      } catch (err) {
        cb(err)
      }
    },
    async changeMobile (data, cb) {
      try {
        await User.updateMobile(data)
        this.changeMobileVisible = false
        this.$message.success('修改手机号码成功')
        this.fetchDetail()
        cb()
      } catch (err) {
        cb(err)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.personal-info-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  .item-content {
    .title {
      font-weight: 500;
      font-size: 16px;
      color: $text-heavy;
    }
    .content {
      color: $text-light;
    }
  }
  .item-action {

  }
}
</style>
