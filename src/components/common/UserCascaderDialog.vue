<!--
* 技术经纪人选择弹窗组件。
*
* @props
* title 标题
*
* @emit
* on-search 搜索角色列表 导出搜索数据 需回调
* on-confirm 确认 导出选择用户 需回调
*
-->
<template>
  <span>
    <span @click="dialogVisible = true">
      <slot>
        <el-button type="primary">新增</el-button>
      </slot>
    </span>
    <!-- 弹窗 -->
    <el-dialog
      :title="title"
      :visible.sync="dialogVisible"
      width="800px"
      modal-append-to-body
      append-to-body
    >
      <slot name="extra" />

      <el-select
        v-model="value"
        filterable
        remote
        reserve-keyword
        placeholder="请输入姓名检索"
        :remote-method="remoteSearch"
        :loading="loading"
        style="width: 100%; margin-bottom: 10px;"
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
      <span slot="footer" class="dialog-footer">
        <el-button
          @click="dialogVisible = false"
        >取 消</el-button>
        <el-button
          :loading="confirmLoading"
          type="primary"
          @click="handleConfirm"
        >确 定</el-button>
      </span>
    </el-dialog>
  </span>
</template>

<script>
import { cloneDeep } from 'lodash'
import { userRoleMap } from '@/data/options'

export default {
  name: 'UserCascaderDialog',
  props: {
    title: {
      type: String,
      default: '选择人员'
    }
  },
  data () {
    return {
      userRoleMap,
      dialogVisible: false,
      options: [],
      value: null,
      separator: '-',
      loading: false,
      confirmLoading: false
    }
  },
  computed: {
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
  watch: {
    dialogVisible (val) {
      if (val) {
        this.initOptions()
      }
    }
  },
  methods: {
    initOptions () {
      this.loading = true
      this.$emit('on-search', '', list => {
        this.loading = false
        this.options = list
      })
    },
    remoteSearch (text) {
      this.loading = true
      this.$emit('on-search', { text }, list => {
        this.loading = false
        this.options = list
      })
    },
    handleConfirm () {
      if (!this.value) return
      this.confirmLoading = true
      const data = this.value.split(this.separator)
      this.$emit('on-confirm', data, () => {
        this.confirmLoading = false
        this.dialogVisible = false
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.select-item {
  display: flex;
  .info-item {
    min-width: 100px;
    display: inline-flex;
    align-items: center;
    margin-right: 10px;
  }
}
</style>

