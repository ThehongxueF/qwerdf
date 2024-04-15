<template>
  <div class="app-container">
    <el-row :gutter="10">
      <el-col :lg="{ span: 24 }" :xl="{ span: 12 }" class="mb10">
        <el-card class="base-info" shadow="hover">
          <div class="header" style="position:relative">
            <!-- <img class="member-logo" src="@/assets/common/unit-logo.png" alt=""> -->
            <span class="actions-wrapper" style="float: right;">
              <el-link
                :underline="false"
                type="danger"
                icon="el-icon-delete"
                class="mr10"
              >
                删除
              </el-link>
              <el-link
                :underline="false"
                icon="el-icon-edit"
                @click="drawerFormVisible = true"
              >
                编辑
              </el-link>
            </span>
          </div>
          <h3>基本信息</h3>
          <el-descriptions
            :column="1"
            :label-style="labelStyle"
            :content-style="contentStyle"
          >
            <el-descriptions-item label="管理员名称"> {{ adminUser.name }} </el-descriptions-item>
            <el-descriptions-item label="联系方式"> {{ adminUser.mobile }} </el-descriptions-item>
            <el-descriptions-item label="邮箱"> {{ adminUser.email }} </el-descriptions-item>
            <el-descriptions-item label="管理类型"> {{ adminUser.role }} </el-descriptions-item>
            <el-descriptions-item label="管理对象"> {{ adminUser.target && adminUser.target.name }} </el-descriptions-item>

          </el-descriptions>
        </el-card>
      </el-col>
    </el-row>
    <ele-form-drawer
      v-model="formData"
      :span="24"
      :drawer-attrs="drawerAttrs"
      :form-desc="updateMemberFormDesc"
      :visible.sync="drawerFormVisible"
      title="编辑管理员"
      size="800px"
      :request-fn="handleUpdate"
    />
  </div>
</template>
<script>
import { cloneDeep } from 'lodash'
import _ from 'lodash'
import { updateMemberFormDesc } from '../config'
import { updateMixin, detailMixin } from '@/mixins'
import { AdminUsers } from '@/api'
export default {
  mixins: [updateMixin, detailMixin],
  data () {
    return {
      updateMemberFormDesc,
      drawerFormVisible: false,
      adminUser: {}
    }
  },
  computed: {
    hasAttachments () {
      return this.adminUser.attachments && (this.adminUser.attachments.length > 0)
    }
  },
  watch: {
    adminUser: {
      deep: true,
      handler (data) {
        this.formData = cloneDeep(data)
        this.targetId = this.adminUser.target && this.adminUser.target.id
        if (this.adminUser.role === '机构') {
          this.formData.organizationId = this.adminUser.target && this.adminUser.target.id
        } else {
          this.formData.branchId = this.adminUser.target && this.adminUser.target.id
        }
      }
    }
  },
  async created () {
    await this.getDetail()
  },
  methods: {
    async getDetail () {
      try {
        const { adminUser } = await AdminUsers.getAdminUser(this.id)
        this.adminUser = adminUser
      } catch ({ message = '获取管理员详情出错' }) {
        this.$message.error(message)
      }
    },
    async handleUpdate () {
      this.formData.targetId = this.formData.organizationId || this.formData.branchId
      this.formData.targetType = this.formData.role === '机构' ? 'Organization' : 'Department'
      delete this.formData.branchId
      delete this.formData.organizationId
      console.log('this.formData', this.formData)
      const params = {
        adminUser: this.formData
      }
      try {
        await AdminUsers.saveAdminUsers(_.pickBy(params, (value) => value))
        this.getDetail()
      } catch ({ message = '更新管理员出错' }) {
        this.$message.error(message)
        this.listLoading = false
      } finally {
        this.drawerFormVisible = false
      }
    },
    onDownload () {

    }
  }
}
</script>

<style lang="scss" scoped>
.member-logo {
  position: absolute;
  width: 220px;
  right: 100px;
  top: 50px;
}
.base-info {
  border: 1px solid #FFD4A3;
  border-radius: 4px;
  .outdate-time {
     border-top: 1px solid #FFD4A3;
     padding-top: 10px;
     font-size: 14px;
    color: rgb(102, 102, 102);
    font-weight: normal;
    span {
      font-size: 24px;
      color: #0DBCB6
    }
  }
}
.label-icon {
  position: absolute;
  left: -40px;
  width: 30px;
  height: 30px;
}
.label {
  text-align: center;
  padding: 8px;
  color: #7D8DB5;
  font-weight: bold;
}
.count {
  color: #303E65;
  font-weight: bold;
}
.branch-card {
  width: 126px;
  height: 126px;
  color: #75899F;
  margin: 5px;
}
</style>

