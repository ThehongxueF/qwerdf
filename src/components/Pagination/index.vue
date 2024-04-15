<!--
* 分页组件。
*
* 对el-pagination的封装
*
* @props
* total 总数
* page 当前页 使用page.sync
* limit 当前一页数量 使用limit.sync
* pageSizes 可选当前页数量数组
* layout 组件布局
* background 分页按钮背景色
* autoScroll 控制是否自动滚动到顶部
* hidden 控制显示与隐藏
*
* @emit
* pagination 分页动作 导出所需数据
-->
<template>
  <div :class="{'hidden':hidden}" class="pagination-container">
    <el-pagination
      :background="background"
      :current-page.sync="currentPage"
      :page-size.sync="pageSize"
      :layout="layout"
      :page-sizes="pageSizes"
      :total="total"
      v-bind="$attrs"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </div>
</template>

<script>
import { scrollTo } from '@/utils/scroll-to'

export default {
  name: 'Pagination',
  props: {
    total: {
      required: true,
      type: Number
    },
    pageNo: {
      type: Number,
      default: 1
    },
    limit: {
      type: Number,
      default: 20
    },
    pageSizes: {
      type: Array,
      default () {
        return [2, 5, 10, 20, 30, 50]
      }
    },
    layout: {
      type: String,
      default: 'total, sizes, prev, pager, next, jumper'
    },
    background: {
      type: Boolean,
      default: true
    },
    autoScroll: {
      type: Boolean,
      default: true
    },
    hidden: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    currentPage: {
      get () {
        return this.pageNo
      },
      set (val) {
        this.$emit('update:pageNo', val)
      }
    },
    pageSize: {
      get () {
        return this.limit
      },
      set (val) {
        this.$emit('update:limit', val)
      }
    }
  },
  methods: {
    handleSizeChange (val) {
      this.$emit('pagination', { pageNo: this.currentPage, limit: val })
      if (this.autoScroll) {
        scrollTo(0, 800)
      }
    },
    handleCurrentChange (val) {
      this.$emit('pagination', { pageNo: val, limit: this.pageSize })
      if (this.autoScroll) {
        scrollTo(0, 800)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.pagination-container {
  background: #fff;
  padding: 0 16px;

  ::v-deep {
    .el-pagination__editor.el-input > .el-input__inner {
      line-height: normal;
    }
  }
}
.pagination-container.hidden {
  display: none;
}
</style>
