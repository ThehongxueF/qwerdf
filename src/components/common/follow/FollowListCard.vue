<template>
  <div>
    <el-card class="box-card" style="margin-top: 20px;">
      <div slot="header" class="flex-bar">
        <span>跟进记录</span>
        <el-button type="success" size="mini" style="float: right;" @click="dialogFormVisible = true">新增</el-button>
      </div>
      <template>
        <template v-if="list.length">
          <div v-for="(item, index) in list" :key="index">
            <FollowCard :data="item" @on-edit="data => openDrawer({ data, map: formDesc, title: '编辑跟进记录' })" />
            <el-divider />
          </div>
        </template>
        <el-alert
          v-else
          title="暂无记录"
          type="info"
          :closable="false"
        />
      </template>
    </el-card>
    <!-- 新增弹窗 -->
    <ele-form-dialog
      v-model="formData"
      title="新增跟进"
      width="50%"
      :is-loading="dialogFormLoading"
      :dialog-attrs="dialogAttrs"
      :form-desc="formDesc"
      :visible.sync="dialogFormVisible"
      @request="createFollow"
    />
    <!-- 编辑跟进抽屉 -->
    <ele-form-drawer
      :title="drawerTitle"
      size="40%"
      :visible.sync="drawerVisible"
      :form-data.sync="drawerOption.data"
      :form-desc="drawerOption.map"
      :form-rules="drawerOption.rules"
      @submit="updateFollow"
    />
  </div>
</template>

<script>
import { DrawerMixin, createMixin } from '@/mixins'
import { followFormDesc } from './config.js'
import Follow from '@/api'
import FollowCard from './FollowCard'
import EleFormDrawer from '@/components/EleFormComponents/FormDrawer'

export default {
  name: 'FollowListCard',
  components: { FollowCard, EleFormDrawer },
  mixins: [DrawerMixin, createMixin],
  props: {
    collectionId: {
      type: [String, Number],
      default: '',
      require: true
    },
    collection: {
      type: String,
      default: '',
      require: true
    }
  },
  data () {
    return {
      list: [],
      formDesc: followFormDesc
    }
  },
  created () {
    this.fetchList()
  },
  methods: {
    async fetchList () {
      try {
        const { followNotes } = await Follow.fetchList({
          id: this.collectionId,
          collection: this.collection
        })
        this.list = followNotes
      } catch ({ message = '获取跟进列表失败' }) {
        this.$message.error(message)
      }
    },
    async createFollow (data) {
      this.dialogVisible = true
      this.dialogFormLoading = true
      try {
        const { followNote } = await Follow.create({
          collection: this.collection,
          id: this.collectionId,
          data
        })
        this.list.unshift(followNote)
        this.$message.success('新增跟进成功')
        this.dialogFormVisible = false
      } catch ({ message = '新增跟进失败' }) {
        this.$message.error(message)
      } finally {
        this.dialogFormLoading = false
        this.dialogVisible = false
      }
    },
    async updateFollow (data) {
      try {
        const images = data.images
        if (Array.isArray(images) && images.length) {
          data.images = images.map(item => item.url ? item.url : item)
        }
        await Follow.update(data.id, data)
        this.drawerVisible = false
        this.$message.success('更新成功')
        this.fetchList()
      } catch ({ message = '更新出错' }) {
        this.$message.error(message)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.flex-bar {
  display: flex;
  justify-content: space-between;
  font-size: 16px;
  line-height: 32px;
}
</style>
