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
  name: '单位名称',
  contact: '联系人',
  description: '描述',
  avatar: '头像',
  mobile: '联系方式',
  branchCount: '支部数量',
  endTime: '账号有效期',
  address: '单位地址',
  account: '单位账号',
  password: '单位密码',
  createdAt: '创建时间'
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
      { max: 50, message: '单位名称不得超过50个字符', trigger: 'change' }
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
    tip: '建议长宽比例 `1:1`',
    attrs: {
      ...imgUploadOptions,
      headers
    }
  }
  // address: {
  //   label: modelMap.address,
  //   type: 'input',
  //   required: true,
  //   rules: [
  //     { max: 50, message: '单位地址不得超过50个字符', trigger: 'change' }
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
  // endTime: {
  //   label: modelMap.endTime,
  //   type: 'input',
  //   required: true,
  // },
  // account: {
  //   label: modelMap.account,
  //   type: 'input',
  //   required: true,
  //   rules: [
  //     { max: 20, message: '账号不得超过20个字符', trigger: 'change' }
  //   ]
  // },
  // password: {
  //   label: modelMap.password,
  //   type: 'password',
  //   required: true,
  //   rules: [
  //     { max: 20, message: '密码不得超过20个字符', trigger: 'change' }
  //   ]
  // }
}
