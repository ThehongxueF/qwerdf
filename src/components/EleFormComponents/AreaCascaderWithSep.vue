<!--
* 级联组件
* 对el-cascader封装
-->
<template>
  <el-cascader
    v-model="content"
    :options="desc.options"
    :props="desc.attrs && desc.attrs.props"
    clearable
    class="ele-form-full-line"
  />
</template>
<script>
import { formMixin } from 'vue-ele-form'

export default {
  name: 'CascaderWithSep', // name 属性必须填写, 在使用时, 需要和这里定义的 name 一致
  minxins: [formMixin], // 必须引入mixin
  props: {
    // value 是传递过来的值
    value: {
      type: String,
      default: ''
    },
    // desc是此组件的描述, 结构为
    // { style: {}, class: {}, on: {}, attrs: {} }
    desc: {
      type: Object,
      default: () => {}
    }
  },
  data () {
    return {}
  },
  computed: {
    content: {
      get () {
        if (this.value) {
          if (Array.isArray(this.value)) {
            return this.value
          } else {
            return this.value.split('/')
          }
        } else {
          return []
        }
      },
      set (content) {
        this.$emit('input', content.join('/'))
      }
    }
  }
}
</script>
