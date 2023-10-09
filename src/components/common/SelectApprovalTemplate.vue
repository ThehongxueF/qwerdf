<!--
* 审批模板选择组件。
*
* @props
* value 选择技术经纪人 使用v-model
*
* @emit
* on-search 搜索角色列表 导出搜索数据 需回调
*
-->
<template>

  <el-select
    v-model="selected"
    filterable
    remote
    reserve-keyword
    :placeholder="placeholder"
    :remote-method="remoteSearch"
    :loading="loading"
    clearable
    style="width: 100%; margin-bottom: 10px;"
    @clear="initOptions"
  >
    <el-option
      v-for="(item, index) in formatOptions"
      :key="index"
      :label="item.title"
      :value="item.id"
      :disabled="!item.enable"
    />
  </el-select>
</template>

<script>

export default {
  props: {
    value: {
      type: [String, Number],
      default: ''
    },
    placeholder: {
      type: String,
      default: '请输入关键词检索'
    }
  },
  data () {
    return {
      options: [],
      loading: false
    }
  },
  computed: {
    selected: {
      get () {
        if (!this.value) return ''
        return this.value
      },
      set (val) {
        this.$emit('input', val)
      }
    },
    formatOptions () {
      return this.options
    }
  },
  created () {
    this.initOptions()
  },
  methods: {
    initOptions () {
      this.loading = true
      this.$emit('on-search', '', list => {
        this.loading = false
        this.options = list
      })
    },
    remoteSearch (query) {
      if (query) {
        this.loading = true
        this.$emit('on-search', query, list => {
          this.loading = false
          this.options = list
        })
      } else {
        this.initOptions()
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.select-item {
  display: flex;
  .info-item {
    min-width: 120px;
    display: inline-flex;
    align-items: center;
    margin-right: 10px;
  }
}
</style>
