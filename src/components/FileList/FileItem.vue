<!--
* 文件组件。
*
* @props
* url 目标链接
*
-->
<template>
  <div class="item-container">
    <template v-if="fileIcon">
      <div class="icon-container">
        <svg-icon :icon-class="`file-${fileIcon}`" class="icon" />
        <a :href="url" download="">
          <div class="download">
            <i class="el-icon-download" />
          </div>
        </a>
      </div>
    </template>
    <el-image
      v-else
      :src="url"
      fit="cover"
      :preview-src-list="[url]"
      class="image"
    />
  </div>
</template>

<script>
const fileType = ['zip', 'txt', 'doc', 'docx', 'xls', 'xlsx', 'ppt', 'pdf', 'mp4', 'mkv', 'm2v', 'mp3', 'wav', 'wmv']

export default {
  name: 'FileItem',
  props: {
    url: {
      type: String,
      default: ''
    }
  },
  computed: {
    fileIcon () {
      let icon
      const extension = this.url.substr((this.url.lastIndexOf('.') + 1))
      if (!fileType.includes(extension)) {
        return icon
      }
      switch (extension) {
        case 'doc':
        case 'docx':
          icon = 'word'
          break
        case 'xls':
        case 'xlsx':
          icon = 'excel'
          break
        case 'mp3':
        case 'wav':
        case 'wmv':
          icon = 'audio'
          break
        case 'mp4':
        case 'mkv':
        case 'm2v':
          icon = 'video'
          break
        default:
          icon = extension
          break
      }
      return icon
    }
  }
}
</script>

<style lang="scss" scoped>
.item-container {
  .icon-container {
    position: relative;
    width: 100px;
    height: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: all 0.3s ease-in-out;
    .download {
      position: absolute;
      background: rgba($color: #000000, $alpha: .4);
      left: 0;
      top: 0;
      right: 0;
      bottom: 0;
      display: none;
      color: #FFF;
      font-size: 48px;
      line-height: 100px;
      text-align: center;
      cursor: pointer;
    }
    &:hover {
      .download {
        display: block;
      }
    }
    .icon {
      width: 48px;
      height: 48px;
    }
  }
  .image {
    width: 100px;
    height: 100px;
  }
}
</style>
