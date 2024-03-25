<template>
  <div class="app-container">
    <el-card
      :body-style="{ padding: '10px 20px' }"
      shadow="never"
      class="filters-container mb10"
    >
      <el-row :gutter="20">
        <el-col :md="8" :lg="6" :xl="4" class="mb10">
          <el-select
            v-model="branch"
            placeholder="请选择支部"
            style="width: 100%;"
            clearable
          >
            <el-option
              v-for="(item, index) in branchOptions"
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
  </div>
</template>

<script>
import { Local } from '@/utils/storage'
import { Departments } from '@/api'
const uploadUrl = `${process.env.VUE_APP_BASE_API}${process.env.VUE_APP_API_PREFIX}/media`
const uploadHeaders = {
  'X-Token': Local.get('X-Token').value,
  'X-College-Domain': Local.get('X-College-Domain')
}

export default {
  data () {
    return {
      uploadUrl,
      uploadHeaders,
      uploadedFiles: [],
      branch: '',
      branchOptions: []
    }
  },
  async mounted () {
    await this.getDepartmentsList()
  },
  methods: {
    async getDepartmentsList () {
      try {
        const { departments } = await Departments.getDepartments({ pageNo: 1,
          pageSize: 10 })
        this.branchOptions = departments
        if (this.branchOptions.length > 0) {
          this.branchId = this.branchOptions[0].id
        }
      } catch ({ message = '获取支部列表出错' }) {
        this.$message.error(message)
        this.listLoading = false
      }
    },
    handleChange (file, fileList) {
      this.uploadedFiles = fileList
    },
    handleRemoveFile (file) {},
    handleUpdate () {
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
