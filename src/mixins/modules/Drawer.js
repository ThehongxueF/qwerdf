/*
  该 mixins 配合 el-drawer 使用
  在混入的组件中，必需的有以下几点要求：
    1. 组件 EleFormDrawer 存在
    2. openDrawer 方法存在, 字段分别是： data (传入的数据), map (form 表格抽象 JSON), title (抽屉的标题)
  注意！
    1. 组件中的 data 中不可 也无须创建字段 drawerVisible | drawerTitle
*/
import { cloneDeep } from 'lodash'

export default {
  data: () => ({
    drawerOption: {
      data: {},
      map: {},
      rules: {}
    },
    drawerVisible: false,
    drawerTitle: '标题'
  }),
  methods: {
    openDrawer ({ data, map, rules, title, fnc }) {
      this.drawerVisible = true
      this.$nextTick().then(() => {
        const cloneDeepData = cloneDeep(data)
        /* if (cloneDeepData.location && cloneDeepData.location.length) {
          cloneDeepData.location = cloneDeepData.location.map(item => TextToCode[item].code)
        } */
        this.drawerTitle = title
        this.drawerOption.data = cloneDeepData
        this.drawerOption.map = map
        this.drawerOption.rules = rules
        fnc && fnc({ data, map, rules, title })
      })
    },
    async updateDetails (data) {
      try {
        const resData = await this.updateAPI(data.id, data)
        this.resData = resData
        this.drawerVisible = false
        this.$message.success('更新成功')
      } catch ({ message = '更新出错' }) {
        this.$message.error(message)
      }
    }
  }
}
