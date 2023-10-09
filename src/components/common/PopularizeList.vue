<!--
* 成果推广列表组件。
*
* @props
* targetId 对接目标id 必填
*
-->
<template>
  <div>
    <!-- 列表 -->
    <el-table
      v-loading="listLoading"
      :data="popularizeLogs"
      height="300"
      fit
      style="width: 100%;"
    >
      <el-empty slot="empty" :image-size="100" description="暂无数据" />
      <el-table-column
        type="index"
        label="序号"
        min-width="50"
      />
      <el-table-column
        v-slot="{ row }"
        prop="issuerOrg"
        label="推广供应商"
      >
        <span
          v-if="row.vendor"
        >{{ row.vendor.name }}</span>
        <i v-else>暂无</i>
      </el-table-column>
      <el-table-column
        v-slot="{ row }"
        prop="issuer"
        label="操作人"
      >
        <span
          v-if="row.operator"
          style="color: #247ae4;"
        >{{ row.operator.name }}</span>
        <i v-else>暂无</i>
      </el-table-column>
      <el-table-column
        v-slot="{ row }"
        prop="ways"
        label="推广状态"
      >
        <el-tag
          :type="row.state ? 'success' : 'warning'"
          plain
          size="small"
          style="margin: 4px;"
        >
          {{ row.state ? '成功' : '失败' }}
        </el-tag>
      </el-table-column>
      <el-table-column
        prop="createdAt"
        label="推广时间"
      />
    </el-table>
    <div class="page-container">
      <pagination
        v-show="total>0"
        :total="total"
        :page.sync="listQuery.page"
        :limit.sync="listQuery.perPage"
        @pagination="getList"
      />
    </div>
  </div>
</template>
<script>
import { listMixin } from '@/mixins'
// import { Achievement } from '@/api'

export default {
  name: 'PopularizeList',
  mixins: [listMixin],
  props: {
    targetId: {
      type: [String, Number],
      default: null,
      required: true
    }
  },
  data () {
    return {
      listQuery: {
        page: 1,
        perPage: 5
      },
      popularizeLogs: []
    }
  },
  mounted () {
    this.getList()
  },
  methods: {
    async getList () {
      // try {
      //   const params = {
      //     ...this.listQuery
      //   }
      //   const { results, count } = await Achievement.popularizeLogs(this.targetId, params)
      //   this.popularizeLogs = results
      //   this.total = count
      // } finally {
      //   this.listLoading = false
      // }
    }
  }
}
</script>
