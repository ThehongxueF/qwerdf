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
            <el-descriptions-item label="党员名称"> {{ user.name }} </el-descriptions-item>
            <el-descriptions-item label="性别"> {{ user.gender }} </el-descriptions-item>
            <el-descriptions-item label="职位"> {{ user.post }} </el-descriptions-item>
            <!-- <el-descriptions-item label="年龄"> {{ user.age }} </el-descriptions-item> -->
            <el-descriptions-item label="联系方式"> {{ user.mobile }} </el-descriptions-item>
            <el-descriptions-item label="政治生日"> {{ user.birthday }} </el-descriptions-item>
            <!-- <el-descriptions-item label="党龄"> {{ user.standing }} </el-descriptions-item> -->
            <el-descriptions-item label="所属支部"> {{ user.department && user.department.name }} </el-descriptions-item>
            <el-descriptions-item label="自定义标语"> {{ '阿斯达克萨拉丁记录卡撒旦尽量躲开撒娇了' }} </el-descriptions-item>
            <el-descriptions-item label="附件">
              <el-link
                v-if="hasAttachments"
                icon="el-icon-download"
                type="info"
                @click="onDownload"
              >
                下载文件
              </el-link>
              <i v-else>暂无</i>
            </el-descriptions-item>
          </el-descriptions>
          <el-divider content-position="left">
            工作经验
          </el-divider>
          <el-card shadow="never">
            <froala-view v-model="user.experience" />
          </el-card>
        </el-card>
      </el-col>
    </el-row>
    <ele-form-drawer
      v-model="formData"
      :span="24"
      :drawer-attrs="drawerAttrs"
      :form-desc="memberFormDesc"
      :visible.sync="drawerFormVisible"
      title="编辑单位"
      size="800px"
      :request-fn="handleUpdate"
    />
  </div>
</template>
<script>
import { cloneDeep } from 'lodash'
import _ from 'lodash'
import { memberFormDesc } from '../config'
import { updateMixin, detailMixin } from '@/mixins'
import { Users } from '@/api'
export default {
  mixins: [updateMixin, detailMixin],
  data () {
    return {
      memberFormDesc,
      drawerFormVisible: false,
      user: {}
    }
  },
  computed: {
    hasAttachments () {
      return this.user.attachments && (this.user.attachments.length > 0)
    }
  },
  watch: {
    user: {
      deep: true,
      handler (data) {
        this.formData = cloneDeep(data)
        this.formData.departmentId = data.department && data.department.id
      }
    }
  },
  created () {
    this.getDetail()
  },
  methods: {
    async getDetail () {
      try {
        const { user } = await Users.getUser(this.id)
        this.user = user
      } catch ({ message = '获取党员详情出错' }) {
        this.$message.error(message)
      }
    },
    async handleUpdate () {
      const params = {
        user: this.formData
      }
      try {
        await Users.saveUsers(_.pickBy(params, (value) => value))
        this.getDetail()
      } catch ({ message = '更新党员出错' }) {
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

