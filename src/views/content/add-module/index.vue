<template>
  <div class="app-container">
    <el-card
      :body-style="{ padding: '10px 20px' }"
      shadow="never"
      class="filters-container mb10"
      height="800px"
    >
      <el-row :gutter="20">
        <el-col v-if="currentRole !== '支部'" :md="8" :lg="6" :xl="4" class="mb10">
          <el-select
            v-model="organizationId"
            :disabled="currentRole !== '超管'"
            placeholder="请选择单位"
            style="width: 100%;"
            clearable
            @change="handleFieldSearch"
            @clear="handleFieldSearch"
          >
            <el-option
              v-for="(item, index) in organizations"
              :key="index"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </el-col>
        <el-col :md="8" :lg="6" :xl="4" class="mb10">
          <el-select
            v-model="departmentId"
            :disabled="currentRole === '支部'"
            placeholder="请选择支部"
            style="width: 100%;"
            clearable
          >
            <el-option
              v-for="(item, index) in departments"
              :key="index"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </el-col>
        <el-col :md="8" :lg="6" :xl="4" class="mb10">
          <el-button
            type="primary"
            icon="el-icon-plus"
            @click="drawerFormVisible = true, optionType = 'add'"
          >
            新增模块
          </el-button>
        </el-col>
      </el-row>
      <el-card shadow="never" :body-style="{ padding: '20px' }">
        <common-table
          :loading="listLoading"
          :data="list"
          :columns="columns"
          :show-check="showSelection"
          @on-selection-change="multipleSelection=[...$event]"
          @field-search="fieldSearch"
        >
          <template #action="{ row }">
            <el-link icon="el-icon-view" @click="editLesson(row.id)">编辑</el-link>
          </template>
        </common-table>
        <div class="page-container">
          <pagination
            v-show="total>0"
            :total="total"
            :page-no.sync="listQuery.pageNo"
            :limit.sync="listQuery.pageSize"
            @pagination="getList"
          />
        </div>
      </el-card>
    </el-card>
    <ele-form-drawer
      v-model="formData"
      :span="24"
      :drawer-attrs="drawerAttrs"
      :form-desc="moduleFormDesc"
      :visible.sync="drawerFormVisible"
      title="新增模块"
      size="800px"
      :request-fn="handleUpdate"
    >
      <template v-slot:videos>
        <div class="scrolling-card" shadow="hover" :body-style="{ overflowX: 'auto' }">
          <div class="videos flex">
            <div class="flex">
              <div v-for="item in uploadedVideos" :key="item.url" style="margin-right: 8px; position: relative;">
                <video class="video-preview" :src="item.url" controls />
                <i class="el-icon-delete el-upload-list__item-delete" @click="handleDelete(item.uid)" />
                <!-- <div class="video-name" :title="item.name">{{ item.name }}</div> -->
              </div>
            </div>
            <div>
              <el-upload
                class="upload-demo"
                :action="uploadUrl"
                multiple
                :on-success="handleSuccess"
                :on-remove="handleRemove"
                list-type="picture-card"
                :file-list="uploadedVideos"
                :headers="uploadHeaders"
                :before-upload="beforeVideoUpload"
                accept="video/mp4"
              >
                <i class="el-icon-upload" />
                <div slot="tip" class="el-upload__tip">只能上传视频文件</div>
              </el-upload>
            </div>
          </div>
        </div>
      </template>
    </ele-form-drawer>
  </div>
</template>

<script>
import { cloneDeep } from 'lodash'
import _ from 'lodash'
import { Local } from '@/utils/storage'
import { listMixin, updateMixin, detailMixin } from '@/mixins'
import { tableColumns, moduleFormDesc } from './config'
import { Departments, DynamicModels, Organizations } from '@/api'
import { mapGetters } from 'vuex'
const uploadUrl = `${process.env.VUE_APP_BASE_API}${process.env.VUE_APP_API_PREFIX}/media`
const uploadHeaders = {
  'X-Token': Local.get('X-Token').value,
  'X-College-Domain': Local.get('X-College-Domain')
}
export default {
  name: 'Modules',
  mixins: [listMixin, updateMixin, detailMixin],
  data () {
    return {
      uploadUrl,
      uploadHeaders,
      moduleFormDesc,
      originColumns: tableColumns,
      listLoading: false,
      departmentId: '',
      departments: [],
      organizations: [],
      organizationId: '',
      drawerFormVisible: false,
      uploadedVideos: [],
      list: [],
      formData: {},
      dynamicModel: {},
      optionType: 'add'
    }
  },
  watch: {
    dynamicModel: {
      deep: true,
      handler (data) {
        this.formData = cloneDeep(data)
        if (data.videos.length > 0) {
          this.uploadedVideos = data.videos.map((item, index) => {
            return {
              url: item,
              name: item
            }
          })
        }
      }
    },
    organizationId: {
      async handler (val) {
        if (!val) this.departmentId = null
        await this.getDepartmentsList()
      }
    },
    departmentId: {
      async handler (data) {
        await this.getList()
      }
    }
  },
  computed: {
    ...mapGetters(['userInfo']),
    currentRole () {
      return this.userInfo.role
    }
  },
  async mounted () {
    await this.getDepartmentsList()
    await this.getOrganizationsList()
    await this.getList()
  },
  methods: {
    async getList () {
      try {
        const { dynamicModels, count } = await DynamicModels.getDynamicModels(_.pickBy({ ...this.listQuery, departmentId: this.departmentId }, (value) => value))
        this.list = dynamicModels
        this.total = count
      } catch ({ message = '获取自定义模块出错' }) {
        this.$message.error(message)
        this.listLoading = false
      }
    },
    async getDepartmentsList () {
      try {
        const { departments } = await Departments.getDepartments({ pageNo: 1,
          pageSize: 10, organizationId: this.organizationId })
        this.departments = departments
        if (this.departments.length > 0) {
          this.departmentId = this.departments[0].id
        } else {
          this.departmentId = null
        }
      } catch ({ message = '获取支部列表出错' }) {
        this.$message.error(message)
        this.listLoading = false
      }
    },
    async getOrganizationsList () {
      try {
        const { organizations } = await Organizations.getOrganizations({ ...this.listQuery })
        this.organizations = organizations
        if (this.currentRole === '超管') {
          if (this.organizations.length > 0) {
            this.organizationId = this.organizations[0].id
          } else {
            this.organizationId = null
          }
        } else if (this.currentRole === '机构') {
          this.organizationId = this.userInfo.target && this.userInfo.target.id
        } else if (this.currentRole === '支部') {
          this.organizationId = null
        }
      } catch ({ message = '获取单位列表出错' }) {
        this.$message.error(message)
        this.listLoading = false
      }
    },
    async handleUpdate () {
      this.drawerFormVisible = false
      this.formData.departmentId = this.departmentId
      if (this.optionType === 'add') {
        this.formData.videos = this.uploadedVideos && this.uploadedVideos.map(item => item.response.link)
      } else {
        this.formData.videos = this.uploadedVideos && this.uploadedVideos.map(item => item.url)
      }
      this.formData.departmentId = this.departmentId
      try {
        const params = {
          dynamicModel: this.formData
        }
        await DynamicModels.saveDynamicModels(params)
      } catch ({ message = '保存自定义模块出错' }) {
        this.getList()
        this.$message.error(message)
      } finally {
        this.getList()
      }
    },
    handleSuccess (response, file, fileList) {
      this.uploadedVideos = fileList
    },
    handleRemove (file, fileList) {
      this.uploadedVideos = fileList
    },
    handleRemoveImage (file, fileList) {
      this.uploadedImages = fileList
    },
    beforeVideoUpload (file) {
      // 在 before-upload 函数中检查文件类型
      const isVideo = file.type.startsWith('video/')
      if (!isVideo) {
        this.$message.error('只能上传视频文件')
      }
      return isVideo
    },
    handleDelete (uid) {
      this.uploadedVideos = this.uploadedVideos.filter(item => item.uid !== uid)
    },
    editLesson (id) {
      this.drawerFormVisible = true
      this.optionType = 'edit'
      this.getDetail(id)
    },
    async getDetail (id) {
      try {
        const { dynamicModel } = await DynamicModels.getDynamicModel(id)
        this.dynamicModel = dynamicModel
      } catch ({ message = '获取自定义模块详情出错' }) {
        this.$message.error(message)
      }
    }
  }
}
</script>

<style lang='scss' scoped>
.videos {
  .video-preview {
    width: 146px;
    height: 146px;
  }
  .video-name {
    text-align: center;
    width: 146px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  ::v-deep {
    .el-upload-list--picture-card {
      display: none;
    }
  }
.el-upload-list__item-delete {
  position: absolute;
  top: 0;
  right: 0;
  cursor: pointer;
}
}
</style>
