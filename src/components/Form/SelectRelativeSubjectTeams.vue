<!--
* 表单选择组件。
*
* @props
* value 使用v-model
* placeholder 输入提示
*
* @emit
* on-search 搜索 导出所需数据 需回调
-->
<template>
  <el-select
    v-model="selected"
    multiple
    filterable
    remote
    reserve-keyword
    clearable
    :placeholder="placeholder"
    :remote-method="remoteMethod"
    :loading="loading"
    :disabled="disabled"
    @clear="initOptions"
  >
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value"
      :disabled="item.disabled"
    />
  </el-select>
</template>

<script>
import { userRoleMap } from '@/data/options'

export default {
  props: {
    value: {
      type: [String, Number, Array],
      default: ''
    },
    placeholder: {
      type: String,
      default: '请输入关键词检索'
    },
    disabled: {
      type: Boolean,
      default: false
    },
    changeServant: {
      type: Array,
      default: () => null
    }
  },
  data () {
    return {
      userRoleMap,
      list: [],
      options: [],
      loading: false
    }
  },
  computed: {
    selected: {
      get () {
        return this.value
      },
      set (val) {
        this.$emit('input', val)
      }
    }
  },
  watch: {
    changeServant: {
      handler (val) {
        if (val) {
          this.initOptions()
        }
      }
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
    remoteMethod (query) {
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
    display: inline-block;
    margin-right: 10px;
  }
}
</style>
