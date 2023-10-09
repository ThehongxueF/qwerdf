export default {
  data () {
    return {
      drawerFormVisible: false,
      drawerAttrs: {
        'before-close': this.handleClose
      },
      formData: {}
    }
  },
  methods: {
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
