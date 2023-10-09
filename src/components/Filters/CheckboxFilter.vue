<!--
* 筛选多选组件。
*
* @props
* value 选择的数组 使用v-model
* checkAll 是否全选 使用checkAll.sync
* options 选项数组
*
-->
<template>
  <div
    v-if="options && options.length"
    class="list-filter"
  >
    <div class="list-filter__checkboxes">
      <el-checkbox
        v-model="all"
        :indeterminate="isIndeterminate"
        border
        size="small"
        @change="handleCheckAllChange"
      >
        全部
      </el-checkbox>
      <el-checkbox-group v-model="checkedValues" size="small" @change="handleCheckedValuesChange">
        <el-checkbox
          v-for="option in options"
          :key="option.value"
          :label="option.value"
          border
        >
          {{ option.text }}
        </el-checkbox>
      </el-checkbox-group>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CheckboxFilter',
  props: {
    value: {
      type: Array,
      default: () => []
    },
    checkAll: {
      type: Boolean,
      default: false
    },
    options: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      all: false,
      isIndeterminate: true
    }
  },
  computed: {
    checkedValues: {
      get () {
        return this.value
      },
      set (val) {
        this.$emit('input', val)
      }
    }
  },
  watch: {
    all (val) {
      this.$emit('update:checkAll', val)
    }
  },
  methods: {
    handleCheckAllChange (val) {
      this.checkedValues = val ? this.options.map(item => item.value) : []
      this.isIndeterminate = false
    },
    handleCheckedValuesChange (value) {
      const checkedCount = value.length
      this.all = checkedCount === this.options.length
      this.isIndeterminate = checkedCount > 0 && checkedCount < this.options.length
    }
  }
}
</script>

<style lang="scss" scoped>
.list-filter {
  display: flex;
  align-items: center;

  &__checkboxes {
    display: flex;
  }
  ::v-deep {
    .el-checkbox {
      border: 1px solid transparent;
      background-color: #f8f8f8;
    }

    .el-checkbox.is-checked {
      background-color: transparent;
    }

    .el-checkbox.is-bordered {
      text-align: center;
      min-width: 60px;
      margin: 0 5px 5px !important;

      .el-checkbox__input {
        display: none;
      }

      .el-checkbox__label {
        padding-left: 0;
      }
    }
  }
}
</style>
