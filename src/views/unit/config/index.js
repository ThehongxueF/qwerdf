import { Local } from '@/utils/storage'
import { getToken } from '@/utils/auth'
import { TOKEN_KEY, COLLEGE_DOMAIN_KEY } from '@/data/constant'
import {
  imgUploadOptions
} from '@/data/options'

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
  name: '机构名称',
  contact: '联系人',
  description: '描述',
  avatar: '头像',
  mobile: '联系方式',
  branchCount: '支部数量',
  servedAt: '开通时间',
  address: '机构地址',
  adminName: '机构管理员账号',
  adminPassword: '机构管理员密码',
  createdAt: '创建时间'
}

export const branchMap = {
  id: 'id',
  name: '支部名称',
  organization: '所属机构',
  organizationId: '所属机构',
  introduction: '支部介绍',
  attachmentIds: '相关文件',
  adminName: '支部管理员账号',
  adminPassword: '支部管理员密码',
  logo: '头像'
}

export const tableColumns = [
//   {
//     prop: 'id',
//     label: modelMap['id']
//   },
  {
    prop: 'name',
    label: modelMap['name'],
    align: 'left'
  },
  {
    prop: 'description',
    label: modelMap['description']
  },
  // {
  //   prop: 'contact',
  //   label: modelMap['contact']
  // },
  // {
  //   prop: 'mobile',
  //   label: modelMap['mobile']
  // },
  // {
  //   prop: 'branchCount',
  //   label: modelMap['branchCount']
  // },
  // {
  //   prop: 'endTime',
  //   label: modelMap['endTime']
  // },
  {
    prop: 'createdAt',
    label: modelMap['createdAt']
  },
  ...commonColumns
]

export const unitFormDesc = {
  name: {
    label: modelMap.name,
    type: 'input',
    required: true,
    rules: [
      { max: 50, message: '机构名称不得超过50个字符', trigger: 'change' }
    ]
  },
  description: {
    label: modelMap.description,
    type: 'textarea',
    required: true
  },
  avatar: {
    label: modelMap.avatar,
    type: 'image-uploader',
    attrs: {
      ...imgUploadOptions,
      headers
    }
  },
  // address: {
  //   label: modelMap.address,
  //   type: 'input',
  //   required: true,
  //   rules: [
  //     { max: 50, message: '机构地址不得超过50个字符', trigger: 'change' }
  //   ]
  // },
  // contact: {
  //   label: modelMap.contact,
  //   type: 'input',
  //   required: true,
  //   rules: [
  //     { max: 20, message: '联系人姓名不得超过20个字符', trigger: 'change' }
  //   ]
  // },
  // mobile: {
  //   label: modelMap.mobile,
  //   type: 'input',
  //   required: true,
  //   rules: [
  //     { max: 20, message: '联系方式不得超过20个字符', trigger: 'change' }
  //   ]
  // },
  servedAt: {
    label: modelMap.servedAt,
    type: 'date',
    attrs: {
      placeholder: '请选择日期',
      format: 'yyyy-MM-dd',
      valueFormat: 'yyyy-MM-dd'
    }
  },
  adminName: {
    label: modelMap.adminName,
    type: 'input',
    rules: [
      { max: 20, message: '账号不得超过20个字符', trigger: 'change' }
    ]
  },
  adminPassword: {
    label: modelMap.adminPassword,
    type: 'password',
    rules: [
      { max: 20, message: '密码不得超过20个字符', trigger: 'change' }
    ]
  }
}

export const branchFormDesc = {
  name: {
    label: branchMap.name,
    type: 'input',
    required: true,
    rules: [
      { max: 50, message: '支部名称不得超过50个字符', trigger: 'change' }
    ]
  },
  introduction: {
    label: branchMap.introduction,
    type: 'textarea',
    required: true
  },
  adminName: {
    label: branchMap.adminName,
    type: 'input',
    rules: [
      { max: 20, message: '账号不得超过20个字符', trigger: 'change' }
    ]
  },
  adminPassword: {
    label: branchMap.adminPassword,
    type: 'password',
    rules: [
      { max: 20, message: '密码不得超过20个字符', trigger: 'change' }
    ]
  },
  logo: {
    label: branchMap.logo,
    type: 'image-uploader',
    attrs: {
      ...imgUploadOptions,
      headers
    }
  },
  attachmentIds: {
    label: branchMap.attachmentIds,
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
