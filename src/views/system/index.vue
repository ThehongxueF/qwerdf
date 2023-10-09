<template>
  <div class="app-container">
    <el-card shadow="hover" class="mb10">
      <el-tabs v-model="activeName">
        <!-- <el-tab-pane label="基本设置" name="base">
          <el-row :gutter="10">
            <el-col :lg="24" :xl="12">
              <el-card shadow="hover" style="margin: 0 0 20px 0" :body-style="{ padding: '20px' }">
                <h3 class="mb30">高校信息</h3>
                <ele-form
                  v-model="college"
                  :span="24"
                  :form-desc="collegeFormDesc"
                  :is-loading="collegeConfig.loading"
                  :is-show-back-btn="false"
                  :is-show-reset-btn="false"
                  submit-btn-text="保存"
                  @request="handleUpdateCollege"
                />
              </el-card>
            </el-col>
            <el-col :lg="24" :xl="12">
              <el-card shadow="hover" :body-style="{ padding: '20px' }">
                <h3>高校系统设置</h3>
                <ele-form
                  v-model="formData"
                  :span="24"
                  :form-desc="baseFormDesc"
                  :is-loading="formLoading"
                  :is-show-back-btn="false"
                  :is-show-reset-btn="false"
                  submit-btn-text="保存"
                  @request="handleUpdate"
                />
              </el-card>
            </el-col>
          </el-row>
        </el-tab-pane> -->
        <el-tab-pane label="门户设置" name="portal">
          <el-card shadow="hover" class="mb10">
            <h3>
              门户模块设置
              <small style="color: #999;">
                <i class="el-icon-info" />
                支持拖拽排序
              </small>
            </h3>
            <DynamicTags :options.sync="portalModules" />

            <el-button
              :loading="formLoading"
              type="primary"
              size="medium"
              class="mt20"
              @click="saveModuleSetting"
            >
              保存
            </el-button>
          </el-card>
          <el-card shadow="hover" class="mb10">
            <h3>首页轮播图设置</h3>
            <el-row :gutter="30">
              <el-col :lg="24" :xl="14" class="mb10">
                <div class="carousel-wrapper">
                  <el-carousel
                    v-if="carousels && carousels.length"
                    v-loading="carouselFormLoading"
                    :interval="4000"
                    height="271px"
                  >
                    <el-carousel-item v-for="item in carousels" :key="item">
                      <el-image :src="item" fit="cover" style="width: 100%; height: 100%;" />
                    </el-carousel-item>
                  </el-carousel>
                  <el-empty v-else :image-size="100" description="请上传轮播图" />
                </div>
              </el-col>
              <el-col :lg="24" :xl="10">
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
                  <template v-if="formData.carousels && formData.carousels.length" v-slot:orderList>
                    <!-- content to trigger tooltip here -->
                    <h4>排序：</h4>
                    <el-tooltip content="拖动可排序" placement="top" effect="dark">
                      <draggable
                        v-model="formData.carousels"
                        class="list-group"
                        tag="ul"
                      >
                        <transition-group type="transition" :name="'flip-list'">
                          <li v-for="(element) in formData.carousels" :key="element" class="list-group-item one-text-overflow">
                            <el-image :src="element" fit="fill" class="thumb" />
                          </li>
                        </transition-group>
                      </draggable>
                    </el-tooltip>
                  </template>
                </ele-form>
              </el-col>
            </el-row>
          </el-card>
        </el-tab-pane>
        <el-tab-pane label="用户设置" name="user">
          <el-descriptions
            :column="1"
          >
            <el-descriptions-item label="访问条件">
              <el-checkbox v-model="userConfig.guestVisibleEnable" :true-label="1" :false-label="0">游客可访问站点</el-checkbox>
            </el-descriptions-item>
            <el-descriptions-item label="注册条件">
              <el-checkbox v-model="userConfig.registerEnable" :true-label="1" :false-label="0">用户可自主注册</el-checkbox>
            </el-descriptions-item>
            <el-descriptions-item label="审核条件">
              <el-checkbox v-model="formData.needVerification">用户注册需要审核</el-checkbox>
            </el-descriptions-item>
          </el-descriptions>

          <el-button
            :loading="formLoading"
            type="primary"
            size="medium"
            class="mt20"
            @click="saveUserSetting"
          >
            保存
          </el-button>
        </el-tab-pane>
        <!-- <el-tab-pane label="第三方设置" name="thirdparty">
          <el-alert
            title="正在开发中"
            type="warning"
            show-icon
          />
          <ThirdParty />
        </el-tab-pane> -->
      </el-tabs>
    </el-card>
  </div>
</template>

<script>
import cloneDeep from 'lodash/cloneDeep'
import draggable from 'vuedraggable'
import { mapGetters } from 'vuex'
import { College, System } from '@/api'
import DynamicTags from './components/DynamicTags.vue'
// import ThirdParty from './third-party/list.vue'
import { collegeFormDesc, baseFormDesc, carouselFormDesc } from './config'

const modules = [
  {
    name: '成果库',
    to: { name: 'achievements' }
  },
  {
    name: '需求库',
    to: { name: 'demands' }
  },
  {
    name: '专家库',
    to: { name: 'experts' }
  },
  {
    name: '合作机构',
    to: { name: 'cooperative-agency' },
    children: [
      {
        name: '国家重点实验室',
        to: { name: 'laboratories' }
      }
    ]
  },
  // {
  //   name: '国家重点实验室',
  //   to: { name: 'laboratories' }
  // },
  {
    name: '招商库',
    to: { name: 'business' }
  },
  {
    name: '新闻动态',
    to: { name: 'news' }
  },
  {
    name: '活动动态',
    to: { name: 'activities' }
  }
]

const userConfig = {
  guestVisibleEnable: 1,
  registerEnable: 1
}

export default {
  name: 'SystemSettings',
  components: { draggable, DynamicTags },
  data () {
    return {
      collegeFormDesc,
      baseFormDesc,
      carouselFormDesc,
      activeName: 'portal',
      carousels: [],
      college: {},
      collegeConfig: {
        loading: false
      },
      settings: {},
      formData: {},
      formLoading: false,
      portalModules: null,
      userConfig: {},
      carouselFormLoading: false
    }
  },
  computed: {
    ...mapGetters(['collegeInfo'])
  },
  watch: {
    settings: {
      deep: true,
      handler (data) {
        this.formData = cloneDeep(data)
        this.carousels = data.carousels
      }
    },
    collegeInfo: {
      immediate: true,
      deep: true,
      handler (data) {
        this.college = cloneDeep(data)
      }
    }
  },
  created () {
    this.getDetail()
  },
  methods: {
    async getDetail () {
      const settings = await System.getSystemSettings()
      this.settings = settings
      try {
        const portalModules = JSON.parse(settings.portalConfig)
        this.portalModules = portalModules || modules
        this.portalModules = modules
      } catch (e) {
        this.portalModules = modules
      }
      try {
        const parseConfig = JSON.parse(settings.userConfig)
        this.userConfig = parseConfig || userConfig
      } catch (e) {
        this.userConfig = userConfig
      }
    },
    async onCarouselSubmit (data) {
      this.carouselFormLoading = true
      this.carousels = []
      try {
        await System.saveSystemSettings(data)
        this.$message.success('保存成功')
      } finally {
        this.carouselFormLoading = false
        this.getDetail()
      }
    },
    saveModuleSetting () {
      const moduleJSONStr = JSON.stringify(this.portalModules)
      const data = cloneDeep(this.formData)
      data.portalConfig = moduleJSONStr
      this.handleUpdate(data)
    },
    saveUserSetting () {
      const userJSONStr = JSON.stringify(this.userConfig)
      const data = cloneDeep(this.formData)
      data.userConfig = userJSONStr
      this.handleUpdate(data)
    },
    async handleUpdateCollege (data) {
      try {
        this.collegeConfig.loading = true
        const college = await College.update(data)
        this.college = college
        await this.$store.dispatch('user/setCollegeInfo', college)
        this.$message.success('保存成功')
      } finally {
        this.collegeConfig.loading = false
      }
    },
    async handleUpdate (data) {
      try {
        this.formLoading = true
        const setting = await System.saveSystemSettings(data)
        await this.$store.dispatch('user/setCollegeSetting', setting)
        this.$message.success('保存成功')
      } finally {
        this.formLoading = false
        this.getDetail()
      }
    }
  }
}
</script>

<style scoped>
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
