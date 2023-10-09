import FollowNoteList from '@/components/common/FollowNoteList'
import StateVerify from '@/components/common/StateVerify'
import StateTag from '@/components/common/StateTag'
import TemplateStateVerify from '@/components/common/TemplateStateVerify'

export default {
  components: {
    FollowNoteList,
    StateVerify,
    StateTag,
    TemplateStateVerify
  },
  data () {
    return {
      labelStyle: { fontSize: '14px', color: '#666' },
      contentStyle: { fontSize: '14px', color: '#333', fontWeight: '500' },
      tempRoute: {}
    }
  },
  created () {
    this.tempRoute = Object.assign({}, this.$route)
  },
  computed: {
    id () {
      return this.$route.params.id
    }
  },
  methods: {
    setTagsViewTitle (title) {
      const route = Object.assign({}, this.tempRoute, { title })
      this.$store.dispatch('tagsView/updateVisitedView', route)
    },
    confirmRemove (next) {
      return new Promise((resolve, reject) => {
        this.$confirm('确定删除吗？', '警告', {
          type: 'warning',
          showClose: false,
          confirmButtonText: '删除',
          cancelButtonText: '取消',
          closeOnClickModal: false
        })
          .then(async () => {
            try {
              await next()
              resolve()
            } catch (e) {
              reject(e)
            }
          })
          .catch((action) => {
            if (action === 'cancel') {
              this.$message('已取消')
            }
          })
      })
    }
  }
}
