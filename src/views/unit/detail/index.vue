<template>
  <div class="app-container">
    <el-row :gutter="10">
      <el-col :lg="{ span: 24 }" :xl="{ span: 12 }" class="mb10">
        <el-card class="base-info" shadow="hover">
          <div class="header" style="position:relative">
            <img class="unit-logo" src="@/assets/common/unit-logo.png" alt="">
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
            <el-descriptions-item label="单位名称"> {{ organization.name }} </el-descriptions-item>
            <el-descriptions-item label="单位地址"> {{ organization.address }} </el-descriptions-item>
            <el-descriptions-item label="单位联系人"> {{ organization.contact }} </el-descriptions-item>
            <el-descriptions-item label="联系方式"> {{ organization.mobile }} </el-descriptions-item>
            <el-descriptions-item label="描述"> {{ organization.description }} </el-descriptions-item>
          </el-descriptions>
          <div class="outdate-time flex-space-between">
            <div>开通时间: <span> {{ organization.servedAt }}</span></div>
            <el-switch
              v-model="value"
              active-color="#13ce66"
              inactive-color="#ff4949"
            />
          </div>
        </el-card>
      </el-col>
      <el-col :lg="{ span: 24 }" :xl="{ span: 12 }">
        <el-card shadow="hover">
          <h3>{{ '工作开展情况' }}</h3>
          <el-row>
            <el-col :span="12">
              <el-card shadow="hover" style="margin-top: 20px; height:130px">
                <div class="flex-space-between" style="margin-left:50px; position:relative">
                  <img class="label-icon" src="@/assets/icons/unit_active.png" alt="">
                  <div class="label" style="text-align:center;">党员人数</div>
                  <div class="count"> {{ detail.partyMemberCount }}</div>
                </div>
                <div class="flex-space-between" style="margin-left:50px; position:relative">
                  <div class="label">发展党员人数</div>
                  <div class="count"> {{ detail.protentialMemberCount }}</div>
                </div>
                <!-- <div class="flex-space-between" style="margin-left:50px; position:relative">
                  <div class="label">少数民族党员人数</div>
                  <div class="count">20</div>
                </div> -->
              </el-card>
            </el-col>
            <el-col :span="12">
              <el-card shadow="hover" style="margin-top: 20px; height:130px">
                <div class="flex-space-between" style="margin-left:50px; position:relative">
                  <img class="label-icon" src="@/assets/icons/unit_active.png" alt="">
                  <div class="label">主题党日</div>
                  <div class="count">{{ detail.partyDayCount }}</div>
                </div>
              </el-card>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-card shadow="hover" style="margin-top: 20px;">
                <div class="flex-space-between" style="margin-left:50px; position:relative">
                  <img class="label-icon" src="@/assets/icons/unit_active.png" alt="">
                  <div class="label">三会一课</div>
                  <div class="count">{{ detail.conferenceCount }}</div>
                </div>
              </el-card>
            </el-col>
            <el-col :span="12">
              <el-card shadow="hover" style="margin-top: 20px;">
                <div class="flex-space-between" style="margin-left:50px; position:relative">
                  <img class="label-icon" src="@/assets/icons/unit_active.png" alt="">
                  <div class="label">公示公开</div>
                  <div class="count">{{ detail.publicationCount }}</div>
                </div>
              </el-card>
            </el-col>
          </el-row>
        </el-card>
      </el-col>
    </el-row>
    <el-row :gutter="10" style="margin-top: 20px">
      <el-col :lg="{ span: 24 }" :xl="{ span: 24 }">
        <el-card shadow="hover" class="mb10" style="height: 300px; ">
          <div class="flex-space-between">
            <h3>下属支部</h3>
            <el-button
              type="primary"
              icon="el-icon-plus"
              @click="addBranch"
            >
              新增支部
            </el-button>
          </div>
          <div style="display:flex; overflow-x:auto;">
            <el-card v-for="item in departments" :key="item.id" class="branch-card" shadow="hover" style="margin-top: 20px; height:120px">
              <div style="height: 120px" @click="goDepartmentDetail(item)">
                <h3 class="unit-name" style="text-align:center;">{{ item.name }}</h3>
              </div>

            </el-card>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <ele-form-drawer
      v-model="formData"
      :span="24"
      :drawer-attrs="drawerAttrs"
      :form-desc="unitFormDesc"
      :visible.sync="drawerFormVisible"
      title="编辑单位"
      size="800px"
      :request-fn="handleUpdate"
    />
    <ele-form-drawer
      v-model="branchFormData"
      :span="24"
      :drawer-attrs="drawerAttrs"
      :form-desc="branchFormDesc"
      :visible.sync="branchDrawerFormVisible"
      title="新增支部"
      size="800px"
      :request-fn="handleUpdateBranch"
    />
  </div>
</template>
<script>
import { cloneDeep } from 'lodash'
import { unitFormDesc, branchFormDesc } from '../config'
import { listMixin, updateMixin, detailMixin } from '@/mixins'
import { Organizations, Departments } from '@/api'
export default {
  mixins: [listMixin, updateMixin, detailMixin],
  data () {
    return {
      unitFormDesc,
      branchFormDesc,
      drawerFormVisible: false,
      branchDrawerFormVisible: false,
      detail: {},
      departments: [],
      organization: {},
      branchFormData: {},
      value: true
    }
  },
  watch: {
    organization: {
      deep: true,
      handler (data) {
        this.formData = cloneDeep(data)
      }
    }
  },
  created () {
    this.getDetail()
    this.getDepartmentsList()
  },
  methods: {
    async getDetail () {
      try {
        const data = await Organizations.getOrganization(this.id)
        this.detail = data
        this.organization = data.organization
      } catch ({ message = '获取组织机构详情出错' }) {
        this.$message.error(message)
      }
    },
    async getDepartmentsList () {
      try {
        const { departments } = await Departments.getDepartments({ ...this.listQuery, organizationId: String(this.id) })
        this.departments = departments
      } catch ({ message = '获取支部列表出错' }) {
        this.$message.error(message)
        this.listLoading = false
      }
    },
    async  handleUpdate () {
      const params = {
        organization: this.formData
      }
      try {
        await Organizations.saveOrganizations(params)
        this.getDetail()
      } catch ({ message = '更新组织机构出错' }) {
        this.$message.error(message)
        this.listLoading = false
      } finally {
        this.drawerFormVisible = false
      }
    },
    async handleUpdateBranch () {
      try {
        this.branchFormData.organizationId = this.id
        const params = {
          department: this.branchFormData,
          adminName: this.formData.adminName,
          adminPassword: this.formData.adminPassword
        }
        await Departments.saveDepartments(params)
        this.getDepartmentsList()
        this.$message.success('新增支部成功')
      } catch ({ message = '新增支部出错' }) {
        this.$message.error(message)
      } finally {
        this.branchDrawerFormVisible = false
      }
    },
    addBranch () {
      this.branchDrawerFormVisible = true
    },
    goDepartmentDetail (item) {
      this.$router.push({ name: 'Branchs.Detail', params: { id: item.id }})
    }
  }
}
</script>

<style lang="scss" scoped>
.used {
  background-color: #00C9BF ;
  padding: 10px 12px;
  border-radius: 10px;
  color: #ffffff;
  font-size: 12px;
  line-height: 18px;
  margin-left: 10px;
}
.outdate {
  background-color: #C91D00;
}
.unit-logo {
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
  cursor: pointer;
  .unit-name {
    font-size: 16px;
  }
}
</style>

