
import { Local } from '@/utils/storage'
import { getToken } from '@/utils/auth'
import { TOKEN_KEY, COLLEGE_DOMAIN_KEY } from '@/data/constant'
import {
  imgUploadOptions
} from '@/data/options'
const commonColumns = [
  {
    label: '操作',
    prop: 'action',
    fixed: 'right',
    minWidth: '80px',
    width: '80px'
  }
]

const uploadUrl = `${process.env.VUE_APP_BASE_API}${process.env.VUE_APP_API_PREFIX}/attachmentUpload`

const headers = {
  [TOKEN_KEY]: getToken(),
  [COLLEGE_DOMAIN_KEY]: Local.get(COLLEGE_DOMAIN_KEY)
}

export const modelMap = {
  id: 'id',
  title: '模块名称',
  type: '内容类型',
  image: '图片',
  details: '文字(富文本)',
  attachmentIds: '文件',
  videos: '视频'
}

export const tableColumns = [
  {
    prop: 'title',
    label: modelMap['title'],
    align: 'left',
    width: '200px'
  },
  {
    prop: 'type',
    label: modelMap['type']
  },
  ...commonColumns
]

export const moduleFormDesc = {
  title: {
    label: modelMap.title,
    type: 'input',
    required: true,
    rules: [
      { max: 50, message: '模块名称不得超过50个字符', trigger: 'change' }
    ]
  },
  type: {
    label: modelMap.type,
    type: 'select',
    required: true,
    options: ['图片', '文字(富文本)', '视频', '文件']
  },
  details: {
    label: modelMap.details,
    type: 'froala-editor',
    vif (data) {
      return data.type === '文字(富文本)'
    },
    // required: true,
    attrs: {
      requestHeaders: headers
    }
  },
  image: {
    label: modelMap.image,
    type: 'image-uploader',
    vif (data) {
      return data.type === '图片'
    },
    tip: '建议长宽比例 `1:1`',
    attrs: {
      ...imgUploadOptions,
      multiple: true,
      headers
    }
  },
  attachmentIds: {
    label: modelMap.attachmentIds,
    type: 'upload-file',
    // vif (data) {
    //   return data.type === '文件'
    // },
    valueFormatter (files) {
      files = files.map(item => item.id ? item.id : item)
      return files
    },
    displayFormatter (files) {
      return Array.isArray(files) ? files.map(item => {
        return item.name ? item : ({
          id: item.id,
          size: item.size,
          name: `${item.fileName}${item.extension}`
        })
      }) : files
    },
    attrs: {
      limit: 5,
      headers,
      action: uploadUrl,
      isCanDownload: false,
      responseFn (response, file) {
        return response
      }
    }
  },
  videos: {
    label: '视频',
    vif (data) {
      return data.type === '视频'
    }
  }
}
