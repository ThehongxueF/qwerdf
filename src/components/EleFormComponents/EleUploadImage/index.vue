<!--
* 上传图片组件
* 对ele-upload-imag
-->
<template>
  <ele-upload-image v-model="imageValue" v-bind="desc.attrs" />
</template>
<script>
import { formMixin } from 'vue-ele-form'
import EleUploadImage from './EleUploadImage.vue'

export default {
  name: 'ImageUploader', // name 属性必须填写, 在使用时, 需要和这里定义的 name 一致
  minxins: [formMixin], // 必须引入mixin
  components: { EleUploadImage },
  props: {
    // value 是传递过来的值
    value: {
      type: [String, Array],
      default () {
        return []
      }
    },
    // desc是此组件的描述, 结构为
    // { style: {}, class: {}, on: {}, attrs: {} }
    desc: {
      type: Object,
      default: () => {}
    }
  },
  computed: {
    imageValue: {
      get () {
        return this.value
      },
      set (val) {
        this.$emit('input', val)
      }
    }
  }
}
</script>
