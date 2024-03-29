import { Local } from '@/utils/storage'
import { getToken } from '@/utils/auth'
import { TOKEN_KEY, COLLEGE_DOMAIN_KEY } from '@/data/constant'
import { Departments, Organizations } from '@/api'
import {
  imgUploadOptions
} from '@/data/options'

// const uploadUrl = `${process.env.VUE_APP_BASE_API}${process.env.VUE_APP_API_PREFIX}/attachmentUpload`

const fetchDepartments = async params => {
  try {
    const { departments } = await Departments.getDepartments({
      ...params
    })
    return departments
  } catch (e) {
    return []
  }
}

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
  name: '用户名',
  password: '密码',
  email: '邮箱',
  mobile: '联系方式',
  avatar: '头像',
  targetId: '管理对象',
  targetType: '管理对象类型',
  role: '账号级别',
  organizationId: '管理机构',
  branchId: '管理支部'
}

export const tableColumns = [
  {
    prop: 'name',
    label: modelMap['name'],
    align: 'left',
    width: '200px'
  },
  {
    prop: 'targetType',
    label: modelMap['targetType']
  },
  {
    prop: 'mobile',
    label: modelMap['mobile']
  },
  {
    prop: 'email',
    label: modelMap['email']
  },
  ...commonColumns
]

export const memberFormDesc = {
  name: {
    label: modelMap.name,
    type: 'input',
    required: true,
    rules: [
      { max: 20, message: '用户名不得超过20个字符', trigger: 'change' }
    ]
  },
  // password: {
  //   label: modelMap.password,
  //   type: 'password',
  //   required: true,
  //   rules: [
  //     { max: 20, message: '密码不得超过20个字符', trigger: 'change' }
  //   ]
  // }
  mobile: {
    label: modelMap.mobile,
    type: 'input',
    rules: [
      // eslint-disable-next-line prefer-regex-literals
      { pattern: new RegExp(/^[1][3|4|5|6|7|8|9][0-9]{9}$/, ''), trigger: 'change', message: '请输入正确的手机号码' }
    ]
  },
  email: {
    label: modelMap.email,
    type: 'input',
    rules: [
      { max: 30, message: '邮箱不得超过30个字符', trigger: 'change' }
    ]
  },
  avatar: {
    label: modelMap.avatar,
    type: 'image-uploader',
    attrs: {
      ...imgUploadOptions,
      headers
    }
  },
  role: {
    label: modelMap.role,
    type: 'radio',
    options: ['机构', '支部']
  },
  organizationId: {
    label: modelMap.organizationId,
    type: 'select',
    required: true,
    vif (data) {
      return data.role === '机构'
    },
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
  branchId: {
    label: modelMap.branchId,
    type: 'select',
    required: true,
    vif (data) {
      return data.role === '支部'
    },
    prop: {
      text: 'name',
      value: 'id'
    },
    options: async data => {
      const list = await fetchDepartments({ pageNo: 1, pageSize: 100 })
      // 过滤出不为空的审核模板
      return list
    }

  }
}
