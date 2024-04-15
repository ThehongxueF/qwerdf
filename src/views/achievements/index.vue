<template>
  <div class="app-container">
    <el-card
      :body-style="{ padding: '10px 20px' }"
      shadow="never"
      class="filters-container mb10"
    >
      <el-row :gutter="20">
        <el-col :span="24">
          <transition name="el-fade-in-linear" mode="out-in">
            <TagsFilter
              v-model="fieldQuery.tagIds"
              @on-change="handleFieldSearch"
            />
          </transition>
        </el-col>
        <el-col :md="8" :lg="6" :xl="4" class="mb10">
          <el-input
            v-model="fieldQuery.title"
            placeholder="请输入成果标题"
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
            v-model="fieldQuery.maturity"
            placeholder="请选择成熟度"
            style="width: 100%;"
            clearable
            @change="handleFieldSearch"
            @clear="handleFieldSearch"
          >
            <el-option
              v-for="(item, index) in technologyMaturityOptions"
              :key="index"
              :label="item"
              :value="item"
            />
          </el-select>
        </el-col>
        <el-col :md="8" :lg="6" :xl="4" class="mb10">
          <el-select
            v-model="fieldQuery.state"
            placeholder="请选择审核状态"
            clearable
            style="width: 100%;"
            @change="handleFieldSearch"
            @clear="handleFieldSearch"
          >
            <el-option
              v-for="(item, index) in stateOptions"
              :key="index"
              :label="item.text"
              :value="item.value"
            />
          </el-select>
        </el-col>
        <el-col :md="8" :lg="6" :xl="4" class="mb10">
          <el-select
            v-model="fieldQuery.applicationAreas"
            placeholder="请选择应用领域"
            clearable
            style="width: 100%;"
            @change="handleFieldSearch"
            @clear="handleFieldSearch"
          >
            <el-option
              v-for="(item, index) in industryAreas"
              :key="index"
              :label="item"
              :value="item"
            />
          </el-select>
        </el-col>
        <el-col :md="8" :lg="6" :xl="4" class="mb10">
          <el-select
            v-model="fieldQuery.cooperationWay"
            placeholder="请选择合作方式"
            clearable
            style="width: 100%;"
            @change="handleFieldSearch"
            @clear="handleFieldSearch"
          >
            <el-option
              v-for="(item, index) in cooperationWayOptions"
              :key="index"
              :label="item"
              :value="item"
            />
          </el-select>
        </el-col>
        <el-col :md="8" :lg="6" :xl="4" class="mb10">
          <UserSearchSelect
            v-model="formData.publisherId"
            placeholder="请选择创建人"
            style="width: 100%;"
            @on-search="(query, cb) => handleSearch(query, publisherSearchRoles, cb)"
          />
        </el-col>
        <el-col :md="8" :lg="6" :xl="4" class="mb10">
          <UserSearchSelect
            v-model="formData.servantId"
            placeholder="请选择技术经纪人"
            style="width: 100%;"
            @on-search="(query, cb) => handleSearchBroker(query, servantSearchRoles, cb)"
          />
        </el-col>
        <el-col :md="8" :lg="6" :xl="4" class="mb10">
          <UserSearchSelect
            v-model="formData.contactId"
            placeholder="请选择联系人"
            style="width: 100%;"
            @on-search="(query, cb) => handleSearch(query, publisherSearchRoles, cb)"
          />
        </el-col>
        <el-col :md="8" :lg="6" :xl="4" class="mb10">
          <el-button
            type="primary"
            icon="el-icon-plus"
            @click="addAchievement"
          >
            新增成果
          </el-button>
        </el-col>
      </el-row>
    </el-card>
    <el-card shadow="never" :body-style="{ padding: '20px' }">
      <!-- card body -->
      <filter-panel
        :total="total"
        :columns="originColumns"
        :show-columns.sync="showColumns"
        :show-search="false"
        :show-create="false"
        :show-batch="true"
        :show-batch-accepted="true"
        :show-batch-rejected="true"
        :show-batch-back="true"
        :show-batch-verifing="true"
        :show-batch-published="true"
        :show-batch-un-published="true"
        @on-selection="showSelection=true"
        @on-batch="handleBatch"
      />
      <!-- 列表 -->
      <common-table
        :loading="listLoading"
        :data="list"
        :columns="columns"
        :show-check="showSelection"
        @on-selection-change="multipleSelection=[...$event]"
        @field-search="fieldSearch"
      >
        <template #tags="{ row }">
          <template v-if="row.tags && row.tags.length">
            <el-tooltip :disabled="row.tags.length <= 2" effect="dark" :content="row.tags.map((value) => value.name).join(' ')" placement="top">
              <div style="white-space: nowrap;">
                <el-tag
                  v-if="row.tags&&row.tags[0]"
                  type="info"
                  effect="plain"
                  style="margin: 2px;"
                >
                  {{ row.tags[0].name }}
                </el-tag>
                <el-tag
                  v-if="row.tags&&row.tags[1]"
                  type="info"
                  effect="plain"
                  style="margin: 2px;"
                >
                  {{ row.tags[1].name }}
                </el-tag>
                <span v-if="row.tags.length > 2">...</span>
              </div>
            </el-tooltip>
          </template>
          <i v-else>暂无</i>
        </template>
        <template #applicationAreas="{ row }">
          <template v-if="row.applicationAreas && row.applicationAreas.length">
            <span
              v-for="(item, index) in row.applicationAreas"
              :key="index"
              style="margin: 2px;"
            >
              {{ item }}
            </span>
          </template>
          <i v-else>暂无</i>
        </template>
        <template #publisher="{ row }">
          {{ row.publisher && row.publisher.name }}
        </template>
        <template #contact="{ row }">
          {{ row.contact && row.contact.name }}
        </template>
        <template #servant="{ row }">
          {{ row.servant && row.servant.name }}
        </template>
        <template #visible="{ row }">
          <el-tag :type="row.visible ? 'success' : 'info'" effect="dark">
            {{ row.visible ? '上线' : '下线' }}
          </el-tag>
        </template>
        <template #isPopularize="{ row }">
          <span>
            {{ row.isPopularize ? '推广中' : '未推广' }}
          </span>
        </template>
        <template #vendor="{ row }">
          <span>
            {{ row.vendor&&row.vendor.name || '自主创建' }}
          </span>
        </template>
        <template #state="{ row }">
          <el-tag
            v-if="row.state && stateMap[row.state]"
            :type="stateMap[row.state].type"
          >
            {{ stateMap[row.state].text }}
          </el-tag>
          <span v-else>{{ row.state }}</span>
        </template>
        <template #action="{ row }">
          <router-link :to="{ name: 'Achievements.Detail' , params: { id: row.id } }">
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
  </div>
</template>
<script>
import { stateMap, stateOptions, technologyAreaOptions, technologyMaturityOptions } from '@/data/options'
import { Achievement, User } from '@/api'
import { listMixin } from '@/mixins'
import { tableColumns } from './config'
import { industryAreas, cooperationWayOptions } from '@/data/options'
import { Session } from '@/utils/storage'
import UserSearchSelect from '@/components/Form/SearchSelect.vue'
import { ROLE } from '@/data/constant'

const publisherSearchRoles = [ROLE.COLLEGE_ADMIN, ROLE.TECHNOLOGY_BROKER, ROLE.EXPERT]
const servantSearchRoles = [ROLE.TECHNOLOGY_BROKER]
const contactSearchRoles = [ROLE.TECHNOLOGY_BROKER, ROLE.EXPERT]

export default {
  name: 'Achievements',
  components: { UserSearchSelect },
  mixins: [listMixin],
  data () {
    return {
      originColumns: tableColumns,
      stateMap,
      stateOptions,
      technologyAreaOptions,
      technologyMaturityOptions,
      industryAreas,
      cooperationWayOptions,
      publisherSearchRoles,
      servantSearchRoles,
      contactSearchRoles,
      formData: {
        servantId: null,
        contactId: null,
        publisherId: null
      }
    }
  },
  watch: {
    $route: {
      handler (val, oldVal) {
        if (val && val.name === 'Achievements') {
          if (oldVal && (oldVal.name === 'Achievements.Add' || oldVal.name === 'Achievements.Detail')) {
          // 从新增界面或详情界面回到列表界面需重新加载数据
            this.getList()
          }
        }
      },
      deep: true
    },
    formData: {
      handler (val) {
        this.getList()
      },
      deep: true
    }
  },
  mounted () {
    this.getList()
  },
  methods: {
    async getList () {
      this.listLoading = true
      try {
        const { achievements, count } = await Achievement.getAchievements({
          ...this.listQuery,
          ...this.fieldQuery,
          ...this.formData
        })
        this.list = achievements
        this.total = count
        this.listLoading = false
      } catch ({ message = '获取成果列表出错' }) {
        this.$message.error(message)
        this.listLoading = false
      }
    },
    addAchievement () {
      Session.remove('ACHIEVEMENT')
      this.$router.push({ name: 'Achievements.Add' })
    },
    async handleBatch (type, cb) {
      if (type === 'cancel') {
        this.showSelection = false
        cb()
        return
      }
      if (!(this.multipleSelection && this.multipleSelection.length)) {
        return
      }
      try {
        const { successCount } = await Achievement.batchProcessing({ type: type, ids: this.multipleSelection.map(item => item.id) })
        this.$message.success(`成功操作${successCount}条`)
        cb()
        this.getList()
      } catch ({ message = '操作失败' }) {
        this.$message.error(message)
      }
    },
    // 检索用户
    async handleSearch (text, roles, cb) {
      const params = {
        pageNo: 1,
        pageSize: 10000,
        text,
        state: 'accepted',
        disabled: 'false',
        role: roles.join(',')
      }
      try {
        const { users } = await User.getUsers(params)
        const list = users.map(user => ({ label: user.name, value: `${user.id}`, data: user }))
        this.publisherList = list
        cb(list)
      } catch (e) {
        cb([])
      }
    },
    async handleSearchBroker (text, roles, cb) {
      const params = {
        pageNo: 1,
        pageSize: 10000,
        text,
        disabled: 'false',
        role: roles.join(',')
      }
      try {
        const { users } = await User.getUsers(params)
        const list = users.map(user => {
          const option = {
            label: user.name,
            value: `${user.id}`,
            data: user,
            children: []
          }
          if (user.teams) {
            option.children = user.teams.map(team => ({
              label: team.name,
              value: `${team.id}`
            }))
          }
          return option
        })
        cb(list)
      } catch (e) {
        cb([])
      }
    }
  }
}
</script>
