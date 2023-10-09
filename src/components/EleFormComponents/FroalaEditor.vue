<!--
* 富文本组件
* 对froala封装
-->
<template>
  <froala
    ref="froalaEditor"
    v-model="content"
    :config="froalaConfig"
  />
</template>
<script>
import { formMixin } from 'vue-ele-form'
import { options } from '@/plugins/froala'
import { Message } from 'element-ui'

export default {
  name: 'FroalaEditor', // name 属性必须填写, 在使用时, 需要和这里定义的 name 一致
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
    const vm = this
    return {
      editor: null,
      // froala Config
      froalaConfig: {
        ...options,
        ...this.desc.attrs,
        events: {
          immediateVueModelUpdate: true,
          'initialized': function () {
            vm.editor = this
          },
          'file.uploaded': function (data) {
            const { url: link, name } = JSON.parse(data)
            const filename = link.substring(link.lastIndexOf('/') + 1)
            const _name = name || filename || link
            vm.editor.file.insert(`${link}?attname=${encodeURIComponent(_name)}`, decodeURIComponent(_name))
            return false
          },
          'image.uploaded': function (data) {
            const { url: link } = JSON.parse(data)
            vm.editor.image.insert(link, true, {}, vm.editor.image.get(), null)
            return false
          },
          'video.uploaded': function (data) {
            const { url: link } = JSON.parse(data)
            const videoEmbed = `<video class="fr-draggable fr-fvc fr-dvi" src="${link}" controls style="width:${vm.editor.opts.videoDefaultWidth}px">Your browser does not support HTML5 video.</video>`
            vm.editor.video.insert(videoEmbed)

            const _html = vm.editor.html.get() // HACK 插入视频后手动更新content
            vm.content = _html
            return false
          },
          'video.error': function (error, response) {
            console.log({ error, response })
            // Video too text-large.
            if (error.code === 5) {
              Message.warning(`文件太大，不能超过${process.env.VUE_APP_MAX_UPLOAD_SIZE}M`) // 自定义文案
            }
          }
        }
      }
    }
  },
  computed: {
    content: {
      get () {
        return this.value
      },
      set (content) {
        this.$emit('input', content)
      }
    }
  }
}
</script>
