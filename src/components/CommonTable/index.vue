<!--
* 表格渲染组件。
*
* @props
* initFields 初始列筛选值
* loading 表格loading
* showCheck 多选框
* columns 字段数据
* data 表格数据
*
* @emit
* field-search 列筛选
-->
<template>
  <div>
    <div v-if="fields && fields.length" class="query-container">
      <el-card shadow="never">
        <!-- <div slot="header">
          <span>筛选条件</span>
        </div> -->
        <div v-for="(item, index) in fields" :key="index" class="query-item">
          <span class="label">{{ item.label }}：</span>
          <el-tag effect="plain" type="info" closable class="tag" @close="handleQueryTagClose(index)">
            <template v-if="Array.isArray(item.value)">
              {{ item.value.join(' ') }}
            </template>
            <template v-else-if="item.prop === 'online' ">
              {{ item.value ? '上线' : '下线' }}
            </template>
            <template v-else-if="item.prop === 'highTechnology' ">
              {{ item.value ? '高企' : '非高企' }}
            </template>
            <template v-else-if="item.prop === 'state' ">
              <template v-if="item.label === '对接状态' ">
                {{ item.value | dockingStateFilter }}
              </template>
              <template v-else>
                {{ item.value | stateFilter }}
              </template>
            </template>
            <template v-else-if="item.prop === 'visible' ">
              {{ item.value ? '显示' : '隐藏' }}
            </template>
            <template v-else-if="item.prop === 'role' ">
              {{ item.value | roleNameFilter }}
            </template>
            <template v-else-if="typeof item.value === 'boolean' ">
              {{ item.value ? '是' : '否' }}
            </template>
            <template v-else>
              {{ item.value }}
            </template>
          </el-tag>
        </div>
      </el-card>
    </div>
    <el-table
      ref="commonTable"
      v-loading="loading"
      v-bind="$attrs"
      :data="data"
      fit
      highlight-current-row
      style="width: 100%"
      :row-key="row=>row.id"
      v-on="$listeners"
      @selection-change="handleSelectionChange"
    >
      <!-- empty -->
      <el-empty slot="empty" :image-size="100" description="暂无数据" />
      <el-table-column
        v-if="showCheck"
        fixed
        type="selection"
        width="50"
        align="center"
        :reserve-selection="true"
      />
      <el-table-column
        type="index"
        width="50"
        align="left"
      >
        <template v-slot="{ $index }">
          <i>{{ $index + 1 }}</i>
        </template>
      </el-table-column>
      <el-table-column
        v-for="col in columns"
        :key="col.prop"
        :prop="col.prop"
        :label="col.label"
        :width="col.width"
        :min-width="col.minWidth"
        :fixed="col.fixed"
        :align="col.align || 'center'"
        :show-overflow-tooltip="!col.hiddenToolTip"
      >
        <template slot="header">
          <template v-if="col.search" class="search-cell">
            <span>{{ col.label }}</span>
            <SearchPopover
              ref="popover"
              :search-label="col.label"
              :search-prop="col.searchProp || col.prop"
              :search-type="col.searchType"
              :search-options="col.searchOptions"
              :multiple="col.multiple"
              @search="handleSearch"
              @clear="handleClear"
            >
              <template slot-scope="{ searchVal, change, search }">
                <slot
                  :name="`${col.prop}-search`"
                  :searchVal="searchVal"
                  :change="change"
                  :search="search"
                />
              </template>
            </SearchPopover>
          </template>
          <template v-else>
            {{ col.label }}
          </template>
        </template>
        <template slot-scope="{ row, $index }">
          <slot :name="col.prop" :row="row" :index="$index">
            {{ row[col.prop] }}
          </slot>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { stateMap, dockingStateMap } from '@/data/options'
import SearchPopover from './SearchPopover'

export default {
  name: 'CommonTable',
  components: { SearchPopover },
  filters: {
    roleNameFilter (role) {
      const roleMap = {
        staff: '集团员工',
        branch: '分子公司管理员',
        admin: '平台管理员'
      }
      return roleMap[role]
    },
    stateFilter (state) {
      const map = {
        ...stateMap,
        '对接中': {
          text: '对接中'
        },
        '已对接': {
          text: '已对接'
        }
      }
      return (map[state] && map[state].text) || state
    },
    dockingStateFilter (state) {
      const map = {
        ...dockingStateMap,
        对接中: {
          text: '对接中'
        },
        已对接: {
          text: '已对接'
        }
      }
      return (map[state] && map[state].text) || state
    }
  },
  props: {
    initFields: {
      type: Array,
      default: () => []
    },
    loading: {
      type: Boolean,
      default: false
    },
    showCheck: {
      type: Boolean,
      default: false
    },
    columns: {
      type: Array,
      default: () => []
    },
    data: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      fields: [],
      query: {}
    }
  },
  watch: {
    fields: {
      deep: true,
      handler (val) {
        const query = {}
        val.forEach(item => {
          query[item.prop] = item.value
        })
        this.$emit('field-search', query)
      }
    },
    columns: {
      deep: true,
      handler () {
        this.$refs['commonTable'] && (this.$refs['commonTable'].doLayout()) // 重新布局
      }
    },
    showCheck: {
      handler (val) {
        val & this.$refs.commonTable.clearSelection()
      }
    }
  },
  methods: {
    handleSelectionChange (selectData) {
      this.$emit('on-selection-change', selectData)
    },
    handleSearch (obj, cb) {
      const index = this.fields.findIndex(item => item.prop === obj.prop)
      index === -1 ? this.fields.push(obj) : this.fields.splice(index, 1, obj)
      this.query[obj.prop] = obj.value
      cb()
    },
    handleClear (key) {
      this.$delete(this.query, key)
      const index = this.fields.findIndex(item => item.prop === key)
      this.fields.splice(index, 1)
    },
    handleQueryTagClose (index) {
      this.$delete(this.query, this.fields[index].prop)
      this.fields.splice(index, 1)
    }
  }
}
</script>

<style lang="scss" scoped>
.query-container {
  margin-bottom: 10px;
  .query-item {
    margin-right: 20px;
    display: inline-flex;
    justify-content: space-between;
    align-items: center;
    .label {
      font-size: 14px;
      color: #666;
    }
  }
}
.search-cell {
  display: inline-flex;
  align-items: center;
}
</style>
