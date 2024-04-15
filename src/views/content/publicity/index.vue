<template>
  <div class="app-container">
    <el-card
      :body-style="{ padding: '10px 20px' }"
      shadow="never"
      class="filters-container mb10"
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
            @clear="handleFieldSearch"
          >
            <el-option
              v-for="(item, index) in departments"
              :key="index"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </el-col>
      </el-row>
    </el-card>
    <el-row :gutter="20">
      <el-col :lg="{ span: 24 }" :xl="{ span: 12 }" class="mb10">
        <el-card class="scrolling-card" shadow="hover">
          <div class="file-header">
            <h3>相关文件</h3>
            <div class="upload-button">
              <el-upload
                class="upload-demo"
                :action="uploadUrl"
                multiple
                :on-remove="handleRemoveFile"
                :on-change="handleChange"
                :show-file-list="false"
                :file-list="uploadedFiles"
                :headers="uploadHeaders"
              >
                <el-button size="small" type="primary">点击上传</el-button>
              </el-upload>
            </div>
          </div>
          <div class="file-content">
            <div v-for="(item, index) in uploadedFiles" :key="index" class="file-item">
              {{ item.name }}
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <el-button @click="handleUpdate">保存</el-button>
  </div>
</template>

<script>
import { Local } from '@/utils/storage'
import _ from 'lodash'
import { listMixin } from '@/mixins'
import { Departments, Publications, Organizations } from '@/api'
import { mapGetters } from 'vuex'
const uploadUrl = `${process.env.VUE_APP_BASE_API}${process.env.VUE_APP_API_PREFIX}/media`
const uploadHeaders = {
  'X-Token': Local.get('X-Token').value,
  'X-College-Domain': Local.get('X-College-Domain')
}

export default {
  mixins: [listMixin],
  data () {
    return {
      uploadUrl,
      uploadHeaders,
      uploadedFiles: [],
      departmentId: '',
      organizations: [],
      organizationId: '',
      departments: [],
      publications: [],
      hasPublicity: false
    }
  },
  computed: {
    ...mapGetters(['userInfo']),
    currentRole () {
      return this.userInfo.role
    }
  },
  watch: {
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
  async mounted () {
    await this.getDepartmentsList()
    await this.getOrganizationsList()
    await this.getList()
  },
  methods: {
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
        const { organizations } = await Organizations.getOrganizations({ pageNo: 1,
          pageSize: 10 })
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
    async getList () {
      try {
        const params = {
          pageNo: 1,
          pageSize: 10,
          departmentId: this.departmentId
        }
        const { publications } = await Publications.getPublications(_.pickBy(params, (value) => value))
        if (publications.length > 0) {
          this.hasPublicity = true
          this.publications = publications
          if (publications[0].files.length > 0) {
            this.uploadedFiles = publications[0].files.map((item, index) => {
              return {
                url: item,
                name: item
              }
            })
            console.log('this.uploadedFiles', this.uploadedFiles)
          } else {
            this.uploadedFiles = []
          }
        } else {
          this.hasPublicity = false
          this.uploadedFiles = []
        }
      } catch ({ message = '获取公式公开列表出错' }) {
        this.$message.error(message)
        this.listLoading = false
      }
    },
    handleChange (file, fileList) {
      this.uploadedFiles = fileList
    },
    handleRemoveFile (file) {},
    async  handleUpdate () {
      const params = {
        publication: {
          id: this.hasPublicity ? this.publications[0].id : null,
          files: this.uploadedFiles.length > 0 && this.uploadedFiles.map(item => (item.response?.link || item.url)),
          departmentId: this.departmentId
        }
      }
      try {
        await Publications.savePublications(_.pickBy(params, (value) => value))
        this.$message.success('保存成功')
        this.getList()
      } catch ({ message = '保存公式公开出错' }) {
        this.$message.error(message)
        this.listLoading = false
      }
    }
  }
}
</script>
<style scoped lang='scss'>
.file-header {
  display: flex;
  align-items: center;
  .upload-button {
    margin-left: 30px;
  }
}
.file-content {
  // display: flex;
  // align-items: center;
}
.file-item {
  margin-top: 10px;
  margin-right: 20px;
}

</style>
