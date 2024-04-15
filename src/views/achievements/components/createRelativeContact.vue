<template>
  <div>
    <el-form ref="form" :rules="rules" :model="form" label-width="80px">
      <el-form-item label="单位" prop="enterpriseName" required>
        <el-select
          v-model="form.enterpriseName"
          filterable
          remote
          reserve-keyword
          :remote-method="remoteEnterpriseMethod"
          style="width: 100%;"
          allow-create
          default-first-option
          placeholder="请输入或选择单位"
          clearable
          :loading="loading"
        >
          <el-option
            v-for="item in enterpriseOptions"
            :key="item.id"
            :label="item.value"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="姓名" prop="name" required>
        <el-select
          v-model="form.name"
          filterable
          remote
          reserve-keyword
          style="width: 100%;"
          :remote-method="remoteNameMethod"
          allow-create
          default-first-option
          placeholder="请输入或选择姓名"
          clearable
          :loading="loading"
        >
          <el-option
            v-for="item in nameOptions"
            :key="item.id"
            :label="item.value"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="职位" prop="position" required>
        <el-input v-model="form.position" placeholder="请输入职位" />
      </el-form-item>
      <el-form-item label="手机号" prop="mobile">
        <el-input v-model="form.mobile" placeholder="请输入手机号" />
      </el-form-item>
      <el-form-item>
        <el-button @click="cancel">取消</el-button>
        <el-button type="primary" @click="submitForm('form')">提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { ResourceContact } from '@/api'
// import { validNumber } from '@/utils/validate'

export default {
  props: {
    resourceId: {
      type: String, Number,
      required: true
    },
    targetType: {
      type: String,
      required: true
    },
    editContactInfo: {
      type: Object,
      default: () => null
    }
  },
  data () {
    // const validateMobile = (rule, value, callback) => {
    //   if (!value) {
    //     callback(new Error('请输入手机号'))
    //   } else if (!validNumber(value)) {
    //     callback(new Error('请输入正确的号码'))
    //   } else {
    //     callback()
    //   }
    // }
    return {
      form: {
        enterpriseName: '',
        name: '',
        position: '',
        mobile: ''
      },
      rules: {
        enterpriseName: [{ required: true, message: '请输入或选择企业', trigger: 'change' }],
        name: [{ required: true, message: '请输入或选择姓名', trigger: 'change' }],
        position: [{ required: true, message: '请输入职位', trigger: 'blur' }]
        // mobile: [{ validator: validateMobile, trigger: 'blur' }]
      },
      enterprisesList: [],
      enterpriseOptions: [],
      nameOptions: [],
      contactsList: [],
      loading: false,
      formDataName: ''
    }
  },
  watch: {
    'form.enterpriseName': {
      handler (val) {
      }
    },
    'form.name': {
      handler (val) {
        if (typeof (val) === 'number') {
          this.currentInfo = this.contactsList.find(item => item.id === val)
          this.form.position = this.currentInfo.position
          this.form.mobile = this.currentInfo.mobile
          this.formDataName = this.currentInfo.name
        } else {
          this.formDataName = val
        }
      }
    }
  },
  created () {
    if (this.editContactInfo) {
      this.form = this.editContactInfo
      this.enterpriseId = this.editContactInfo.enterpriseContact && this.editContactInfo.enterpriseContact.enterprise.id
      this.form = {
        id: this.editContactInfo.id,
        enterpriseName: this.editContactInfo.enterpriseContact && this.editContactInfo.enterpriseContact.enterprise.name,
        name: this.editContactInfo.enterpriseContact && this.editContactInfo.enterpriseContact.name,
        position: this.editContactInfo.enterpriseContact && this.editContactInfo.enterpriseContact.position,
        mobile: this.editContactInfo.enterpriseContact && this.editContactInfo.enterpriseContact.mobile
      }
    }
  },
  methods: {
    async remoteEnterpriseMethod (query) {
      this.enterpriseOptions = []
      this.enterprisesList = []
      if (query !== '') {
        this.form.enterpriseName = query
        this.loading = true
        await this.searchEnterprise(query)
        setTimeout(() => {
          if (this.enterprisesList && this.enterprisesList.length > 0) {
            this.enterpriseOptions = this.enterprisesList.map(item => {
              return {
                id: item.id,
                value: item.name
              }
            })
          }
          this.loading = false
        })
      } else {
        this.enterprisesList = []
        this.enterpriseOptions = []
      }
    },
    async remoteNameMethod (query) {
      this.nameOptions = []
      if (query !== '') {
        // this.form.name = query
        this.formDataName = query
        this.loading = true
        await this.searchResourceContacts(query)
        setTimeout(() => {
          if (this.contactsList && this.contactsList.length > 0) {
            this.nameOptions = this.contactsList.map(item => {
              return {
                id: item.id,
                value: item.name
              }
            })
          }
          this.loading = false
        })
      } else {
        this.nameOptions = []
      }
    },
    async searchEnterprise (name) {
      const params = {
        pageNo: 1,
        pageSize: 100,
        name: name
      }
      try {
        const { enterprises } = await ResourceContact.searchAchievementEnterprise(params)
        this.enterprisesList = enterprises
      } catch (err) {
        console.log(err)
      }
    },
    async searchResourceContacts (name) {
      try {
        const params = {
          pageNo: 1,
          pageSize: 20,
          enterpriseName: this.form.enterpriseName,
          name: name
        }
        const { contacts } = await ResourceContact.searchResourceContacts(params)
        this.contactsList = contacts
      } catch (err) {
        console.log(err)
      }
    },
    submitForm (formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          try {
            const params = {
              enterpriseAndConcatParams: {
                enterpriseContactParams: {
                  id: typeof (this.form.name) === 'number' ? this.form.name : null,
                  name: (this.currentInfo && this.currentInfo.name) || this.form.name,
                  mobile: this.form.mobile,
                  position: this.form.position
                },
                id: null,
                name: this.form.enterpriseName
              },
              id: this.form.id || null
            }
            await ResourceContact.saveResourceContact({ ...params, resourceId: this.resourceId, targetType: this.targetType })
            this.$message.success('提交成功')
            this.$emit('cancelDialog')
          } catch (err) {
            console.log(err)
          }
        } else {
          return false
        }
      })
    },
    // resetForm (formName) {
    //   this.$refs[formName].resetFields()
    // },
    cancel () {
      this.$emit('cancelDialog')
    }
  }
}
</script>
