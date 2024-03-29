
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

const uploadUrl = `${process.env.VUE_APP_BASE_API}${process.env.VUE_APP_API_PREFIX}/media`

const headers = {
  [TOKEN_KEY]: getToken(),
  [COLLEGE_DOMAIN_KEY]: Local.get(COLLEGE_DOMAIN_KEY)
}

export const modelMap = {
  id: 'id',
  dynamicName: '模块名称',
  dynamicType: '模块类型',
  pics: '图片',
  description: '文字(富文本)',
  files: '文件',
  videos: '视频',
  department: '支部'
}

export const tableColumns = [
  {
    prop: 'dynamicName',
    label: modelMap['dynamicName'],
    align: 'left',
    width: '200px'
  },
  {
    prop: 'dynamicType',
    label: modelMap['dynamicType']
  },
  ...commonColumns
]

export const moduleFormDesc = {
  dynamicName: {
    label: modelMap.dynamicName,
    type: 'input',
    required: true,
    rules: [
      { max: 50, message: '模块名称不得超过50个字符', trigger: 'change' }
    ]
  },
  dynamicType: {
    label: modelMap.dynamicType,
    type: 'select',
    required: true,
    options: ['图片', '文字(富文本)', '视频', '文件']
  },
  description: {
    label: modelMap.description,
    type: 'froala-editor',
    vif (data) {
      return data.dynamicType === '文字(富文本)'
    },
    // required: true,
    attrs: {
      requestHeaders: headers
    }
  },
  pics: {
    label: modelMap.pics,
    type: 'image-uploader',
    vif (data) {
      return data.dynamicType === '图片'
    },
    attrs: {
      ...imgUploadOptions,
      multiple: true,
      headers
    }
  },
  files: {
    label: modelMap.files,
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
          // name: `${item.fileName}${item.extension}`
          name: item.link
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
      return data.dynamicType === '视频'
    }
  }
}
