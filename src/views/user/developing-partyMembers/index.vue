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
            新增发展中党员
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
        <template #branch="{ row }">
          {{ row.branch && row.branch.title }}
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
          :page.sync="listQuery.page"
          :limit.sync="listQuery.perPage"
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
      title="新增发展中党员"
      size="800px"
      :request-fn="handleUpdate"
    />
  </div>
</template>

<script>
import { listMixin, updateMixin, detailMixin } from '@/mixins'
import { tableColumns, memberFormDesc } from './config'

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
      total: 2,
      formData: {
        id: 3
      }
    }
  },
  mounted () {
    this.getList()
  },
  methods: {
    getList () {
      this.list = [
        {
          id: 1,
          name: '发展中党员一',
          gender: '男性',
          post: '职务111',
          age: '30',
          mobile: '15523698741',
          nature: true,
          branch: { id: 1, title: '单位一单位一单位一单位一' },
          politicalBirthday: '1980-10-29',
          standing: '10年'
        },
        {
          id: 2,
          name: '发展中党员二',
          gender: '男性',
          post: '职务111',
          age: '30',
          mobile: '15523698741',
          nature: true,
          branch: { id: 1, title: '单位一单位一单位一单位一' },
          politicalBirthday: '1980-10-29',
          standing: '10年'
        }
      ]
    },
    handleUpdate () {
      this.list.push(this.formData)
      this.drawerFormVisible = false
    }
  }
}
</script>
