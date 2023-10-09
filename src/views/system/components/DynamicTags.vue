<template>
  <draggable
    v-model="dynamicTags"
    class="list-group"
    tag="ul"
    @end="dragEnd"
  >
    <transition-group>
      <InputTag
        v-for="(tag, index) in dynamicTags"
        :key="tag.name"
        :text="tag.name"
        class="list-group-item mr10"
        @on-change="value => handleChange(index, value)"
      />
    </transition-group>
  </draggable>
</template>

<script>
import { cloneDeep } from 'lodash'
import draggable from 'vuedraggable'
import InputTag from './InputTag.vue'

export default {
  name: 'DynamicTags',
  components: { draggable, InputTag },
  props: {
    options: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      dynamicTags: []
    }
  },
  watch: {
    options: {
      deep: true,
      handler (val) {
        this.dynamicTags = cloneDeep(val)
      }
    }
  },
  methods: {
    handleChange (index, value) {
      if (this.dynamicTags[index]) {
        this.dynamicTags[index].name = value
      }
      this.$emit('update:options', this.dynamicTags)
    },
    dragEnd () { // 拖拽结束后更新
      this.$emit('update:options', this.dynamicTags)
    }
  }
}
</script>
