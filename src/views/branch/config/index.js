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

