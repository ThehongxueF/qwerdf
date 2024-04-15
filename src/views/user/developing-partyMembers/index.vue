<template>
  <div class="app-container">
    <el-card
      :body-style="{ padding: '10px 20px' }"
      shadow="never"
      class="filters-container mb10"
    >
      <el-row :gutter="20">
        <el-col :md="8" :lg="6" :xl="4" class="mb10">
          <el-input
            v-model="fieldQuery.keyword"
            placeholder="请输入关键词搜索"
            clearable
            style="width: 100%;"
            @input="handleFieldSearch"
            @clear="handleFieldSearch"
          >
            <i
              slot="prefix"
              class="el-icon-search input__prefix-icon"
            />
          </el-input>
        </el-col>
        <el-col :md="8" :lg="6" :xl="4" class="mb10">
          <el-button
            type="primary"
            icon="el-icon-plus"
            @click="drawerFormVisible = true"
          >
            新增党员
          </el-button>
        </el-col>
      </el-row>
    </el-card>
    <el-card shadow="never" :body-style="{ padding: '20px' }">
      <common-table
        :loading="listLoading"
        :data="list"
        :columns="columns"
        :show-check="showSelection"
        @on-selection-change="multipleSelection=[...$event]"
        @field-search="fieldSearch"
      >
        <template #memberType="{ }">
          {{ '发展中党员' }}
        </template>
        <template #department="{ row }">
          {{ row.department && row.department.name }}
        </template>
        <template #action="{ row }">
          <router-link :to="{ name: 'DevelopingPartyMembers.Detail' , params: { id: row.id } }">
            <el-link icon="el-icon-view">查看</el-link>
          </router-link>
        </template>
      </common-table>
      <div class="page-container">
        <pagination
          v-show="total>0"
          :total="total"
          :page-no.sync="listQuery.pageNo"
          :limit.sync="listQuery.pageSize"
          @pagination="getList"
        />
      </div>
    </el-card>
    <ele-form-drawer
      v-model="formData"
      :span="24"
      :drawer-attrs="drawerAttrs"
      :form-desc="memberFormDesc"
      :visible.sync="drawerFormVisible"
      title="新增党员"
      size="800px"
      :request-fn="handleUpdate"
    />
  </div>
</template>

<script>
import { listMixin, updateMixin, detailMixin } from '@/mixins'
import { tableColumns, memberFormDesc } from './config'
import { Users } from '@/api'

export default {
  name: 'Units',
  mixins: [listMixin, updateMixin, detailMixin],
  data () {
    return {
      memberFormDesc,
      originColumns: tableColumns,
      listLoading: false,
      drawerFormVisible: false,
      list: [],
      total: 0,
      formData: {}
    }
  },
  mounted () {
    this.getList()
  },
  methods: {
    async getList () {
      try {
        const { users, count } = await Users.getUsers({ ...this.listQuery })
        if (users.length > 0) {
          this.list = users.filter(item => item.memberType === 'false')
        }
        this.total = count
      } catch ({ message = '获取发展中党员列表出错' }) {
        this.$message.error(message)
        this.listLoading = false
      }
    },
    async handleUpdate () {
      this.drawerFormVisible = false
      try {
        const params = {
          user: this.formData
        }
        await Users.saveUsers(params)
      } catch ({ message = '保存发展中党员出错' }) {
        this.getList()
        this.$message.error(message)
      } finally {
        this.getList()
      }
    }
  }
}
</script>
