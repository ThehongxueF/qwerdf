import { Local } from '@/utils/storage'
import { getToken } from '@/utils/auth'
import { TOKEN_KEY, COLLEGE_DOMAIN_KEY } from '@/data/constant'
import { Departments } from '@/api'
import {
  imgUploadOptions
} from '@/data/options'

const uploadUrl = `${process.env.VUE_APP_BASE_API}${process.env.VUE_APP_API_PREFIX}/attachmentUpload`

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
  name: '名称',
  email: '邮箱',
  gender: '性别',
  avatar: '头像',
  post: '职务',
  age: '年龄',
  degree: '学历',
  mobile: '联系方式',
  memberType: '党员性质',
  birthday: '政治生日',
  politicalDay: '入党时间',
  department: '所属支部',
  departmentId: '所属支部',
  // personalMessage: '个人寄语',
  experience: '工作经历',
  attachmentIds: '相关文件'
}

export const tableColumns = [
  {
    prop: 'name',
    label: modelMap['name'],
    align: 'left',
    width: '200px'
  },
  {
    prop: 'gender',
    label: modelMap['gender']
  },
  {
    prop: 'post',
    label: modelMap['post']
  },
  // {
  //   prop: 'age',
  //   label: modelMap['age']
  // },
  {
    prop: 'mobile',
    label: modelMap['mobile']
  },
  {
    prop: 'memberType',
    label: modelMap['memberType']
  },
  {
    prop: 'politicalDay',
    label: modelMap['politicalDay']
  },
  {
    prop: 'department',
    label: modelMap['department']
  },
  ...commonColumns
]

export const memberFormDesc = {
  name: {
    label: modelMap.name,
    type: 'input',
    required: true,
    rules: [
      { max: 20, message: '名称不得超过20个字符', trigger: 'change' }
    ]
  },
  gender: {
    label: modelMap.gender,
    type: 'select',
    required: true,
    options: ['男性', '女性']
  },
  post: {
    label: modelMap.post,
    type: 'input',
    required: true,
    rules: [
      { max: 20, message: '职位不得超过20个字符', trigger: 'change' }
    ]
  },
  // age: {
  //   label: modelMap.age,
  //   type: 'input',
  //   required: true,
  //   rules: [
  //     { max: 10, message: '年龄不得超过10个字符', trigger: 'change' }
  //   ]
  // },
  mobile: {
    label: modelMap.mobile,
    type: 'input',
    required: true,
    rules: [
      // eslint-disable-next-line prefer-regex-literals
      { pattern: new RegExp(/^[1][3|4|5|6|7|8|9][0-9]{9}$/, ''), trigger: 'change', message: '请输入正确的手机号码' }
    ]
  },
  email: {
    label: modelMap.email,
    type: 'input',
    required: true,
    rules: [
      { max: 10, message: '邮箱不得超过30个字符', trigger: 'change' }
    ]
  },
  memberType: {
    label: modelMap.memberType,
    type: 'select',
    required: true,
    options: [
      {
        text: '党员',
        value: true
      },
      {
        text: '发展中党员',
        value: false
      }
    ]
  },
  birthday: {
    label: modelMap.birthday,
    type: 'date',
    required: true,
    attrs: {
      placeholder: '请选择日期',
      format: 'yyyy-MM-dd',
      valueFormat: 'yyyy-MM-dd'
    }
  },
  politicalDay: {
    label: modelMap.politicalDay,
    type: 'date',
    required: true,
    attrs: {
      placeholder: '请选择日期',
      format: 'yyyy-MM-dd',
      valueFormat: 'yyyy-MM-dd'
    }
  },
  experience: {
    label: modelMap.experience,
    type: 'textarea',
    required: true
  },
  departmentId: {
    label: modelMap.departmentId,
    type: 'select',
    required: true,
    prop: {
      text: 'name',
      value: 'id'
    },
    options: async data => {
      const list = await fetchDepartments({ pageNo: 1, pageSize: 100 })
      // 过滤出不为空的审核模板
      return list
    }
  },
  avatar: {
    label: modelMap.avatar,
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

