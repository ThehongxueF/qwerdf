<template>
  <basis-card
    icon="tree"
    main-title="数据开放"
  >
    <span> 地方站：{{ station }} </span>
    <span style="float: right;">
      数据开放：
      <el-switch
        v-model="value"
        active-color="#13ce66"
        active-value="public"
        inactive-value="private"
        @change="handleChange"
      />
    </span>
  </basis-card>
</template>

<script>
import BasisCard from './BasisCard'

export default {
  name: 'VisibleCard',
  components: { BasisCard },
  props: {
    icon: {
      type: String,
      default: 'tree'
    },
    station: {
      type: String,
      default: ''
    },
    visible: {
      type: String,
      default: ''
    }
  },
  computed: {
    value: {
      get () {
        return this.visible
      },
      set (val) {
        this.$emit('update:visible', val)
      }
    }
  },
  methods: {
    handleChange (val) {
      this.$emit('change', val)
    }
  }
}
</script>

<style lang="scss" scoped>
.basis-card-wrapper {
  margin-bottom: 20px;
  .el-card {
    .sub-title {
      line-height: 28px;
    }
  }
  .button-wrapper {
    float: right;
  }
}
</style>
