import { imgUploadOptions } from '@/data/options'
import { TOKEN_KEY, COLLEGE_DOMAIN_KEY } from '@/data/constant'
import { Local } from '@/utils/storage'
import { getToken } from '@/utils/auth'

const uploadUrl = `${process.env.VUE_APP_BASE_API}${process.env.VUE_APP_API_PREFIX}/media`

const headers = {
  [TOKEN_KEY]: getToken(),
  [COLLEGE_DOMAIN_KEY]: Local.get(COLLEGE_DOMAIN_KEY)
}
const commonColumns = [
  {
    label: '操作',
    prop: 'action',
    fixed: 'right',
    minWidth: '80px',
    width: '80px'
  }
]

export const modelMap = {
  id: 'id',
  name: '会议名称',
  conferenceType: '类型',
  pics: '缩略图',
  branch: '所属支部',
  videos: '视频',
  files: '文件'
}

export const tableColumns = [
  {
    prop: 'name',
    label: modelMap['name'],
    align: 'left'
  },
  {
    prop: 'conferenceType',
    label: modelMap['conferenceType']
  },
  // {
  //   prop: 'pics',
  //   label: modelMap['pics']
  // },
  // {
  //   prop: 'branch',
  //   label: modelMap['branch']
  // },
  ...commonColumns
]

export const unitFormDesc = {
  name: {
    label: modelMap.name,
    type: 'input',
    required: true,
    rules: [
      { max: 50, message: '会议名称不得超过50个字符', trigger: 'change' }
    ]
  },
  conferenceType: {
    label: modelMap.conferenceType,
    type: 'select',
    required: true,
    options: ['党员大会', '党支部委员会', '党小组会议', '党课']
  },
  videos: {
    label: modelMap.videos
    // type: 'video-uploader',
    // attrs: {
    //   ...videoUploadOptions,
    //   headers
    // }
  },
  pics: {
    label: '图片',
    type: 'image-uploader',
    tip: '建议长宽比例 `1:1`',
    attrs: {
      ...imgUploadOptions,
      multiple: true,
      headers
    }
  },
  files: {
    label: '文件',
    type: 'upload-file',
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
        return response.link
      }
    }
  }
}

