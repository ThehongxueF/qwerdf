import { cloneDeep } from 'lodash'
// import { TextToCode } from '@/data/area'

export default {
  data: () => ({
    dialogOption: {
      data: {},
      map: {}
    },
    dialogVisible: false,
    dialogTitle: '标题'
  }),
  methods: {
    openDialog (data, map, title, fnc) {
      this.dialogVisible = true
      this.$nextTick().then(() => {
        const cloneDeepData = cloneDeep(data)
        this.dialogTitle = title
        this.dialogOption.data = cloneDeepData
        this.dialogOption.map = map
        fnc && fnc(data, map, title)
      })
    }
  }
}
