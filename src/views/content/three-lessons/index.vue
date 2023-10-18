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
          <el-select
            v-model="branch"
            placeholder="请选择支部"
            style="width: 100%;"
            clearable
            @change="handleFieldSearch"
            @clear="handleFieldSearch"
          >
            <el-option
              v-for="(item, index) in branchOptions"
              :key="index"
              :label="item"
              :value="item"
            />
          </el-select>
        </el-col>
        <el-col :md="8" :lg="6" :xl="4" class="mb10">
          <el-button
            type="primary"
            icon="el-icon-plus"
            @click="drawerFormVisible = true"
          >
            新增三会一课
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
        <template #action="{}">
          <el-link icon="el-icon-view" @click="drawerFormVisible = true">编辑</el-link>
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
      :form-desc="unitFormDesc"
      :visible.sync="drawerFormVisible"
      title="党员大会"
      size="800px"
      :request-fn="handleUpdate"
    />
  </div>
</template>

<script>
import { listMixin, updateMixin, detailMixin } from '@/mixins'
import { tableColumns, unitFormDesc } from './config'

export default {
  name: 'Units',
  mixins: [listMixin, updateMixin, detailMixin],
  data () {
    return {
      unitFormDesc,
      originColumns: tableColumns,
      listLoading: false,
      drawerFormVisible: false,
      list: [],
      total: 2,
      formData: {
        id: 3
      },
      branchOptions: ['支部一', '支部二', '支部三'],
      branch: '支部一'
    }
  },
  mounted () {
    this.getList()
  },
  methods: {
    getList () {
      this.list = [
        {
          id: '1',
          title: '课程名一',
          type: '党员大会',
          image: '无',
          branch: '支部一'
        },
        {
          id: '2',
          title: '课程名二',
          type: '党支部委员会',
          image: '无',
          branch: '支部二'
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
