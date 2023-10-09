<template>
  <el-form ref="ruleForm" :model="formData" :rules="formRules" label-position="top">
    <el-row :gutter="35">
      <el-col :span="24" class="mb20">
        <el-form-item prop="publisherId" label="创建人">
          <UserSearchSelect
            v-model="formData.publisherId"
            style="width: 100%;"
            @on-search="(query, cb) => handleSearch(query, publisherSearchRoles, cb)"
          />
        </el-form-item>
      </el-col>
      <el-col :span="24" class="mb20">
        <el-form-item prop="servant" label="技术经纪人">
          <UserSearchCascader
            v-model="formData.servant"
            placeholder="选择技术经纪人"
            :disabled="disableServant"
            style="width: 100%;"
            @on-search="(query, cb) => handleSearchBroker(query, servantSearchRoles, cb)"
          />
        </el-form-item>
      </el-col>
      <el-col :span="24" class="mb20">
        <el-form-item prop="contactId" label="联系人">
          <UserSearchSelect
            v-model="formData.contactId"
            :disabled="!formData.servant"
            style="width: 100%;"
            :change-servant="servant"
            @on-search="(query, cb) => searchUserContacts(query, contactSearchRoles, cb)"
          />
        </el-form-item>
      </el-col>
      <el-col :span="24" class="mb20 mt35 flex-center">
        <div class="form-footer">
          <el-button @click="onBack">返回上一步</el-button>
          <el-button :loading="loading" type="primary" @click="() => onSubmit(false, true)">暂存</el-button>
          <el-button :loading="loading" type="primary" @click="() => onSubmit()">{{ submitBtnText }}</el-button>
          <el-button :loading="loading" type="primary" plain @click="() => onSubmit(true)">提交并继续新增</el-button>
        </div>
      </el-col>
    </el-row>
  </el-form>
</template>
<script>
import { mapGetters } from 'vuex'
import { User } from '@/api'
import { ROLE } from '@/data/constant'
import UserSearchSelect from '@/components/Form/SearchSelect.vue'
import UserSearchCascader from '@/components/common/UserSearchCascader.vue'

const publisherSearchRoles = [ROLE.COLLEGE_ADMIN, ROLE.TECHNOLOGY_BROKER, ROLE.EXPERT]
const servantSearchRoles = [ROLE.TECHNOLOGY_BROKER]
const contactSearchRoles = [ROLE.TECHNOLOGY_BROKER, ROLE.EXPERT]

export default {
  components: { UserSearchSelect, UserSearchCascader },
  inject: ['handleRecreate'],
  props: {
    submitBtnText: {
      type: String,
      default: '提交审核'
    }
  },
  data () {
    return {
      loading: false,
      publisherSearchRoles,
      servantSearchRoles,
      contactSearchRoles,
      formData: {
        servant: null,
        contactId: null,
        publisherId: null
      },
      formRules: {
        publisherId: [{ required: true, message: '请选择创建人', trigger: 'change' }],
        servant: [{ required: true, message: '请选择技术经纪人', trigger: 'change' }],
        contactId: [{ required: true, message: '请选择联系人', trigger: 'change' }]
      },
      publisherList: [],
      isBroker: false
    }
  },
  computed: {
    ...mapGetters(['userInfo']),
    publisher () {
      return this.formData.publisherId
    },
    disableServant () {
      return (!this.formData.publisherId) || (this.isBroker)
    },
    servant () {
      return this.formData.servant
    }
  },
  watch: {
    servant: {
      handler (val) {
        this.formData.contactId = null
      }
    },
    publisher: {
      handler (val) {
        if (this.publisher && this.publisherList) {
          const servantData = this.publisherList.filter(item => item.value === this.formData.publisherId)[0]
          if (servantData.data.role === 'technology_broker' && servantData.data.teams.length !== 0) {
          // 所选创建人为有团队信息的技术经纪人, 技术经纪人回填且禁止选择
            this.formData.servant = [servantData.value, servantData.data.teams[0].id]
            this.isBroker = true
          } else {
            this.formData.servant = null
            this.isBroker = false
          }
        } else {
          this.formData.servant = null
          this.isBroker = false
        }
        this.formData.contactId = null
      }
    }
  },
  methods: {
    onBack () {
      this.$emit('prev')
    },
    async handleSearchBroker (text, roles, cb) {
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
    // 检索用户
    async handleSearch (text, roles, cb) {
      const params = {
        page: 1,
        perPage: 100,
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
    async searchUserContacts (text, roles, cb) {
      try {
        const params = {
          text: text,
          page: 1,
          perPage: 10000,
          state: 'accepted',
          disabled: 'false',
          roles: roles.join(','),
          teamId: this.formData.servant[1]
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
    // 新增
    onSubmit (recreate, isStage) {
      this.$refs.ruleForm.validate(async (valid) => {
        if (valid) {
          this.loading = true
          if (!this.formData.publisherId) {
            this.formData.publisherId = this.userInfo.id
          }
          const [servantId, teamId] = this.formData.servant
          const data = {
            servantId: +servantId,
            teamId: +teamId,
            contactId: +this.formData.contactId,
            publisherId: +this.formData.publisherId,
            isToApprove: !isStage
          }
          this.handleRecreate(recreate) // 提交并继续新增 boolean
          this.$emit('on-submit', data, () => {
            this.loading = false
          })
        } else {
          return false
        }
      })
    }
  }
}
</script>
