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
      </el-row>
    </el-card>
    <el-row :gutter="20">
      <el-col :lg="{ span: 24 }" :xl="{ span: 12 }" class="mb10">
        <el-card class="scrolling-card" shadow="hover" :body-style="{ overflowX: 'auto' }">
          <h3>活动视频记录</h3>
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
        </el-card>
        <el-card class="scrolling-card" style="margin-top:20px" shadow="hover" :body-style="{ overflowX: 'auto' }">
          <h3>现场图片</h3>
          <div class="flex">
            <div>
              <el-upload
                class="upload-demo"
                :action="uploadUrl"
                multiple
                :on-remove="handleRemoveImage"
                list-type="picture-card"
                :file-list="uploadedImages"
                :headers="uploadHeaders"
                :on-preview="handlePictureCardPreview"
                accept="image/png, image/jpg, image/jpeg"
              >
                <i class="el-icon-upload" />
                <div slot="tip" class="el-upload__tip">只能上传图片</div>
              </el-upload>
              <el-dialog :visible.sync="dialogVisible">
                <img width="100%" :src="dialogImageUrl" alt="">
              </el-dialog>
            </div>
          </div>
        </el-card>
        <el-card class="scrolling-card" style="margin-top:20px" shadow="hover" :body-style="{ overflowX: 'auto' }">
          <h3>相关文件</h3>
          <div class="flex">
            <div>
              <el-upload
                class="upload-demo"
                :action="uploadUrl"
                multiple
                :on-remove="handleRemoveFile"
                :on-change="handleChange"
                :file-list="uploadedFiles"
                :headers="uploadHeaders"
              >
                <el-button size="small" type="primary">点击上传</el-button>
              </el-upload>
              <el-dialog :visible.sync="dialogVisible">
                <img width="100%" :src="dialogImageUrl" alt="">
              </el-dialog>
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :lg="{ span: 24 }" :xl="{ span: 12 }">
        <el-card shadow="hover">
          <h3>轮播图管理</h3>
          <div>
            <el-row :gutter="30">
              <el-col :lg="24" :xl="24" class="mb10">
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
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { Local } from '@/utils/storage'
import draggable from 'vuedraggable'
import { carouselFormDesc } from './config'
// import cloneDeep from 'lodash/cloneDeep'
const uploadUrl = `${process.env.VUE_APP_BASE_API}${process.env.VUE_APP_API_PREFIX}/upload`
const uploadHeaders = {
  'X-Token': Local.get('X-Token').value,
  'X-College-Domain': Local.get('X-College-Domain')
}
export default {
  name: 'ThemeParty',
  components: { draggable },
  data () {
    return {
      uploadUrl,
      uploadHeaders,
      carouselFormDesc,
      carousels: [],
      formData: {},
      carouselFormLoading: false,
      branch: '支部一',
      branchOptions: ['支部一', '支部二', '支部三'],
      uploadedVideos: [],
      uploadedImages: [],
      uploadedFiles: [],
      dialogVisible: false,
      dialogImageUrl: ''
    }
  },
  methods: {
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
    handlePictureCardPreview (file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    handleChange (file, fileList) {
      this.uploadedFiles = fileList
    },
    handleRemoveFile (file) {},
    handleUpdate () {
    },
    async onCarouselSubmit (data) {
      this.carousels = this.formData.carousels
      console.log(data)
    }
  }
}
</script>

<style lang="scss" scoped>
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
