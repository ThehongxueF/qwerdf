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
  title: '单位名称',
  contact: '联系人',
  mobile: '联系方式',
  branchCount: '支部数量',
  endTime: '账号有效期',
  address: '单位地址',
  account: '单位账号',
  password: '单位密码'
}

export const tableColumns = [
//   {
//     prop: 'id',
//     label: modelMap['id']
//   },
  {
    prop: 'title',
    label: modelMap['title'],
    align: 'left'
  },
  {
    prop: 'contact',
    label: modelMap['contact']
  },
  {
    prop: 'mobile',
    label: modelMap['mobile']
  },
  {
    prop: 'branchCount',
    label: modelMap['branchCount']
  },
  {
    prop: 'endTime',
    label: modelMap['endTime']
  },
  ...commonColumns
]

export const unitFormDesc = {
  title: {
    label: modelMap.title,
    type: 'input',
    required: true,
    rules: [
      { max: 50, message: '单位名称不得超过50个字符', trigger: 'change' }
    ]
  },
  address: {
    label: modelMap.address,
    type: 'input',
    required: true,
    rules: [
      { max: 50, message: '单位地址不得超过50个字符', trigger: 'change' }
    ]
  },
  contact: {
    label: modelMap.contact,
    type: 'input',
    required: true,
    rules: [
      { max: 20, message: '联系人姓名不得超过20个字符', trigger: 'change' }
    ]
  },
  mobile: {
    label: modelMap.mobile,
    type: 'input',
    required: true,
    rules: [
      { max: 20, message: '联系方式不得超过20个字符', trigger: 'change' }
    ]
  },
  endTime: {
    label: modelMap.endTime,
    type: 'input',
    required: true,
  },
  account: {
    label: modelMap.account,
    type: 'input',
    required: true,
    rules: [
      { max: 20, message: '账号不得超过20个字符', trigger: 'change' }
    ]
  },
  password: {
    label: modelMap.password,
    type: 'password',
    required: true,
    rules: [
      { max: 20, message: '密码不得超过20个字符', trigger: 'change' }
    ]
  }
}
