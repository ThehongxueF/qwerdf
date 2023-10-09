import { flattenTags } from '@/utils/tags'

export default {
  data () {
    return {
      flattenTags,
      dialogFormLoading: false,
      dialogFormVisible: false,
      formData: {},
      dialogAttrs: {
        'top': '100px',
        'append-to-body': true,
        'before-close': this.handleClose
      },
      formAttrs: {
      }
    }
  },
  methods: {
    handleCreate () {
      this.formData = {}
      this.dialogFormVisible = true
    },
    handleCreateSuccess () {
      this.dialogFormLoading = false
      this.dialogFormVisible = false
      this.$message.success('提交成功')
      this.resetSearch()
    },
    handleBeforeClose () {
      this.handleClose(() => {
        this.dialogFormVisible = false
      })
    },
    handleClose (done) {
      this.$confirm('注意：放弃编辑，将不会保存此次修改内容！', '警告', {
        type: 'warning',
        showClose: false,
        confirmButtonText: '继续编辑',
        cancelButtonText: '放弃编辑',
        closeOnClickModal: false
      })
        .then(() => {
        })
        .catch((action) => {
          if (action === 'cancel') {
            done()
          }
        })
    }
  }
}
