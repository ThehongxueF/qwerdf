<!--
* 上传组件
* 对el-upload
-->
<template>
  <div class="ele-upload-image">
    <!-- 上传组件 -->
    <el-upload
      v-if="!crop"
      v-show="isShowUpload"
      ref="upload"
      :accept="accept"
      :action="action"
      :before-upload="handleBeforeUpload"
      :data="data"
      :disabled="uploading"
      :drag="Boolean(drag)"
      :headers="headers"
      :http-request="httpRequest"
      :limit="limit"
      :list-type="drag ? 'picture' : 'picture-card'"
      :multiple="multiple"
      :name="name"
      :on-change="handleChange"
      :on-error="handleUploadError"
      :on-exceed="handleExceed"
      :on-success="handleUploadSuccess"
      :show-file-list="false"
      :style="{
        marginBottom: multiple && computedValues.length ? '20px' : '0px'
      }"
      :with-credentials="withCredentials"
    >
      <div v-loading="uploading">
        <!-- drag显示 -->
        <template v-if="drag">
          <i class="el-icon-upload" />
          <div class="el-upload__text">
            将文件拖到此处，或
            <em>点击上传</em>
          </div>
        </template>

        <!-- 非drag -->
        <template v-else>
          <div
            :style="{
              width: size + 'px',
              height: size + 'px',
              lineHeight: size + 'px'
            }"
          >
            <i class="el-icon-plus" />
          </div>
        </template>
      </div>

      <!-- 公共 -->
      <div v-if="showTip" slot="tip" class="el-upload__tip">
        请上传
        <b style="color: #F56C6C">{{
          fileType.length ? fileType.join("/") : "图片"
        }}</b>
        格式文件
        <template v-if="fileSize">
          ，且大小不超过
          <b style="color: #F56C6C">{{ fileSize }}MB</b>
        </template>
      </div>
    </el-upload>

    <div v-if="crop">
      <div
        v-show="isShowUpload"
        :style="{
          width: size + 'px',
          height: size + 'px',
          lineHeight: size + 'px'
        }"
        class="el-upload el-upload--picture-card"
        style="margin-bottom: 20px;"
        @click="isShowCrop = true"
      >
        <i class="el-icon-plus avatar-uploader-icon" />
      </div>

      <cropper
        v-if="isShowCrop"
        ref="cropper"
        v-model="isShowCrop"
        :field="name"
        :headers="headers"
        :height="cropHeight"
        :no-circle="cropHeight !== cropWidth"
        :params="data"
        :url="action"
        :width="cropWidth"
        :with-credentials="withCredentials"
        class="ele-upload-image--cropper"
        img-format="png"
        @crop-success="handleCropSuccess"
        @crop-upload-fail="handleCropUploadError"
        @crop-upload-success="handleCropUploadSuccess"
        @src-file-set="handleSetFileSet"
      />
    </div>

    <!-- 图片列表 -->
    <ele-gallery
      :lazy="lazy"
      :remove-fn="handleRemove"
      :size="size"
      :slice-single="true"
      :source="value"
      :thumb-suffix="thumbSuffix"
      :title="title"
    />
  </div>
</template>

<script>
/* eslint-disable vue/require-default-prop */
import Cropper from 'vue-image-crop-upload'
import EleGallery from 'vue-ele-gallery'

export default {
  name: 'EleUploadImage',
  components: {
    Cropper,
    EleGallery
  },
  props: {
    // 值
    value: {
      type: [String, Array],
      default () {
        return []
      }
    },
    // 是否剪裁
    crop: {
      type: Boolean,
      default: false
    },
    // 图片显示大小
    size: {
      type: Number,
      default: 150
    },
    // 裁剪高度
    cropHeight: {
      type: Number
    },
    // 裁剪宽度
    cropWidth: {
      type: Number
    },
    // 大小限制(MB)
    fileSize: {
      type: Number
    },
    // 响应处理函数
    responseFn: Function,
    // 文件类型, 例如['png', 'jpg', 'jpeg']
    fileType: {
      type: Array,
      default: () => []
    },
    // 是否显示上传成功的提示
    isShowSuccessTip: {
      type: Boolean,
      default: true
    },
    // 缩略图后缀, 例如七牛云缩略图样式 (?imageView2/1/w/20/h/20)
    thumbSuffix: {
      type: String,
      default: ''
    },
    // 是否显示提示
    isShowTip: {
      type: Boolean,
      default: true
    },
    // 弹窗标题
    title: String,
    // 图片懒加载
    lazy: {
      type: Boolean,
      default: false
    },
    // 上传地址 (同官网)
    action: {
      type: String,
      required: true
    },
    // 设置上传的请求头部(同官网)
    headers: Object,
    // 文件个数显示(同官网)
    limit: Number,
    // 是否启用拖拽上传 (同官网)
    drag: {
      type: Boolean,
      default: false
    },
    // 	支持发送 cookie 凭证信息 (同官网)
    withCredentials: {
      type: Boolean,
      default: false
    },
    // 是否支持多选文件 (同官网)
    multiple: {
      type: Boolean,
      default: false
    },
    // 上传时附带的额外参数(同官网)
    data: Object,
    // 上传的文件字段名 (同官网)
    name: {
      type: String,
      default: 'file'
    },
    // 覆盖默认的上传行为，可以自定义上传的实现 (同官网)
    httpRequest: Function,
    // 接受上传的文件类型（thumbnail-mode 模式下此参数无效）(同官网)
    accept: String,
    // 删除前的操作
    beforeRemove: Function
  },
  data () {
    return {
      cropData: {},
      isShowCrop: false,
      uploading: false,
      fileList: [],
      lanExt: {
        hint: '点击，或拖动图片至此处',
        loading: '正在上传……',
        noSupported: '浏览器不支持该功能，请使用IE10以上或其他现在浏览器！',
        success: '上传成功',
        fail: '图片上传失败',
        preview: '图片预览',
        btn: {
          off: '取消',
          close: '关闭',
          back: '上一步',
          save: '保存'
        },
        error: {
          onlyImg: '仅限图片格式',
          outOfSize: '单文件大小不能超过 ',
          lowestPx: '图片最低像素为（宽*高）：'
        }
      }
    }
  },
  computed: {
    // 是否显示提示
    showTip () {
      return this.isShowTip && (this.fileType.length || this.fileSize)
    },
    computedValues () {
      if (this.value) {
        if (typeof this.value === 'string') {
          return [this.value]
        } else {
          return [...this.value]
        }
      } else {
        return []
      }
    },
    isShowUpload () {
      if (this.multiple) {
        return true
      } else {
        return this.computedValues.length === 0
      }
    },
    successFiles () {
      return this.fileList.filter(file => file.status === 'success')
    }
  },
  watch: {
    isShowCrop (value) {
      if (value === false) {
        this.cropData = {}
      }
    }
  },
  mounted () {
    // 插入到body中, 避免弹出层被遮盖
    if (this.crop && this.$refs.cropper) {
      document.body.appendChild(this.$refs.cropper.$el)
    }
  },
  methods: {
    handleSetFileSet (fileName, fileType, fileSize) {
      const uid = this.cropData.uid || new Date().getTime()
      this.cropData = {
        name: fileName,
        percentage: 0,
        size: fileSize,
        type: fileType,
        status: 'ready',
        uid: uid
      }
    },
    handleCropSuccess (b64Data) {
      this.cropData.url = b64Data
    },
    handleCropUploadError (status) {
      this.$message.error('上传失败, 请重试')
      this.$emit('error', status)
    },
    handleCropUploadSuccess (response) {
      this.cropData.status = 'success'
      this.cropData.percentage = 100
      this.cropData.response = response
      const file = Object.assign({}, this.cropData)
      const index = this.fileList.findIndex(item => item.uid === file.uid)
      if (index > -1) {
        this.fileList.splice(index, 1, file)
      } else {
        this.fileList.push(file)
      }
      this.handleUploadSuccess(response, file, this.fileList)
    },
    // 上传前校检格式和大小
    handleBeforeUpload (file) {
      let isImg = false
      if (this.fileType.length) {
        let fileExtension = ''
        if (file.name.lastIndexOf('.') > -1) {
          fileExtension = file.name.slice(file.name.lastIndexOf('.') + 1)
        }
        isImg = this.fileType.some(type => {
          if (file.type.indexOf(type) > -1) return true
          if (fileExtension && fileExtension.indexOf(type) > -1) return true
          return false
        })
      } else {
        isImg = file.type.indexOf('image') > -1
      }

      if (!isImg) {
        this.$message.error(
          `文件格式不正确, 请上传${this.fileType.join('/')}图片格式文件!`
        )
        return false
      }

      if (this.fileSize) {
        const isLt = file.size / 1024 / 1024 < this.fileSize
        if (!isLt) {
          this.$message.error(`上传头像图片大小不能超过 ${this.fileSize} MB!`)
          return false
        }
      }

      this.uploading = true
      return true
    },
    handleChange (file, fileList) {
      this.uploading = false
      this.fileList = fileList
    },
    // 文件个数超出
    handleExceed () {
      this.$message.error(`最多上传${this.limit}张图片`)
    },
    // 上传失败
    handleUploadError (err) {
      this.uploading = false
      this.$message.error('上传失败, 请重试')
      this.$emit('error', err)
    },
    // 上传成功回调
    handleUploadSuccess (response, file) {
      let url = response
      this.uploading = false
      if (this.isShowSuccessTip) {
        this.$message.success('上传成功')
      }
      if (this.responseFn) {
        url = this.responseFn(response, file, this.successFiles)
      }
      if (this.multiple) {
        if (Array.isArray(this.value)) {
          this.$emit('input', [...this.value, url])
        } else {
          this.$emit('input', [url])
        }
      } else {
        this.$emit('input', url)
      }
    },
    doRemove (index) {
      if (this.multiple) {
        const data = [...this.computedValues]
        data.splice(index, 1)
        this.$emit('input', data || [])
      } else {
        this.$emit('input', null)
      }
    },
    handleRemove (index) {
      if (!this.beforeRemove) {
        this.doRemove(index)
      } else if (typeof this.beforeRemove === 'function') {
        const file = this.multiple
          ? this.computedValues[index]
          : this.computedValues

        const before = this.beforeRemove(file, this.computedValues)
        if (before && before.then) {
          before.then(
            () => {
              this.doRemove(index)
            },
            () => {}
          )
        } else if (before !== false) {
          this.doRemove(index)
        }
      }
    }
  }
}
</script>

<style>
.ele-upload-image {
  line-height: 1;
}
.ele-upload-image .el-loading-spinner {
  line-height: 1;
}
.ele-upload-image .el-icon-plus {
  vertical-align: middle;
}
.ele-upload-image .el-upload--picture-card {
  width: auto;
  height: auto;
  background: none;
  line-height: inherit;
}

/* 裁剪 */
.vue-image-crop-upload.ele-upload-image--cropper {
  z-index: 2000;
}
.ele-upload-image--cropper .vicp-drop-area {
  background-color: #fbfdff !important;
}
.ele-upload-image--cropper .vicp-icon1-arrow {
  border-bottom-color: #909399 !important;
}
.ele-upload-image--cropper .vicp-icon1-body {
  background-color: #909399 !important;
}
.ele-upload-image--cropper .vicp-icon1-bottom {
  border-color: #909399 !important;
}
</style>
