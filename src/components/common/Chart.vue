<!--
* echarts 默认输出组件。
-->
<template>
  <div :class="className" :style="{height:height,width:width}" />
</template>

<script>
import * as echarts from 'echarts' // echarts theme
import { resizeMixin } from '@/mixins'

export default {
  mixins: [resizeMixin],
  props: {
    className: {
      type: String,
      default: 'chart'
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '300px'
    },
    option: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      chart: null
    }
  },
  watch: {
    option: {
      handler () {
        this.chart.dispose()
        this.initChart()
      },
      deep: true
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.initChart()
    })
  },
  beforeDestroy () {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
  },
  methods: {
    initChart () {
      this.chart = echarts.init(this.$el, 'macarons')

      this.chart.setOption(this.option)
      this.chart.on('click', (params) => {
        this.$emit('handlerClick', params)
      })
    }
  }
}
</script>
