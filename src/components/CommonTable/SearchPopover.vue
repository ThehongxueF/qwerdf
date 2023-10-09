<!--
* 列筛选组件。
*
* @props
* searchLabel 筛选标签
* searchProp 筛选字段
* searchType 筛选类型
* searchOptions 筛选选项数组
* multiple 控制是否多选
*
* @emit
* clear 清空搜索
* search 搜索 导出所需数据 需回调
-->
<template>
  <el-popover
    trigger="click"
    width="350"
  >
    <slot :searchVal="searchVal" :change="changeSearchVal" :search="handleSearch">
      <template v-if="searchType === types.select">
        <el-select
          v-model="searchVal"
          placeholder="请选择"
          style="width: 100%"
          :multiple="multiple"
          clearable
          @change="handleSearch"
          @clear="handleClear(searchProp)"
        >
          <el-option
            v-for="(item, key) in searchOptions"
            :key="key"
            :label="item.label !== undefined ? item.label : item"
            :value="item.value !== undefined ? item.value : item"
          />
        </el-select>
      </template>
      <template v-else-if="searchType === types.date">
        <el-date-picker
          v-model="searchVal"
          type="datetimerange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          value-format="yyyy-MM-dd HH:mm:ss"
        />
      </template>
      <template v-else-if="searchType === types.area">
        <el-cascader
          v-model="searchVal"
          :options="areaOptions"
          :props="{
            checkStrictly: true,
            label: 'label',
            value: 'label'
          }"
          style="width: 100%"
          clearable
          @change="handleSearch"
          @clear="handleClear"
        />
      </template>
      <template v-else>
        <el-input v-model="searchVal" placeholder="请输入关键字" clearable @clear="handleClear" @keyup.enter.native="handleSearch" />
      </template>
    </slot>
    <el-button
      type="info"
      icon="el-icon-search"
      plain
      style="width: 100%;margin-top: 20px;"
      @click="handleSearch(searchProp)"
    >
      搜索
    </el-button>
    <span slot="reference" class="filter-icon">
      <svg-icon icon-class="filter" />
    </span>
  </el-popover>
</template>

<script>
import { regionData as areaOptions } from '@/data/area'

const types = {
  text: 'text',
  select: 'select',
  date: 'date',
  area: 'area'
}

export default {
  name: 'SearchPopover',
  props: {
    searchLabel: {
      type: String,
      default: ''
    },
    searchProp: {
      type: String,
      default: ''
    },
    searchType: {
      type: String,
      default: 'text'
    },
    searchOptions: {
      type: Array,
      default: () => []
    },
    multiple: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      types,
      areaOptions, // { value: '001000', label: '北京市' } => { value: '北京市', label: '北京市' }
      searchVal: ''
    }
  },
  methods: {
    changeSearchVal (val) {
      this.searchVal = val
    },
    handleSearch () {
      if (this.searchVal !== '') {
        if (Array.isArray(this.searchVal) && this.searchVal.length === 0) {
          this.$emit('clear', this.searchProp)
        } else {
          this.$emit('search', {
            prop: this.searchProp,
            label: this.searchLabel,
            value: this.searchVal
          }, () => {
            this.visible = false
            this.searchVal = ''
          })
        }
      }
    },
    handleClear () {
      this.$emit('clear', this.searchProp)
    }
  }
}
</script>

<style lang="scss" scoped>
.filter-icon {
  padding-left: 16px;
  cursor: pointer;
  float: right;
}
</style>
