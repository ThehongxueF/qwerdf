<!--
* 技术经纪人选择组件。
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
    style="width: 100%; margin-bottom: 10px;"
    :disabled="disabled"
    @clear="initOptions"
    @change="changeValue"
  >
    <el-option
      v-for="(item, index) in formatOptions"
      :key="index"
      :label="item.label"
      :value="item.value"
      :disabled="item.disabled"
    >
      <div class="select-item">
        <span class="info-item">{{ item.label }}</span>
        <span v-if="item.data" class="info-item">
          <span v-if="item.data.team" class="info-item">
            <el-tag type="info" size="mini" effect="plain">
              团队：{{ item.data.team.label }}
            </el-tag>
          </span>
          <el-avatar :src="item.data.headImageUrl" :size="24" class="ml10 mr10" />
          <span class="info-item"> <i>{{ item.data.username }}</i></span>
          <span class="info-item">{{ item.data.mobile }}</span>
        </span>
      </div>
    </el-option>
  </el-select>
</template>

<script>
import { cloneDeep } from 'lodash'
import { userRoleMap } from '@/data/options'

export default {
  props: {
    value: {
      type: [String, Array],
      default: ''
    },
    placeholder: {
      type: String,
      default: '请输入关键词检索'
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      userRoleMap,
      options: [],
      separator: '-',
      loading: false
    }
  },
  computed: {
    selected: {
      get () {
        if (!this.value) return ''
        return this.value.join(this.separator)
      },
      set (val) {
        this.$emit('input', val && val.split(this.separator))
      }
    },
    formatOptions () {
      const results = []
      this.options.forEach(option => {
        if (option.children && option.children.length) {
          option.children.forEach(child => {
            const _option = cloneDeep(option)
            _option.value = `${_option.value}${this.separator}${child.value}` // 组合键
            _option.data.team = child
            results.push(_option)
            delete _option.children
          })
        } else {
          const _option = cloneDeep(option)
          _option.disabled = true
          delete _option.children
          results.push(_option)
        }
      })
      return results
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
    },
    changeValue () {
      this.$emit('on-change')
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
