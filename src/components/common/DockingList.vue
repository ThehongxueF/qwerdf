<!--
* 对接列表组件。
*
* @props
* targetId 对接目标id 必填
* targetType 对接目标类型 必填
*
-->
<template>
  <div>
    <!-- 列表 -->
    <el-table
      v-loading="listLoading"
      :data="dockings"
      height="300"
      fit
      style="width: 100%;"
    >
      <el-empty slot="empty" :image-size="100" description="暂无数据" />
      <el-table-column
        v-slot="{ row }"
        prop="issuerOrg"
        label="对接企业"
      >
        <span v-if="row.issuer">
          <span
            v-if="row.issuer.role === ROLE.EXPERT"
          >
            {{ row.issuer.organizationUnits && row.issuer.organizationUnits.map(item => item.name).join(' ') }}</span>
          <span
            v-else-if="row.issuer.role === ROLE.ENTERPRISE_PERSON"
          >{{ row.issuer.organization }}</span>
        </span>
        <i v-else>暂无</i>
      </el-table-column>
      <el-table-column
        v-slot="{ row }"
        prop="issuer"
        label="对接人"
      >
        <span
          v-if="row.issuer"
          style="color: #247ae4;"
        >{{ row.issuer.name }}</span>
        <i v-else>暂无</i>
      </el-table-column>
      <el-table-column
        v-slot="{ row }"
        prop="ways"
        label="对接方式"
      >
        <el-tag
          v-for="way in row.ways"
          :key="way"
          :type="way === '聊天' ? 'success' : 'warning'"
          plain
          size="small"
          style="margin: 4px;"
        >
          <i :class="way === '聊天' ? 'el-icon-chat-round' : 'el-icon-phone'" />
          {{ way }}
        </el-tag>
      </el-table-column>
      <el-table-column
        prop="createdAt"
        label="对接时间"
      />
    </el-table>
    <div class="page-container">
      <pagination
        v-show="total>0"
        :total="total"
        :page-no.sync="listQuery.pageNo"
        :limit.sync="listQuery.pageSize"
        @pagination="getList"
      />
    </div>
  </div>
</template>
<script>
import { listMixin } from '@/mixins'
import { Docking } from '@/api'
import { ROLE } from '@/data/constant'

export default {
  name: 'DockingList',
  mixins: [listMixin],
  props: {
    targetId: {
      type: [String, Number],
      default: null,
      required: true
    },
    targetType: {
      type: String,
      default: null,
      required: true
    }
  },
  data () {
    return {
      ROLE,
      listQuery: {
        pageNo: 1,
        pageSize: 5
      },
      dockings: []
    }
  },
  mounted () {
    this.getList()
  },
  methods: {
    async getList () {
      try {
        const params = {
          ...this.listQuery,
          targetId: this.targetId,
          targetType: this.targetType
        }
        const { dockings, count } = await Docking.getDockingsOfTarget(params)
        this.dockings = dockings
        this.total = count
      } finally {
        this.listLoading = false
      }
    }
  }
}
</script>
