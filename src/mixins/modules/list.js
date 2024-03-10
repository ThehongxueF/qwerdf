import { flattenTags } from '@/utils/tags'
import waves from '@/directive/waves' // waves directive
import TagsFilter from '@/components/Filters/TagsFilter.vue'
import FilterPanel from '@/components/CommonTable/FilterPanel'
import CommonTable from '@/components/CommonTable'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination

export default {
  components: { TagsFilter, FilterPanel, CommonTable, Pagination },
  directives: { waves },
  data () {
    return {
      flattenTags,
      showMoreFilters: false,
      listQuery: {
        pageNo: 1,
        pageSize: 10
      },
      list: [],
      listLoading: true,
      fieldLoading: false,
      total: 0,
      showColumns: [],
      columns: [],
      fieldQuery: {},
      downloadLoading: false,
      rejectData: {},
      rejectFormDesc: {
        rejectReason: {
          type: 'textarea',
          label: '拒绝理由',
          required: true
        }
      },
      multipleSelection: [],
      showSelection: false
    }
  },
  watch: {
    showColumns: {
      deep: true,
      immediate: true,
      handler (val, oldVal) {
        this.columns = this.originColumns && this.originColumns.filter(item => val.includes(item.prop))
      }
    },
    'listQuery.page': {
      handler (val) {
        const query = this.$route.query
        this.$router.replace({
          query: { ...query, page: val }
        })
      }
    }
  },
  created () {
    const query = this.$route.query
    const { page } = query
    if (page) {
      this.listQuery.page = parseInt(page)
      this.$router.replace({
        query: { ...query, page }
      })
    }
    this.showColumns = this.originColumns && this.originColumns.filter(item => !item.hidden).map(item => item.prop)
  },
  activated () {
  },
  methods: {
    resetSearch () {
      this.$router.replace({
        query: { }
      })
      this.listQuery.page = 1
      this.fieldQuery = {}
      this.getList()
    },
    fieldSearch (query) {
      this.fieldQuery = { ...query }
      this.listQuery.page = 1
      this.getList()
    },
    async handleFieldSearch () {
      this.fieldLoading = true
      this.listQuery.page = 1
      try {
        await this.getList()
      } finally {
        this.fieldLoading = false
      }
    },
    async handleSearch (query = {}) {
      this.listQuery.page = 1
      this.listQuery = { ...this.listQuery, ...query }
      await this.getList()
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
