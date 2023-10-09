<!--
* 表格搜索组件。
*
* @props
* showCount 控制总计数据显示与隐藏
* showSearch 控制搜索显示与隐藏
* searchProp 默认搜索数据
* showCreate 控制新建显示与隐藏
* createText 新建按钮文案
* placeholder 搜索提示文案
* showExport 控制导出显示与隐藏
* showFieldCheck 控制显示字段显示与隐藏
* total 数据总数
* columns 字段数组
* showColumns 显示字段数组 使用showColumns.sync
* fieldQuery 搜索数据
* showBatch 控制批量处理显示与隐藏
* showBatchAccepted 控制批量通过显示与隐藏
* showBatchRejected 控制批量拒绝显示与隐藏
* showBatchPublished 控制批量上线显示与隐藏
* showBatchUnPublished 控制批量下线显示与隐藏
* showBatchBack 控制批量回退显示与隐藏
* showBatchVerifing 控制批量开始审核显示与隐藏
*
* @emit
* on-search 搜索 导出所需数据
* update:showColumns
* on-create 新建
* on-selection 批量处理展开
* on-batch 批量处理 传入类型 需回调
-->
<template>
  <div class="filter-container">
    <div class="filter-container__head">
      <el-alert
        v-if="showCount"
        :closable="false"
      >
        <span slot="title">
          总计 <b style="color: #409EFF">{{ total }}</b> 条数据
        </span>
      </el-alert>

      <!-- 显示字段 -->
      <el-popover
        v-if="showFieldCheck"
        placement="bottom"
        trigger="click"
        width="200"
      >
        <el-checkbox-group v-model="checkColumns" @change="handleColumnsChange">
          <el-row>
            <el-col v-for="(column, index) in columns" :key="index">
              <el-checkbox :label="column.prop" style="margin-bottom: 5px;">{{ column.label }}</el-checkbox>
            </el-col>
          </el-row>
        </el-checkbox-group>
        <el-button
          slot="reference"
          type="text"
          style="margin-left: 20px;"
        >
          <i class="el-icon-setting" />
          显示字段
        </el-button>
      </el-popover>
    </div>

    <template v-if="showSearch">
      <el-input
        v-model="keyword"
        :placeholder="placeholder"
        style="width: 300px; margin-right: 10px;"
        clearable
        class="filter-item"
        @keyup.enter.native="handleSearch"
        @clear="handleSearch"
      />
      <el-button v-waves class="filter-item" type="info" icon="el-icon-search" @click="handleSearch">
        搜索
      </el-button>
    </template>

    <el-button v-if="showCreate" v-waves class="filter-item" type="primary" icon="el-icon-plus" @click="handleCreate">
      {{ createText }}
    </el-button>

    <!-- <el-button v-if="showBatch&&!showBatchAudit" v-waves class="filter-item" type="primary" @click="handleSelection">
      批量处理
    </el-button> -->

    <template v-if="showBatchAudit">
      <el-button v-if="showBatchVerifing" v-waves class="filter-item" type="primary" @click="handleBatch('verifing')">
        批量开始审核
      </el-button>
      <el-button v-if="showBatchAccepted" v-waves class="filter-item" type="success" @click="handleBatch('accepted')">
        批量通过
      </el-button>
      <el-button v-if="showBatchRejected" v-waves class="filter-item" type="danger" @click="handleBatch('rejected')">
        批量拒绝
      </el-button>
      <el-button v-if="showBatchBack" v-waves class="filter-item" type="warning" @click="handleBatch('back')">
        批量回退
      </el-button>
      <el-button v-if="showBatchPublished" v-waves class="filter-item" type="success" @click="handleBatch('published')">
        批量上线
      </el-button>
      <el-button v-if="showBatchUnPublished" v-waves class="filter-item" type="danger" @click="handleBatch('unPublished')">
        批量下线
      </el-button>
      <el-button v-waves class="filter-item" @click="handleBatch('cancel')">
        取消批量操作
      </el-button>
    </template>

    <!-- <el-button
      v-if="showExport"
      v-waves
      :loading="downloadLoading"
      class="filter-item"
      type="success"
      icon="el-icon-download"
      @click="handleDownload"
    >
      导出
    </el-button> -->

    <slot name="extra" />
    <el-row v-if="fieldQueryTags.length" style="margin: 5px 0;">
      <el-col>
        <span style="font-size: 14px;color: #666;">搜索条件：</span>
        <el-tag
          v-for="(item, index) in fieldQueryTags"
          :key="index"
          type="info"
          closable
          style="margin-right: 4px"
          @close="handleSearchTagClose(item.key)"
        >
          {{ item.value }}
        </el-tag>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import waves from '@/directive/waves' // waves directive

export default {
  name: 'FilterPanel',
  directives: { waves },
  props: {
    showCount: {
      type: Boolean,
      default: true
    },
    showSearch: {
      type: Boolean,
      default: true
    },
    searchProp: {
      type: String,
      default: 'text'
    },
    showCreate: {
      type: Boolean,
      default: true
    },
    createText: {
      type: String,
      default: '新增'
    },
    placeholder: {
      type: String,
      default: '请输入关键词'
    },
    showExport: {
      type: Boolean,
      default: true
    },
    showFieldCheck: {
      type: Boolean,
      default: true
    },
    total: {
      type: Number,
      default: 0
    },
    columns: {
      type: Array,
      default: () => []
    },
    showColumns: {
      type: Array,
      default: () => []
    },
    fieldQuery: {
      type: Object,
      default: () => {}
    },
    showBatch: {
      type: Boolean,
      default: false
    },
    showBatchAccepted: {
      type: Boolean,
      default: false
    },
    showBatchRejected: {
      type: Boolean,
      default: false
    },
    showBatchPublished: {
      type: Boolean,
      default: false
    },
    showBatchUnPublished: {
      type: Boolean,
      default: false
    },
    showBatchBack: {
      type: Boolean,
      default: false
    },
    showBatchVerifing: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      downloadLoading: false,
      checkColumns: [],
      keyword: '',
      fieldQueryTags: [],
      showBatchAudit: false
    }
  },
  created () {
    this.checkColumns = [...this.showColumns]
  },
  methods: {
    handleSearch () {
      const query = { [this.searchProp]: this.keyword, ...this.fieldQuery }
      this.$emit('on-search', query)
    },
    handleColumnsChange (columns) {
      this.$emit('update:showColumns', columns)
    },
    handleCreate () {
      this.$emit('on-create')
    },
    handleSelection () {
      this.showBatchAudit = true
      this.$emit('on-selection')
    },
    handleBatch (type) {
      this.$emit('on-batch', type, () => {
        if (type === 'cancel') {
          this.showBatchAudit = false
        }
      })
    },
    handleDownload () {
      this.$message('正在开发中，如确有需要请联系信息中心')
    }
  }
}
</script>

<style lang="scss" scoped>
.filter-container {
  &__head {
    margin-bottom: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
