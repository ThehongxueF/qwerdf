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
            @on-search="(query, cb) => searchUserContacts(query, contactSearchRoles, cb)"
          />
        </el-form-item>
      </el-col>
      <el-col :span="24" class="mb20 mt35 flex-center">
        <div class="form-footer">
          <el-button :loading="loading" type="primary" @click="() => onSubmit()">提交</el-button>
          <el-button @click="() => cancel()">取消</el-button>
        </div>
      </el-col>
    </el-row>
  </el-form>
</template>
<script>
import { User } from '@/api'
import { ROLE } from '@/data/constant'
import UserSearchSelect from '@/components/Form/SearchSelect.vue'
import UserSearchCascader from '@/components/common/UserSearchCascader.vue'

const servantSearchRoles = [ROLE.TECHNOLOGY_BROKER]

export default {
  components: { UserSearchSelect, UserSearchCascader },
  props: {
    userInfo: {
      type: Object,
      default: () => {}
    },
    type: {
      type: String,
      default: 'demand'
    }
  },
  data () {
    return {
      loading: false,
      servantSearchRoles,
      formData: {
        servant: null,
        contactId: null,
        publisherId: null
      },
      formRules: {
        servant: [{ required: true, message: '请选择技术经纪人', trigger: 'change' }],
        contactId: [{ required: true, message: '请选择联系人', trigger: 'change' }]
      }
    }
  },
  computed: {
    publisherSearchRoles () {
      return this.type === 'demand' ? [ROLE.COLLEGE_ADMIN, ROLE.TECHNOLOGY_BROKER, ROLE.ENTERPRISE_PERSON] : [ROLE.COLLEGE_ADMIN, ROLE.TECHNOLOGY_BROKER, ROLE.EXPERT]
    },
    contactSearchRoles () {
      return this.type === 'demand' ? [ROLE.TECHNOLOGY_BROKER, ROLE.ENTERPRISE_PERSON] : [ROLE.TECHNOLOGY_BROKER, ROLE.EXPERT]
    }
  },
  watch: {
    userInfo: {
      immediate: true,
      deep: true,
      handler (val) {
        this.formData.servant = this.userInfo && this.userInfo.collegeBrokerId && this.userInfo.teamId && [String(this.userInfo.collegeBrokerId), String(this.userInfo.teamId)]
        this.formData.contactId = this.userInfo && this.userInfo.contactId && String(this.userInfo.contactId)
        this.formData.publisherId = this.userInfo && this.userInfo.publisherId && String(this.userInfo.publisherId)
      }
    }
  },
  methods: {
    cancel () {
      this.$emit('cancel')
    },
    async handleSearchBroker (text, roles, cb) {
      const params = {
        pageNo: 1,
        pageSize: 1000,
        text,
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
        pageNo: 1,
        pageSize: 100,
        text,
        role: roles.join(',')
      }
      try {
        const { users } = await User.getUsers(params)
        const list = users.map(user => ({ label: user.name, value: `${user.id}`, data: user }))
        cb(list)
      } catch (e) {
        cb([])
      }
    },
    async searchUserContacts (text, roles, cb) {
      try {
        const params = {
          text: text,
          pageNo: 1,
          pageSize: 10000,
          state: 'accepted',
          disabled: 'false',
          roles: roles.join(','),
          teamId: this.formData.servant[1]
        }
        const { users } = await User.getUserContacts(params)
        const list = users.map(item => ({
          label: item.name,
          value: item.id + '',
          data: item
        }))
        cb(list)
      } catch (e) {
        cb([])
      }
    },
    // 新增
    onSubmit (recreate) {
      this.$refs.ruleForm.validate(async (valid) => {
        if (valid) {
          this.loading = true
          const [servantId, teamId] = this.formData.servant
          const data = {
            servantId: +servantId,
            teamId: +teamId,
            contactId: +this.formData.contactId,
            publisherId: +this.formData.publisherId
          }
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
