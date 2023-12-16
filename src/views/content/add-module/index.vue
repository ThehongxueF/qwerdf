<template>
  <div class="app-container">
    <el-card
      :body-style="{ padding: '10px 20px' }"
      shadow="never"
      class="filters-container mb10"
      height="800px"
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
              :label="item"
              :value="item"
            />
          </el-select>
        </el-col>
        <el-col :md="8" :lg="6" :xl="4" class="mb10">
          <el-button
            type="primary"
            icon="el-icon-plus"
            @click="drawerFormVisible = true"
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
          <template #action="{}">
            <el-link icon="el-icon-view" @click="drawerFormVisible = true">编辑</el-link>
          </template>
        </common-table>
        <div class="page-container">
          <pagination
            v-show="total>0"
            :total="total"
            :page.sync="listQuery.page"
            :limit.sync="listQuery.perPage"
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
                <div class="video-name" :title="item.name">{{ item.name }}</div>
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
import { Local } from '@/utils/storage'
import { listMixin, updateMixin, detailMixin } from '@/mixins'
import { tableColumns, moduleFormDesc } from './config'
const uploadUrl = `${process.env.VUE_APP_BASE_API}${process.env.VUE_APP_API_PREFIX}/upload`
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
      branch: '支部一',
      branchOptions: ['支部一', '支部二', '支部三'],
      drawerFormVisible: false,
      uploadedVideos: [],
      list: [],
      formData: {
        id: 4
      }
    }
  },
  mounted () {
    this.getList()
  },
  methods: {
    getList () {
      this.list = [
        {
          id: 1,
          title: '图片模块',
          type: '图片'
        },
        {
          id: 2,
          title: '文字模块',
          type: '文字(富文本)'
        },
        {
          id: 3,
          title: '视频模块',
          type: '视频'
        }
      ]
    },
    handleUpdate () {
      this.list.push(this.formData)
      this.drawerFormVisible = false
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
