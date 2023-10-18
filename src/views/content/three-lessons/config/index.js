import { videoUploadOptions, imgUploadOptions } from '@/data/options'
import { TOKEN_KEY, COLLEGE_DOMAIN_KEY } from '@/data/constant'
import { Local } from '@/utils/storage'
import { getToken } from '@/utils/auth'

const uploadUrl = `${process.env.VUE_APP_BASE_API}${process.env.VUE_APP_API_PREFIX}/attachmentUpload`

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
  title: '名称',
  type: '类型',
  image: '缩略图',
  branch: '所属支部',
  video: '视频'
}

export const tableColumns = [
  {
    prop: 'title',
    label: modelMap['title'],
    align: 'left'
  },
  {
    prop: 'type',
    label: modelMap['type']
  },
  {
    prop: 'image',
    label: modelMap['image']
  },
  {
    prop: 'branch',
    label: modelMap['branch']
  },
  ...commonColumns
]

export const unitFormDesc = {
  video: {
    label: '视频',
    type: 'video-uploader',
    attrs: {
      ...videoUploadOptions,
      headers
    }
  },
  coverUrl: {
    label: '图片',
    type: 'image-uploader',
    tip: '建议长宽比例 `1:1`',
    attrs: {
      ...imgUploadOptions,
      headers
    }
  },
  attachmentIds: {
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
        return response
      }
    }
  }
}

