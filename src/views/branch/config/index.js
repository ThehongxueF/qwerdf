import { Local } from '@/utils/storage'
import { getToken } from '@/utils/auth'
import { TOKEN_KEY, COLLEGE_DOMAIN_KEY } from '@/data/constant'

import {
  imgUploadOptions
} from '@/data/options'

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
  title: '支部名称',
  unit: '所属单位',
  brief: '支部介绍'
}

export const tableColumns = [
  {
    prop: 'title',
    label: modelMap['title'],
    align: 'left',
    width: '200px'
  },
  {
    prop: 'unit',
    label: modelMap['unit']
  },
  ...commonColumns
]

export const branchFormDesc = {
  title: {
    label: modelMap.title,
    type: 'input',
    required: true,
    rules: [
      { max: 50, message: '支部名称不得超过50个字符', trigger: 'change' }
    ]
  },
  unitId: {
    label: modelMap.unit,
    type: 'select',
    required: true,
    prop: {
      text: 'title',
      value: 'id'
    },
    options: [{
      id: 1,
      title: '单位一'
    },
    {
      id: 2,
      title: '单位二'
    }]
  },
  brief: {
    label: modelMap.brief,
    type: 'textarea',
    required: true
  }
}

export const carouselFormDesc = {
  carousels: {
    label: '',
    type: 'image-uploader',
    attrs: {
      multiple: true,
      size: 100,
      ...imgUploadOptions,
      headers,
      title: '轮播图',
      crop: true, // 是否裁剪
      cropHeight: 542, // 裁剪高度
      cropWidth: 1080 // 裁剪宽度
    }
  },
  orderList: {
    type: 'image'
  }
}

