import Vue from 'vue'
import EleForm from 'vue-ele-form'
import EleFormUploadFile from 'vue-ele-form-upload-file'
import EleFormDynamic from 'vue-ele-form-dynamic'
import EleFormTreeSelect from 'vue-ele-form-tree-select'

// 自定义组件
import EleFormImageUploader from '@/components/EleFormComponents/EleUploadImage/index'
import EleFormFroalaEditor from '@/components/EleFormComponents/FroalaEditor'
import AreaCascaderWithSep from '@/components/EleFormComponents/AreaCascaderWithSep'
import EleFormVideoUploader from 'vue-ele-form-video-uploader'
import SvgIcon from '@/components/SvgIcon/basis.vue'// svg component

import { uploadUrl } from '@/data/options'

// register globally
Vue.component('svg-icon', SvgIcon)
// 注册 image-uploader 组件
Vue.component('image-uploader', EleFormImageUploader)
// 注册 upload-file 组件
Vue.component('upload-file', EleFormUploadFile)
// 注册 dynamic 组件
Vue.component('dynamic', EleFormDynamic)
// 注册 froala-editor 组件
Vue.component('froala-editor', EleFormFroalaEditor)
// 注册 tree-select 组件
Vue.component('tree-select', EleFormTreeSelect)
// 注册upload—video 组件
Vue.component('video-uploader', EleFormVideoUploader)
Vue.component('area-cascader-with-sep', AreaCascaderWithSep)

// 注册 vue-ele-form
Vue.use(EleForm, {
  // 对所有具有上传属性的组件适用
  upload: {
    fileSize: parseInt(process.env.VUE_APP_MAX_UPLOAD_SIZE) || 10
  },
  // 专门设置全局的 upload-file 属性
  'upload-file': {
    fileSize: parseInt(process.env.VUE_APP_MAX_UPLOAD_SIZE) || 10,
    action: uploadUrl
  },
  'quill-editor': {
    // 比如设置上传 action 后, 所有的 quill-editor 编辑器上传图片都会采用这个属性
    action: uploadUrl
  },
  'froala-editor': {

  },
  'tree-select': {
    limit: 3,
    limitText: count => `+ ${count} 项`,
    defaultExpandLevel: 1,
    showCount: true,
    clearAllText: '清空',
    clearValueText: '删除',
    noOptionsText: '无可选项',
    noChildrenText: '没有下一级了',
    noResultsText: '无匹配项',
    valueConsistsOf: 'LEAF_PRIORITY',
    flat: false,
    multiple: true,
    clearable: true,
    searchable: true
  }
})
