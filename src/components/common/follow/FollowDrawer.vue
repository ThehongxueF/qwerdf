<template>
  <div>
    <template v-if="column.followNotes && column.followNotes.length">
      <el-tag v-if="column.followNotes[column.followNotes.length - 1].follower.name" type="warning" effect="dark" size="mini">
        {{ column.followNotes[column.followNotes.length - 1].follower.name }}
      </el-tag>
      <span style="color: #999; margin-right: 5px;">
        {{ column.followNotes[column.followNotes.length - 1].createdAt | parseTime('{y}-{m}-{d}') }}
      </span>
      <span>
        {{ column.followNotes[column.followNotes.length - 1].content }}
      </span>
      <el-button
        size="mini"
        type="text"
        style="margin-left: 5px;"
        @click="getList"
      >
        查看更多>>
      </el-button>
    </template>
    <template v-else>暂无</template>
    <!-- 查看 弹窗 -->
    <el-drawer
      title="跟进记录"
      :size="listDrawerSize"
      :visible.sync="listShow"
      direction="rtl"
      append-to-body
    >
      <div class="drawer">
        <el-row :gutter="16">
          <template v-for="(item, index) in list">
            <el-col :key="index" style="margin-bottom: 16px">
              <follow-card :data="item" @on-edit="data => openDrawer({ data, map: followFormDesc, title: '编辑跟进记录' })" />
            </el-col>
          </template>
        </el-row>

        <pagination
          :total="total"
          :page.sync="listQuery.pageNo"
          :limit.sync="listQuery.pageSize"
          layout="prev, pager, next"
          :page-count="4"
          class="pagination"
          @pagination="getList"
        />
      </div>
    </el-drawer>
    <!-- 编辑跟进信息抽屉 -->
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
import { followColumns, followFormDesc } from './config'
import { listMixin, DrawerMixin } from '@/mixins'
import Follow from '@/api'
import EleFormDrawer from '@/components/EleFormComponents/FormDrawer'
import FollowCard from './FollowCard'

export default {
  name: 'FollowNotesDrawer',
  components: { FollowCard, EleFormDrawer },
  mixins: [listMixin, DrawerMixin],
  props: {
    checkId: {
      type: [String, Number],
      required: true
    },
    column: {
      type: Object,
      required: true
    },
    followCollection: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      listShow: false,
      originColumns: followColumns,
      listQuery: {
        pageNo: 1,
        pageSize: 5
      },
      followFormDesc,
      updateAPI: Follow.update
    }
  },
  computed: {
    listDrawerSize () {
      return this.drawerVisible ? '50%' : '30%'
    }
  },
  methods: {
    async getList () {
      this.listLoading = true
      try {
        const { followNotes, count = 0 } = await Follow.fetchList({
          collection: this.followCollection,
          id: this.checkId,
          params: this.listQuery
        })
        this.listShow = true
        this.list = followNotes
        this.total = count
      } catch ({ message = '获取跟进列表失败' }) {
        this.$message.error(message)
      } finally {
        this.listLoading = false
      }
    },
    async updateFollow (data) {
      try {
        const images = data.images
        if (Array.isArray(images) && images.length) {
          data.images = images.map(item => item.url ? item.url : item)
        }
        await this.updateAPI(data.id, data)
        this.drawerVisible = false
        this.$message.success('更新成功')
        this.getList()
      } catch ({ message = '更新出错' }) {
        this.$message.error(message)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.drawer {
  position: relative;
  padding: 0 20px;
  height: 100%;
  .pagination {
    position: absolute;
    left: 0;
    bottom: 20px;
  }
}
</style>
