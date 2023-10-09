<!--
* 文件列表组件。
*
* @props
* list 文件链接数据
*
-->
<template>
  <div v-if="list && list.length" class="file-list-wrapper">
    <div v-for="(url, index) in list" :key="index" class="file-item">
      <file-item :url="url " />
    </div>
  </div>
</template>

<script>
import FileItem from './FileItem'

export default {
  name: 'FileList',
  components: { FileItem },
  props: {
    list: {
      type: Array,
      default: () => []
    }
  }
}
</script>

<style lang="scss" scoped>
.file-list-wrapper {
  padding: 10px;
  display: flex;
  flex-wrap: wrap;
  .file-item {
    margin-right: 10px;
    background: #FFF;
  }
}
</style>
