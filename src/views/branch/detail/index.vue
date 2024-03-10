<template>
  <div class="app-container">
    <el-row :gutter="10">
      <el-col :lg="{ span: 24 }" :xl="{ span: 12 }" class="mb10">
        <el-card class="base-info" shadow="hover">
          <div class="header" style="position:relative">
            <img class="branch-logo" src="@/assets/common/unit-logo.png" alt="">
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
            <el-descriptions-item label="支部名称"> {{ department.name }} </el-descriptions-item>
            <el-descriptions-item label="所属单位"> {{ department.organization && department.organization.name }} </el-descriptions-item>
          </el-descriptions>
          <el-divider content-position="left">
            支部介绍
          </el-divider>
          <el-card shadow="never">
            <froala-view v-model="department.introduction" />
          </el-card>
        </el-card>
      </el-col>
      <el-col :lg="{ span: 24 }" :xl="{ span: 12 }">
        <el-card shadow="hover">
          <h3>{{ '工作开展情况' }}</h3>
          <el-row>
            <el-col :span="12">
              <el-card shadow="hover" style="margin-top: 20px; height:130px">
                <div class="flex-space-between" style="margin-left:50px; position:relative">
                  <img class="label-icon" src="@/assets/icons/branch_active.png" alt="">
                  <div class="label" style="text-align:center;">党员人数</div>
                  <div class="count"> 100</div>
                </div>
                <div class="flex-space-between" style="margin-left:50px; position:relative">
                  <div class="label">发展党员人数</div>
                  <div class="count"> 100</div>
                </div>
                <div class="flex-space-between" style="margin-left:50px; position:relative">
                  <div class="label">少数民族党员人数</div>
                  <div class="count">20</div>
                </div>
              </el-card>
            </el-col>
            <el-col :span="12">
              <el-card shadow="hover" style="margin-top: 20px; height:130px">
                <div class="flex-space-between" style="margin-left:50px; position:relative">
                  <img class="label-icon" src="@/assets/icons/branch_active.png" alt="">
                  <div class="label">主题党日</div>
                  <div class="count">50</div>
                </div>
              </el-card>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-card shadow="hover" style="margin-top: 20px;">
                <div class="flex-space-between" style="margin-left:50px; position:relative">
                  <img class="label-icon" src="@/assets/icons/branch_active.png" alt="">
                  <div class="label">三会一课</div>
                  <div class="count">50</div>
                </div>
              </el-card>
            </el-col>
            <el-col :span="12">
              <el-card shadow="hover" style="margin-top: 20px;">
                <div class="flex-space-between" style="margin-left:50px; position:relative">
                  <img class="label-icon" src="@/assets/icons/branch_active.png" alt="">
                  <div class="label">公示公开</div>
                  <div class="count">50</div>
                </div>
              </el-card>
            </el-col>
          </el-row>
        </el-card>
      </el-col>
    </el-row>
    <el-row :gutter="10" style="margin-top: 20px">
      <el-col :lg="{ span: 24 }" :xl="{ span: 12 }">
        <el-card shadow="hover" class="mb10" style="height: 600px; ">
          <div class="flex-space-between">
            <h3>组织架构</h3>
            <el-button
              type="primary"
              icon="el-icon-edit"
            >
              编辑
            </el-button>
          </div>
          <div>
            <el-card class="branch-card" shadow="hover">
              <h3 style="text-align:center;">{{ '组织架构一' }}</h3>
            </el-card>
            <div class="organization-card-list flex-space-between">
              <draggable
                v-model="organizationList"
                class="list-group"
                tag="ul"
              >
                <transition-group type="transition" :name="'flip-list'">
                  <li v-for="(element) in organizationList" :key="element.id" class="list-group-item one-text-overflow">
                    <el-card class="branch-card" shadow="hover">
                      <h3 style="text-align:center;">{{ element.name }}</h3>
                    </el-card>
                  </li>
                </transition-group>
              </draggable>
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :lg="{ span: 24 }" :xl="{ span: 12 }">
        <el-card shadow="hover" class="mb10" style="height: 600px; ">
          <div class="flex-space-between">
            <h3>支部风采</h3>
          </div>
          <div>
            <ele-form
              v-model="formData"
              :span="24"
              :form-desc="carouselFormDesc"
              :is-loading="carouselFormLoading"
              :is-show-label="false"
              :is-show-back-btn="false"
              :is-show-reset-btn="false"
              submit-btn-text="保存"
              @request="onCarouselSubmit"
            >
              <template v-if="formData.showPics && formData.showPics.length" v-slot:orderList>
                <!-- content to trigger tooltip here -->
                <h4>排序：</h4>
                <el-tooltip content="拖动可排序" placement="top" effect="dark">
                  <draggable
                    v-model="formData.showPics"
                    class="list-group"
                    tag="ul"
                  >
                    <transition-group type="transition" :name="'flip-list'">
                      <li v-for="(element) in formData.showPics" :key="element" class="list-group-item one-text-overflow">
                        <el-image :src="element" fit="fill" class="thumb" />
                      </li>
                    </transition-group>
                  </draggable>
                </el-tooltip>
              </template>
            </ele-form>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <ele-form-drawer
      v-model="formData"
      :span="24"
      :drawer-attrs="drawerAttrs"
      :form-desc="branchFormDesc"
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
import { branchFormDesc } from '../config'
import { updateMixin, detailMixin } from '@/mixins'
import draggable from 'vuedraggable'
import { carouselFormDesc } from '../config'
import { Departments } from '@/api'

export default {
  components: { draggable },
  mixins: [updateMixin, detailMixin],
  data () {
    return {
      branchFormDesc,
      carouselFormDesc,
      carousels: [],
      formData: {},
      carouselFormLoading: false,
      drawerFormVisible: false,
      branch: {
        title: '单位名称1',
        unit: {
          id: 1,
          name: '单位一单位一单位一单位一'
        },
        brief: '支部介绍支部介绍支部介绍支部介绍'
      },
      organizationList: [
        {
          id: 2,
          name: '组织架构二'
        },
        {
          id: 3,
          name: '组织架构三'
        },
        {
          id: 4,
          name: '组织架构四'
        },
        {
          id: 5,
          name: '组织架构五'
        },
        {
          id: 6,
          name: '组织架构六'
        },
        {
          id: 7,
          name: '组织架构七'
        }
      ],
      department: {}
    }
  },
  watch: {
    department: {
      deep: true,
      handler (data) {
        this.formData = cloneDeep(data)
        this.formData.organizationId = data.organization && data.organization.id
      }
    }
  },
  created () {
    this.getDetail()
  },
  methods: {
    async getDetail () {
      try {
        const { department } = await Departments.getDepartment(this.id)
        this.department = department
      } catch ({ message = '获取支部详情出错' }) {
        this.$message.error(message)
      }
    },
    async handleUpdate () {
      const params = {
        department: this.formData
      }
      try {
        await Departments.saveDepartments(_.pickBy(params, (value) => value))
        this.getDetail()
      } catch ({ message = '更新支部出错' }) {
        this.$message.error(message)
        this.listLoading = false
      } finally {
        this.drawerFormVisible = false
      }
    },
    async onCarouselSubmit (data) {
      await this.handleUpdate()
    }
  }
}
</script>

<style lang="scss" scoped>
.branch-logo {
  position: absolute;
  width: 220px;
  right: 100px;
  top: 40px;
}
.base-info {
  border: 1px solid #FFD4A3;
  border-radius: 4px;
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
  width: 150px;
  height: 126px;
  color: #75899F;
  margin: auto;
}
.organization-card-list {
    width: 540px;
    margin: auto;
}

.carousel-wrapper {
  width: 860px;
}
.list-group {
  min-height: 20px;
  overflow: hidden;
  margin: 0;
  padding-left: 0;
}
.list-group-item {
  padding: 20px 10px;
  margin: 5px;
  border-radius: 4px;
  background: var(--color-bg);
  cursor: move;
  line-height: 40px;
  display: inline-flex;
  overflow: hidden;
}
.list-group-item:hover {
  opacity: 0.8;
}
.list-group-item .thumb {
  cursor: pointer;
  margin-right: 4px;
  border-radius: 4px;
  width: 80px;
  height: 40px;
}
</style>

