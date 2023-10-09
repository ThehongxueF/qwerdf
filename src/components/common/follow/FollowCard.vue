<template>
  <div class="card-wrapper">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span class="date">
          <i class="el-icon-time" />
          {{ data.createdAt | parseTime }}
        </span>
        <template>
          <el-tag v-if="data.tag" :type="tagType(data.tag)" size="mini" effect="dark" style="margin-left: 8px">{{ data.tag }}</el-tag>
        </template>
        <el-button
          type="info"
          icon="el-icon-edit"
          size="mini"
          plain
          circle
          style="float: right;"
          @click="edit"
        />
      </div>
      <div class="card-content">
        <div v-html="data.content" />
        <div class="image-wrapper">
          <file-list :list="data.images" />
        </div>
        <p class="operator">
          {{ data.follower && data.follower.name }}
          <el-tag size="mini" type="info">迈科技</el-tag>
        </p>
      </div>
    </el-card>
  </div>
</template>

<script>
import FileList from '@/components/FileList'

export default {
  name: 'FollowCard',
  components: { FileList },
  props: {
    data: {
      type: Object,
      require: true,
      default: () => {}
    }
  },
  methods: {
    tagType (val) {
      const map = {
        '线上回访': 'success',
        '线下拜访': 'warning'
      }
      return map[val]
    },
    edit () {
      this.$emit('on-edit', this.data)
    }
  }
}
</script>

<style lang="scss" scoped>
.card-wrapper {
  ::v-deep {
    .el-card__header {
      padding: 10px;
    }
  }
  overflow: hidden;
  .card-content {
    .image-wrapper {
      display: flex;
      .image {
        width: 100px;
        height: 100px;
        &:not(:last-child) {
          margin-right: 5px;
        }
      }
    }
    .operator {
      font-size: 14px;
      color: #666;
      float: right;
    }
  }
  .date {
    color: #333;
  }
}
</style>
