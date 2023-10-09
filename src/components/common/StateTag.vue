<!--
* 状态展示组件。
*
* 对el-tag的封装
*
* @props
* state 状态 必填
*
-->
<template>
  <el-tag v-if="state" v-bind="$attrs" :type="stateMap[state].type" size="mini">
    {{ stateMap[state].text }}
  </el-tag>
</template>

<script>
import { stateMap } from '@/data/options'

export default {
  name: 'StateTag',
  props: {
    state: {
      type: String,
      required: true,
      default: ''
    }
  },
  data () {
    return {
      stateMap
    }
  }
}
</script>
