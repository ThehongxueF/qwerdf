import { Local } from '@/utils/storage'
import { getToken } from '@/utils/auth'
import { TOKEN_KEY, COLLEGE_DOMAIN_KEY } from '@/data/constant'

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
  name: '名称',
  gender: '性别',
  post: '职务',
  age: '年龄',
  mobile: '联系方式',
  nature: '党员性质',
  politicalBirthday: '政治生日',
  standing: '党龄',
  branch: '所属支部',
  personalMessage: '个人寄语',
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
  {
    prop: 'age',
    label: modelMap['age']
  },
  {
    prop: 'mobile',
    label: modelMap['mobile']
  },
  {
    prop: 'nature',
    label: modelMap['nature']
  },
  {
    prop: 'politicalBirthday',
    label: modelMap['politicalBirthday']
  },
  {
    prop: 'standing',
    label: modelMap['standing']
  },
  {
    prop: 'branch',
    label: modelMap['branch']
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
  age: {
    label: modelMap.age,
    type: 'input',
    required: true,
    rules: [
      { max: 10, message: '年龄不得超过10个字符', trigger: 'change' }
    ]
  },
  mobile: {
    label: modelMap.mobile,
    type: 'input',
    required: true,
    rules: [
      // eslint-disable-next-line prefer-regex-literals
      { pattern: new RegExp(/^[1][3|4|5|6|7|8|9][0-9]{9}$/, ''), trigger: 'change', message: '请输入正确的手机号码' }
    ]
  },
  nature: {
    label: modelMap.nature,
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
  politicalBirthday: {
    label: modelMap.politicalBirthday,
    type: 'date',
    required: true,
    attrs: {
      placeholder: '请选择日期',
      format: 'yyyy-MM-dd',
      valueFormat: 'yyyy-MM-dd'
    }
  },
  standing: {
    label: modelMap.standing,
    type: 'input',
    required: true,
    rules: [
      { max: 10, message: '党龄不得超过10个字符', trigger: 'change' }
    ]
  },
  branch: {
    label: modelMap.branch,
    type: 'select',
    required: true,
    prop: {
      text: 'title',
      value: 'id'
    },
    options: [{
      id: 1,
      title: '支部一'
    },
    {
      id: 2,
      title: '支部二'
    }]
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

