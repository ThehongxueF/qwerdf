<template>
  <div>
    <froala
      v-model="froalaContent"
      :config="froalaConfig"
    />
  </div>
</template>

<script>
import { options } from '@/plugins/froala'
import { getToken } from '@/utils/auth'

export default {
  name: 'FroalaWrapper',
  props: {
    content: {
      type: String,
      default: ''
    }
  },
  data  () {
    const vm = this
    return {
      editor: null,
      froalaConfig: {
        requestHeaders: {
          'X-token': getToken()
        },
        ...options,
        events: {
          'initialized': function () {
            vm.editor = this
          },
          'file.uploaded': function (data) {
            const { url: link, name } = JSON.parse(data)
            vm.editor.file.insert(`${link}?attname=${encodeURIComponent(name)}`, name)
            return false
          },
          'image.uploaded': function (data) {
            const { url: link } = JSON.parse(data)
            vm.editor.image.insert(link, true, {}, vm.editor.image.get(), null)
            return false
          },
          'video.uploaded': function (data) {
            const { url: link } = JSON.parse(data)
            vm.editor.video.insert(`<video class="fr-draggable fr-fvc fr-dvi" src="${link}" controls style="width:${vm.editor.opts.videoDefaultWidth}px">Your browser does not support HTML5 video.</video>`)
            return false
          }
        }
      }
    }
  },
  computed: {
    froalaContent: {
      get () {
        return this.content
      },
      set (content) {
        this.$emit('update:content', content)
      }
    }
  }
}
</script>

