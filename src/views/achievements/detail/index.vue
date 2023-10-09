<template>
  <div v-loading="pageLoading" class="app-container">
    <el-row :gutter="10">
      <el-col :lg="{ span: 24 }" :xl="{ span: 12 }" class="mb10">
        <el-card shadow="hover">
          <div class="header">
            <state-tag :state="achievement.state" />
            <span v-if="achievement" class="actions-wrapper" style="float: right;">
              <el-link
                :underline="false"
                type="danger"
                icon="el-icon-delete"
                class="mr10"
                @click="onRemove"
              >
                删除
              </el-link>
              <el-link
                :underline="false"
                icon="el-icon-edit"
                @click="drawerFormVisible = true"
              >
                编辑
              </el-link>
            </span>
          </div>
          <h3>{{ achievement.title }}</h3>
          <div class="cover-container">
            <el-image
              v-if="achievement.coverUrl"
              :src="achievement.coverUrl"
              :preview-src-list="[achievement.coverUrl]"
              class="cover-item"
              fit="cover"
            />
          </div>
          <!--  -->
          <el-descriptions
            :column="1"
            :label-style="labelStyle"
            :content-style="contentStyle"
          >
            <el-descriptions-item label="简介"> {{ achievement.brief }} </el-descriptions-item>
            <el-descriptions-item label="关键字"> {{ achievement.keywords }} </el-descriptions-item>
            <el-descriptions-item label="标签">
              <template v-if="achievement.tags && achievement.tags.length">
                <el-tag
                  v-for="(item, index) in (achievement.tags)"
                  :key="index"
                  type="warning"
                  effect="plain"
                  size="small"
                  style="margin: 2px;"
                >
                  {{ item.name }}
                </el-tag>
              </template>
            </el-descriptions-item>
            <el-descriptions-item label="应用领域" label-style="width: 60px">
              <template v-if="achievement.applicationAreas && achievement.applicationAreas.length">
                <el-tag
                  v-for="(item, index) in (achievement.applicationAreas)"
                  :key="index"
                  type="warning"
                  size="small"
                  effect="plain"
                  style="margin: 2px;"
                >
                  {{ item }}
                </el-tag>
              </template>
            </el-descriptions-item>
            <el-descriptions-item label="合作方式">
              <el-tag
                v-for="(item, index) in (achievement.cooperationWay)"
                :key="index"
                type="info"
                size="small"
                effect="plain"
                style="margin: 2px;"
              >
                {{ item }}
              </el-tag>
            </el-descriptions-item>
            <el-descriptions-item label="技术成熟度"> {{ achievement.maturity }} </el-descriptions-item>
            <el-descriptions-item label="附件">
              <el-link
                v-if="hasAttachments"
                :icon="download.loading ? 'el-icon-loading' : 'el-icon-download'"
                type="info"
                @click="onDownload"
              >
                下载文件
              </el-link>
              <i v-else>暂无</i>
            </el-descriptions-item>
          </el-descriptions>

          <el-divider content-position="left">
            技术详情
          </el-divider>
          <el-card shadow="never">
            <froala-view v-model="achievement.details" />
          </el-card>

          <el-divider content-position="left">
            技术优势
          </el-divider>
          <el-card shadow="never">
            <froala-view v-model="achievement.effectiveness" />
          </el-card>

          <el-divider content-position="left">
            专利及荣誉情况
          </el-divider>
          <el-card shadow="never">
            <froala-view v-model="achievement.patents" />
          </el-card>
        </el-card>
        <el-card shadow="hover" style="margin-top: 20px;" class="relative-contact">
          <div class="header">
            <h3>相关联系人</h3>
            <el-button
              type="primary"
              icon="el-icon-plus"
              @click="addContact"
            >
              新增相关联系人
            </el-button>
          </div>
          <common-table
            :loading="listLoading"
            :data="list"
            :columns="columns"
          >
            <template #enterpriseName="{row}">
              <span>{{ row.enterpriseContact && row.enterpriseContact.enterprise && row.enterpriseContact.enterprise.name }}</span>
            </template>
            <template #name="{row}">
              <span>{{ row.enterpriseContact && row.enterpriseContact.name }}</span>
            </template>
            <template #position="{row}">
              <span>{{ row.enterpriseContact && row.enterpriseContact.position }}</span>
            </template>
            <template #mobile="{row}">
              <span>{{ row.enterpriseContact && row.enterpriseContact.mobile }}</span>
            </template>
            <template #action="{ row }">
              <i class="el-icon-delete" style="color:#ff6d6d; cursor: pointer;" @click="removeContact(row)">删除</i>
              <i class="el-icon-edit" style="margin-left: 10px; cursor: pointer;" @click="editContact(row)">编辑</i>
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
        <el-dialog
          v-if="dialogVisible"
          :title="editContactInfo? '编辑联系人':'新增联系人'"
          width="600px"
          :visible.sync="dialogVisible"
          modal-append-to-body
          append-to-body
        >
          <div>
            <CreateRelativeContact :edit-contact-info="editContactInfo" :resource-id="id" target-type="achievement" @cancelDialog="cancelDialog" />
          </div>
        </el-dialog>
      </el-col>

      <el-col :lg="{ span: 24 }" :xl="{ span: 12 }">
        <el-card shadow="hover" class="mb10">
          <el-descriptions
            :column="2"
            :label-style="labelStyle"
            :content-style="contentStyle"
            direction="vertical"
          >
            <el-descriptions-item label="创建时间"><i class="el-icon-time" /> {{ achievement.createdAt }}</el-descriptions-item>
            <el-descriptions-item label="最近更新时间"><i class="el-icon-time" /> {{ achievement.updatedAt }}</el-descriptions-item>
          </el-descriptions>
        </el-card>
        <el-row :gutter="10">
          <el-col :md="24" :lg="12" class="mb10">
            <el-card shadow="hover">
              <h3>
                审核状态
              </h3>
              <TemplateStateVerify
                v-if="achievement.state"
                :target="achievement"
                :records="achievementApproves"
                @update-state="handleApprove"
              />
              <!--  -->
              <el-divider />
              <h3>
                上线状态
              </h3>
              <el-switch
                v-model="achievement.visible"
                :disabled="!isAccepted"
                active-text="上线"
                inactive-text="下线"
                active-color="#13ce66"
                @change="visibleChange"
              />
            </el-card>
          </el-col>
          <el-col :md="24" :lg="12" class="mb10">
            <el-card shadow="hover" style="height: 460px;">
              <h3>联系人</h3>
              <UserCard title="创建人" :user="achievement.publisher" class="mb10">
                <template #extra>
                  <UserSelectDialog
                    title="更改创建人"
                    @on-search="(data, cb) => searchUser(data, cb, publisherSearchRoles)"
                    @on-confirm="changePublisher"
                  >
                    <el-link icon="el-icon-edit" :underline="false">更改</el-link>
                  </UserSelectDialog>
                </template>
              </UserCard>
              <UserCard title="技术经纪人" :user="achievement.servant" class="mb10">
                <template #tag>
                  <el-tag
                    v-if="achievement.team"
                    type="warning"
                    size="mini"
                    effect="plain"
                  >
                    {{ achievement.team.name }}
                  </el-tag>
                </template>
                <template #extra>
                  <UserCascaderDialog
                    title="更改技术经纪人"
                    @on-search="(data, cb) => searchBroker(data, cb, servantSearchRoles)"
                    @on-confirm="changeServant"
                  >
                    <el-link icon="el-icon-edit" :underline="false">更改</el-link>
                  </UserCascaderDialog>
                </template>
              </UserCard>
              <UserCard title="联系人" :user="achievement.contact" class="mb10">
                <template #extra>
                  <UserSelectDialog
                    :disabled="!(achievement.team && achievement.team.id)"
                    title="更改联系人"
                    @on-search="(data, cb) => searchUserContacts(data, cb, contactSearchRoles, achievement.team.id)"
                    @on-confirm="changeContact"
                  >
                    <el-link icon="el-icon-edit" :underline="false" :disabled="!(achievement.team && achievement.team.id)">更改</el-link>
                  </UserSelectDialog>
                </template>
              </UserCard>
            </el-card>
          </el-col>
        </el-row>

        <el-row :gutter="10">
          <el-col :md="24" :lg="24">
            <el-card shadow="hover" class="mb10">
              <h3>
                对接记录
              </h3>
              <DockingList :target-id="id" target-type="achievement" />
            </el-card>
          </el-col>
          <el-col :md="24" :lg="24">
            <el-card shadow="hover">
              <h3>服务跟进记录</h3>
              <FollowNoteList
                :target-id="id"
                target-type="achievement"
              />
            </el-card>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
    <ele-form-drawer
      v-model="formData"
      :span="24"
      :drawer-attrs="drawerAttrs"
      :form-desc="achievement.state === 'new' ? achievementUpdateFormDesc: achievementUpdateFormDescUnNew"
      :visible.sync="drawerFormVisible"
      title="编辑"
      size="800px"
      :request-fn="handleUpdate"
    />

    <!-- 下载弹窗 -->
    <el-dialog title="文件下载" width="600px" :visible.sync="download.visible">
      <el-alert
        :closable="false"
        title="临时链接，请尽快完成下载"
        type="info"
        effect="light"
        show-icon
      />

      <div v-for="(item, index) in attachments" :key="index" class="mt20 mb20">
        <a
          :href="item.url"
          target="_blank"
          rel="noopener noreferrer"
          class="mb10"
        >
          <el-link type="primary">
            <i class="el-icon-download" />
            {{ item.fileName + item.extension }}
          </el-link>
        </a>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { cloneDeep } from 'lodash'
import { mapGetters } from 'vuex'
import { detailMixin, updateMixin, listMixin } from '@/mixins'
import { Achievement, Attachment, User, ResourceContact } from '@/api'
import { ROLE, STATE, TARGET_TYPE } from '@/data/constant'
import DockingList from '@/components/common/DockingList.vue'
import UserCard from '@/components/common/UserCard.vue'
import UserSelectDialog from '@/components/common/UserSelectDialog.vue'
import UserCascaderDialog from '@/components/common/UserCascaderDialog.vue'
import { achievementUpdateFormDesc, achievementUpdateFormDescUnNew, relativeContactTable } from '../config'
import CreateRelativeContact from '../components/createRelativeContact.vue'
// import PopularizeAchievement from '../components/popularizeAchievement.vue'
// import PopularizeList from '@/components/common/PopularizeList.vue'

const publisherSearchRoles = [ROLE.COLLEGE_ADMIN, ROLE.TECHNOLOGY_BROKER, ROLE.EXPERT]
const servantSearchRoles = [ROLE.TECHNOLOGY_BROKER]
const contactSearchRoles = [ROLE.TECHNOLOGY_BROKER, ROLE.EXPERT]

export default {
  name: 'AchievementDetail',
  components: { DockingList, UserCard, UserSelectDialog, UserCascaderDialog, CreateRelativeContact },
  mixins: [detailMixin, updateMixin, listMixin],
  data () {
    return {
      originColumns: relativeContactTable,
      pageLoading: true,
      achievementUpdateFormDesc,
      achievementUpdateFormDescUnNew,
      publisherSearchRoles,
      servantSearchRoles,
      contactSearchRoles,
      achievement: {},
      attachments: [],
      download: {
        loading: false,
        visible: false,
        files: []
      },
      AchievementVendors: [],
      achievementApproves: [],
      list: [],
      listLoading: false,
      editContactInfo: null,
      dialogVisible: false
    }
  },
  computed: {
    ...mapGetters(['tags']),
    isAccepted () {
      return this.achievement.state && this.achievement.state === STATE.ACCEPTED
    },
    hasAttachments () {
      return this.achievement.attachments && (this.achievement.attachments.length > 0)
    }
  },
  watch: {
    achievement: {
      deep: true,
      handler (data) {
        this.formData = cloneDeep(data)
        this.formData.tagIds = data.tags && data.tags.map(item => item.id)
        if (this.hasAttachments) {
          this.formData.attachmentIds = data.attachments
        }
      }
    },
    dialogVisible: {
      handler (val) {
        if (!val) {
          this.editContactInfo = null
        }
      }
    }
    // listQuery: {
    //   deep: true,
    //   handler (val) {
    //     this.getList()
    //   }
    // }
  },
  mounted () {
    this.fetchDetail()
    this.fetchAchievementApproves()
    this.getList()
    this.achievementUpdateFormDesc.tagIds.options = this.tags
    this.achievementUpdateFormDescUnNew.tagIds.options = this.tags
  },
  methods: {
    async fetchDetail () {
      try {
        const achievement = await Achievement.getAchievement(this.id)
        this.achievement = achievement
      } catch ({ message = '获取成果详情失败' }) {
        this.$message.error(message)
      } finally {
        this.pageLoading = false
      }
    },
    async fetchAchievementApproves () {
      try {
        this.achievementApproves = await Achievement.getAchievementApproves(this.id)
      } catch ({ message = '获取审核失败' }) {
        this.$message.error(message)
      } finally {
        this.pageLoading = false
      }
    },
    async onDownload () {
      try {
        this.download.loading = true
        this.attachments = await Attachment.getAttachments({
          targetId: this.id,
          targetType: TARGET_TYPE.ACHIEVEMENT
        })
        this.download.visible = true
      } finally {
        this.download.loading = false
      }
    },
    async handleUpdate (data) {
      try {
        await Achievement.saveAchievement(data)
        this.drawerFormVisible = false
        this.$message.success('更新成功')
      } finally {
        this.fetchDetail()
        this.fetchAchievementApproves()
      }
    },
    async searchBroker ({ text }, cb, roles) {
      const params = {
        page: 1,
        perPage: 1000,
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
    },
    async searchUser ({ text }, cb, roles) {
      try {
        const params = {
          page: 1,
          perPage: 200,
          state: 'accepted',
          disabled: 'false',
          role: roles.join(',')
        }
        text && (params.text = text)
        const { users } = await User.getUsers(params)
        const list = users.map(item => ({
          label: item.name,
          value: item.id,
          data: item
        }))
        cb(list)
      } catch (e) {
        cb([])
      }
    },
    async searchUserContacts ({ text }, cb, roles, teamId) {
      try {
        const params = {
          text: text,
          page: 1,
          perPage: 10000,
          state: 'accepted',
          disabled: 'false',
          roles: roles.join(','),
          teamId: teamId
        }
        const { users } = await User.getUserContacts(params)
        const list = users.map(item => ({
          label: item.name,
          value: item.id,
          data: item
        }))
        cb(list)
      } catch (e) {
        cb([])
      }
    },
    async changePublisher ({ value }, cb) {
      this.achievement.publisherId = value
      try {
        await this.changeUser()
      } finally {
        cb()
      }
    },
    async changeServant (value, cb) {
      const [servantId, teamId] = value
      this.achievement.servantId = servantId
      this.achievement.teamId = teamId
      try {
        await this.changeUser()
      } finally {
        cb()
      }
    },
    async changeContact ({ value }, cb) {
      this.achievement.contactId = value
      try {
        await this.changeUser()
      } finally {
        cb()
      }
    },
    async changeUser () {
      this.achievement = await Achievement.saveAchievement(this.achievement)
      this.$message.success('更新成功')
    },
    async visibleChange (bool) {
      try {
        !bool ? await Achievement.unPublish(this.id) : await Achievement.publish(this.id)
        this.$message.success('操作成功')
      } catch ({ message = '操作失败' }) {
        this.$message.error(message)
      } finally {
        this.fetchDetail()
      }
    },
    async handleApprove (state, reason, isStart, cb) {
      try {
        const achievement = cloneDeep(this.achievement)
        achievement.state = state
        achievement.isStart = isStart
        achievement.reason = reason
        await Achievement.verify(achievement)
        this.$message.success('操作成功')
        await this.fetchDetail()
        await this.fetchAchievementApproves()
      } catch ({ message = '操作失败' }) {
        this.$message.error(message)
      } finally {
        this.dialogFormLoading = false
        cb(this.achievement.state)
      }
    },
    onRemove () {
      const confirm = async () => await Achievement.removeAchievement(this.id)
      this.confirmRemove(confirm).then(() => {
        this.$message.success('删除成功')
        this.$store.dispatch('tagsView/delView', this.$route) // 关闭当前标签页
        this.$router.replace({ name: 'Achievements' }) // 删除成功后返回列表
      }).catch(({ message = '删除失败' }) => {
        this.$message.error(message)
      })
    },
    async getList () {
      this.listLoading = true
      try {
        const { contacts, count } = await ResourceContact.getResourceContacts({
          ...this.listQuery,
          targetType: 'achievement',
          resourceId: this.id
        })
        this.list = contacts
        this.total = count
        this.listLoading = false
      } catch ({ message = '获取相关联系人列表出错' }) {
        this.$message.error(message)
        this.listLoading = false
      }
    },
    removeContact (row) {
      const confirm = async () => await ResourceContact.removeResourceContact(row.id)
      this.confirmRemove(confirm).then(() => {
        this.$message.success('删除成功')
        this.getList()
      }).catch(({ message = '删除失败' }) => {
        this.$message.error(message)
      })
    },
    addContact () {
      this.editContactInfo = null
      this.dialogVisible = true
    },
    editContact (row) {
      this.editContactInfo = row
      this.dialogVisible = true
    },
    cancelDialog () {
      this.getList()
      this.dialogVisible = false
    }
  }
}
</script>

<style lang="scss" scoped>
.cover-container {
  display: flex;
  flex-wrap: wrap;
  .cover-item {
    width: 100px;
    height: 100px;
    margin: 0 4px 4px 0;
  }
}
.relative-contact {
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}
</style>
