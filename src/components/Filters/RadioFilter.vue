<!--
* 筛选单选组件。
*
* @props
* value 选择的数组 使用v-model
* options 选项数组
*
-->
<template>
  <div class="list-filter">
    <div class="list-filter__radios">
      <el-radio-group v-model="checkedValue" size="small">
        <el-radio
          :label="null"
          border
          size="small"
        >
          不限
        </el-radio>
        <el-radio
          v-for="option in options"
          :key="option.value"
          :label="option.value"
          border
        >
          {{ option.text }}
        </el-radio>
      </el-radio-group>
    </div>
  </div>
</template>

<script>
export default {
  name: 'RadioFilter',
  props: {
    value: {
      type: [String, Number],
      default: null
    },
    options: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      all: true
    }
  },
  computed: {
    checkedValue: {
      get () {
        return this.value
      },
      set (val) {
        this.$emit('input', val)
      }
    }
  },
  methods: {
    handleCheckAllChange () {
      if (this.all) {
        this.checkedValue = null
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.list-filter {
  display: flex;
  align-items: center;

  &__radios {
    display: flex;
  }
  ::v-deep {
    .el-radio {
      border: 1px solid transparent;
      background-color: #f8f8f8;
    }

    .el-radio.is-checked {
      background-color: transparent;
    }

    .el-radio.is-bordered {
      text-align: center;
      min-width: 60px;
      margin: 0 5px 5px !important;

      .el-radio__input {
        display: none;
      }

      .el-radio__label {
        padding-left: 0;
      }
    }
  }
}
</style>
