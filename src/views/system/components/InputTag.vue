<template>
  <span>
    <el-input
      v-if="inputVisible"
      ref="saveTagInput"
      v-model="inputValue"
      class="input-tag"
      size="small"
      style="width: 100px;"
      @keyup.enter.native="handleInputConfirm"
      @blur="handleInputConfirm"
    />
    <el-tag
      v-else
      :disable-transitions="true"
      size="large"
      type="warning"
      class="tag"
    >
      <i class="el-icon-rank drag-anchor" />
      <el-divider direction="vertical" />
      <span>{{ inputValue }}</span>
      <el-divider direction="vertical" />
      <i class="el-icon-edit-outline" @click="showInput" />
    </el-tag>
  </span>
</template>

<script>
export default {
  name: 'InputTag',
  props: {
    text: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      inputVisible: false,
      inputValue: this.text
    }
  },
  methods: {
    showInput () {
      this.inputVisible = true
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus()
      })
    },
    handleInputConfirm () {
      this.$emit('on-change', this.inputValue)
      this.inputVisible = false
    }
  }
}
</script>

<style lang="scss" scoped>
  .input-tag {
    width: 90px;
    margin-left: 10px;
    vertical-align: bottom;
  }
  .tag {
    .drag-anchor {
      font-size: 14px;
      cursor: move;
    }
  }
</style>
