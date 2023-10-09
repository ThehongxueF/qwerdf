<!--
* 通用用户选择弹窗组件。
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
    <span @click="() => { !disabled ? dialogVisible = true : '' }">
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
          v-for="(item, index) in options"
          :key="index"
          :label="item.label"
          :value="item.value"
        >
          <div class="select-item">
            <span v-if="item.data" class="info-item">
              <el-tag type="info" size="mini" effect="dark">
                {{ userRoleMap[item.data.role] }}
              </el-tag>
            </span>
            <span class="info-item">{{ item.label }}</span>
            <span v-if="item.data" class="info-item"> <i>{{ item.data.username }}</i></span>
            <span v-if="item.data" class="info-item">{{ item.data.mobile }}</span>
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
import { userRoleMap } from '@/data/options'

export default {
  name: 'ExpertRelatedUser',
  props: {
    title: {
      type: String,
      default: '选择人员'
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      userRoleMap,
      dialogVisible: false,
      options: [],
      value: null,
      loading: false,
      confirmLoading: false
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
      const data = this.options.find(item => item.value === this.value)
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
    min-width: 120px;
    display: inline-block;
    margin-right: 10px;
  }
}
</style>

