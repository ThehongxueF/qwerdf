import { Local } from '@/utils/storage'
import { getToken } from '@/utils/auth'
import { TOKEN_KEY, COLLEGE_DOMAIN_KEY } from '@/data/constant'
import { Organizations } from '@/api'

import {
  imgUploadOptions
} from '@/data/options'

const uploadUrl = `${process.env.VUE_APP_BASE_API}${process.env.VUE_APP_API_PREFIX}/media`

const fetchOrganizations = async params => {
  try {
    const { organizations } = await Organizations.getOrganizations({
      ...params
    })
    return organizations
  } catch (e) {
    return []
  }
}

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
  name: '支部名称',
  organization: '所属单位',
  organizationId: '所属单位',
  introduction: '支部介绍',
  attachmentIds: '相关文件',
  logo: '头像'
}

export const tableColumns = [
  {
    prop: 'name',
    label: modelMap['name'],
    align: 'left',
    width: '200px'
  },
  {
    prop: 'organization',
    label: modelMap['organization']
  },
  ...commonColumns
]

export const branchFormDesc = {
  name: {
    label: modelMap.name,
    type: 'input',
    required: true,
    rules: [
      { max: 50, message: '支部名称不得超过50个字符', trigger: 'change' }
    ]
  },
  organizationId: {
    label: modelMap.organizationId,
    type: 'select',
    required: true,
    prop: {
      text: 'name',
      value: 'id'
    },
    options: async data => {
      const list = await fetchOrganizations({ pageNo: 1, pageSize: 100 })
      // 过滤出不为空的审核模板
      return list
    }

  },
  introduction: {
    label: modelMap.introduction,
    type: 'textarea',
    required: true
  },
  logo: {
    label: modelMap.logo,
    type: 'image-uploader',
    attrs: {
      ...imgUploadOptions,
      headers
    }
  },
  attachmentIds: {
    label: modelMap.attachmentIds,
    type: 'upload-file',
    valueFormatter (files) {
      files = files.map(item => item.id ? item.id : item)
      return files
    },
    displayFormatter (files) {
      return Array.isArray(files) ? files.map(item => {
        console.log('item', item)
        return item.name ? item : ({
          id: item.id,
          size: item.size,
          // name: `${item.fileName}${item.extension}`,
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
  }
}

export const carouselFormDesc = {
  carousels: {
    label: '',
    type: 'image-uploader',
    attrs: {
      multiple: true,
      ...imgUploadOptions,
      headers,
      title: '轮播图'
    }
  },
  orderList: {
    type: 'image'
  }
}

