import { Template } from '@/api'
import { Local } from '@/utils/storage'
import { getToken } from '@/utils/auth'
import { isString } from '@/utils/validate'
import { TOKEN_KEY, COLLEGE_DOMAIN_KEY } from '@/data/constant'
import {
  cooperationWayOptions,
  industryAreas,
  technologyMaturityOptions,
  imgUploadOptions
} from '@/data/options'

const uploadUrl = `${process.env.VUE_APP_BASE_API}${process.env.VUE_APP_API_PREFIX}/attachmentUpload`

const fetchTemplates = async params => {
  try {
    const { templates } = await Template.getTemplates({
      ...params
    })
    return templates
  } catch (e) {
    return []
  }
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

const headers = {
  [TOKEN_KEY]: getToken(),
  [COLLEGE_DOMAIN_KEY]: Local.get(COLLEGE_DOMAIN_KEY)
}

export const modelMap = {
  id: 'ID',
  title: '成果标题',
  brief: '简介',
  keywords: '关键字',
  maturity: '成熟度',
  tags: '标签',
  targetApproveTemplateId: '审批模板',
  applicationAreas: '应用领域',
  details: '技术详情',
  visible: '上线状态',
  state: '审核状态',
  isPopularize: '推广状态',
  vendor: '数据来源',
  createdAt: '创建时间',
  updatedAt: '更新时间',
  coverUrl: '封面',
  cooperationWay: '合作方式',
  cooperationPrice: '合作预算（万元）',
  patents: '专利及荣誉情况',
  background: '技术背景',
  effectiveness: '技术优势',
  attachments: '相关文件',
  attachmentIds: '相关文件',
  publisher: '创建人',
  publisherId: '创建人',
  contact: '联系人',
  contactId: '联系人',
  servant: '技术经纪人',
  servantId: '技术经纪人'
}

export const relativeContactMap = {
  enterpriseName: '单位',
  name: '姓名',
  position: '职位',
  mobile: '电话'
}

export const tableColumns = [
  {
    prop: 'title',
    label: modelMap['title'],
    align: 'left'
  },
  {
    prop: 'tags',
    label: modelMap['tags'],
    minWidth: '250px',
    hiddenToolTip: true
  },
  {
    prop: 'applicationAreas',
    label: modelMap['applicationAreas'],
    minWidth: '180px'
  },
  {
    prop: 'maturity',
    label: modelMap['maturity']
  },
  {
    prop: 'publisher',
    label: modelMap['publisher']
  },
  {
    prop: 'servant',
    label: modelMap['servant']
  },
  {
    prop: 'contact',
    label: modelMap['contact']
  },
  {
    prop: 'cooperationPrice',
    label: modelMap['cooperationPrice'],
    width: '150px'
  },
  // {
  //   prop: 'isPopularize',
  //   label: modelMap['isPopularize']
  // },
  // {
  //   prop: 'vendor',
  //   label: modelMap['vendor']
  // },
  {
    prop: 'createdAt',
    label: modelMap['createdAt']
  },
  {
    prop: 'updatedAt',
    label: modelMap['updatedAt']
  },
  {
    prop: 'visible',
    label: '上线状态'
  },
  {
    prop: 'state',
    label: modelMap['state']
  },
  ...commonColumns
]

export const relativeContactTable = [
  {
    prop: 'enterpriseName',
    label: relativeContactMap.enterpriseName,
    width: '200px'
  },
  {
    prop: 'name',
    label: relativeContactMap.name,
    width: '150px'
  },
  {
    prop: 'position',
    label: relativeContactMap.position
  },
  {
    prop: 'mobile',
    label: relativeContactMap.mobile
  },
  {
    label: '操作',
    prop: 'action',
    fixed: 'right',
    minWidth: '80px',
    width: '160px'
  }
]

export const achievementFormDesc = {
  title: {
    label: modelMap.title,
    type: 'input',
    required: true,
    rules: [
      { max: 50, message: '成果标题不得超过50个字符', trigger: 'change' }
    ]
  },
  targetApproveTemplateId: {
    label: modelMap.targetApproveTemplateId,
    type: 'select',
    required: true,
    prop: {
      text: 'title',
      value: 'id'
    },
    options: async data => {
      const list = await fetchTemplates({ pageNo: 1, pageSize: 100, targetType: 'achievement' })
      // 过滤出不为空的审核模板
      const enList = list.filter(item => item.enable !== false)
      return enList
    },
    attrs (data) {
      return {
        // clearable: true,
        placeholder: '请输入关键词检索',
        filterable: true,
        remote: true,
        'reserve-keyword': false,
        'value-key': 'id',
        async remoteMethod (query, callback) {
          if (!isString(query)) callback([])
          const params = { text: query, pageNo: 1, pageSize: 100, targetType: 'achievement' }
          const res = await fetchTemplates(params)
          // 过滤出不为空的审核模板
          const list = res.filter(item => item.enable !== false)
          callback(list)
        }
      }
    }
  },
  tagIds: {
    label: modelMap.tags,
    type: 'tree-select',
    attrs: {
      zIndex: 99992,
      showCount: true,
      flat: false,
      defaultExpandLevel: 1,
      normalizer: node => ({
        // 键名转换，方法默认是label和children进行树状渲染
        label: node.name,
        children: node.subordinates
      })
    }
  },
  applicationAreas: {
    label: modelMap.applicationAreas,
    type: 'select',
    options: industryAreas,
    layout: 12,
    attrs: {
      multiple: true
    }
  },
  maturity: {
    options: technologyMaturityOptions,
    label: '成熟度',
    type: 'select',
    attrs: {
      multiple: false
    },
    layout: 12,
    required: true
  },
  coverUrl: {
    label: modelMap.coverUrl,
    type: 'image-uploader',
    attrs: {
      ...imgUploadOptions,
      headers
    }
  },
  cooperationWay: {
    label: modelMap.cooperationWay,
    options: cooperationWayOptions,
    type: 'select',
    attrs: {
      multiple: true
    },
    layout: 12,
    required: true
  },
  cooperationPrice: {
    label: modelMap.cooperationPrice,
    default: '面议',
    type: 'input',
    layout: 12,
    required: true,
    tip: '数值精确到小数点后`4`位',
    rules: [
      { pattern: new RegExp(/^((^\d{1,10}(?:\.\d{1,4})?$)|(?:面议))$/, ''), trigger: 'change', message: '请输入正确的数值或填写面议' }
    ],
    slots: {
      suffix (h) {
        return h('span', '（单位：万元）', { style: 'color: red;' })
      }
    }
  },
  keywords: {
    label: modelMap.keywords,
    type: 'input',
    rules: [
      { max: 50, message: '关键字不得超过50个字符', trigger: 'change' }
    ]
  },
  brief: {
    label: modelMap.brief,
    type: 'textarea',
    required: true
  },
  details: {
    label: modelMap.details,
    type: 'froala-editor',
    required: true,
    placeholder: '请输入技术详情',
    attrs: {
      requestHeaders: headers
    }
  },
  effectiveness: {
    label: modelMap.effectiveness,
    type: 'froala-editor',
    required: true,
    attrs: {
      requestHeaders: headers
    }
  },
  patents: {
    label: modelMap.patents,
    type: 'froala-editor',
    required: true,
    attrs: {
      requestHeaders: headers
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
export const achievementUpdateFormDesc = {
  title: {
    label: modelMap.title,
    type: 'input',
    required: true,
    rules: [
      { max: 50, message: '成果标题不得超过50个字符', trigger: 'change' }
    ]
  },
  targetApproveTemplateId: {
    label: modelMap.targetApproveTemplateId,
    type: 'select',
    required: true,
    prop: {
      text: 'title',
      value: 'id'
    },
    options: async data => {
      const list = await fetchTemplates({ pageNo: 1, pageSize: 100, targetType: 'achievement' })
      return list
    },
    attrs (data) {
      return {
        clearable: true,
        placeholder: '请输入关键词检索',
        filterable: true,
        remote: true,
        'reserve-keyword': false,
        'value-key': 'id',
        async remoteMethod (query, callback) {
          if (!isString(query)) callback([])
          const params = { text: query, pageNo: 1, pageSize: 100, targetType: 'achievement' }
          const res = await fetchTemplates(params)
          callback(res)
        }
      }
    }
  },
  tagIds: {
    label: modelMap.tags,
    type: 'tree-select',
    attrs: {
      zIndex: 99992,
      showCount: true,
      flat: false,
      defaultExpandLevel: 1,
      normalizer: node => ({
        // 键名转换，方法默认是label和children进行树状渲染
        label: node.name,
        children: node.subordinates
      })
    }
  },
  applicationAreas: {
    label: modelMap.applicationAreas,
    type: 'select',
    options: industryAreas,
    layout: 12,
    attrs: {
      multiple: true
    }
  },
  maturity: {
    options: technologyMaturityOptions,
    label: '成熟度',
    type: 'select',
    attrs: {
      multiple: false
    },
    layout: 12,
    required: true
  },
  coverUrl: {
    label: modelMap.coverUrl,
    type: 'image-uploader',
    attrs: {
      ...imgUploadOptions,
      headers
    }
  },
  cooperationWay: {
    label: modelMap.cooperationWay,
    options: cooperationWayOptions,
    type: 'select',
    attrs: {
      multiple: true
    },
    layout: 12,
    required: true
  },
  cooperationPrice: {
    label: modelMap.cooperationPrice,
    default: '面议',
    type: 'input',
    layout: 12,
    required: true,
    tip: '数值精确到小数点后`4`位',
    rules: [
      { pattern: new RegExp(/^((^\d{1,10}(?:\.\d{1,4})?$)|(?:面议))$/, ''), trigger: 'change', message: '请输入正确的数值或填写面议' }
    ],
    slots: {
      suffix (h) {
        return h('span', '（单位：万元）', { style: 'color: red;' })
      }
    }
  },
  keywords: {
    label: modelMap.keywords,
    type: 'input',
    rules: [
      { max: 50, message: '关键字不得超过50个字符', trigger: 'change' }
    ]
  },
  brief: {
    label: modelMap.brief,
    type: 'textarea',
    required: true
  },
  details: {
    label: modelMap.details,
    type: 'froala-editor',
    required: true,
    attrs: {
      requestHeaders: headers
    }
  },
  effectiveness: {
    label: modelMap.effectiveness,
    type: 'froala-editor',
    required: true,
    attrs: {
      requestHeaders: headers
    }
  },
  patents: {
    label: modelMap.patents,
    type: 'froala-editor',
    required: true,
    attrs: {
      requestHeaders: headers
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

export const achievementUpdateFormDescUnNew = {
  title: {
    label: modelMap.title,
    type: 'input',
    required: true,
    rules: [
      { max: 50, message: '成果标题不得超过50个字符', trigger: 'change' }
    ]
  },
  tagIds: {
    label: modelMap.tags,
    type: 'tree-select',
    attrs: {
      zIndex: 99992,
      showCount: true,
      flat: false,
      defaultExpandLevel: 1,
      normalizer: node => ({
        // 键名转换，方法默认是label和children进行树状渲染
        label: node.name,
        children: node.subordinates
      })
    }
  },
  applicationAreas: {
    label: modelMap.applicationAreas,
    type: 'select',
    options: industryAreas,
    layout: 12,
    attrs: {
      multiple: true
    }
  },
  maturity: {
    options: technologyMaturityOptions,
    label: '成熟度',
    type: 'select',
    attrs: {
      multiple: false
    },
    layout: 12,
    required: true
  },
  coverUrl: {
    label: modelMap.coverUrl,
    type: 'image-uploader',
    attrs: {
      ...imgUploadOptions,
      headers
    }
  },
  cooperationWay: {
    label: modelMap.cooperationWay,
    options: cooperationWayOptions,
    type: 'select',
    attrs: {
      multiple: true
    },
    layout: 12,
    required: true
  },
  cooperationPrice: {
    label: modelMap.cooperationPrice,
    default: '面议',
    type: 'input',
    layout: 12,
    required: true,
    tip: '数值精确到小数点后`4`位',
    rules: [
      { pattern: new RegExp(/^((^\d{1,10}(?:\.\d{1,4})?$)|(?:面议))$/, ''), trigger: 'change', message: '请输入正确的数值或填写面议' }
    ],
    slots: {
      suffix (h) {
        return h('span', '（单位：万元）', { style: 'color: red;' })
      }
    }
  },
  keywords: {
    label: modelMap.keywords,
    type: 'input',
    rules: [
      { max: 50, message: '关键字不得超过50个字符', trigger: 'change' }
    ]
  },
  brief: {
    label: modelMap.brief,
    type: 'textarea',
    required: true
  },
  details: {
    label: modelMap.details,
    type: 'froala-editor',
    required: true,
    attrs: {
      requestHeaders: headers
    }
  },
  effectiveness: {
    label: modelMap.effectiveness,
    type: 'froala-editor',
    required: true,
    attrs: {
      requestHeaders: headers
    }
  },
  patents: {
    label: modelMap.patents,
    type: 'froala-editor',
    required: true,
    attrs: {
      requestHeaders: headers
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
