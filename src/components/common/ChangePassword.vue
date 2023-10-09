<!--
* 更改手机号弹窗组件。
*
* @props
* value 控制弹窗显示与隐藏 建议使用v-model
*
* @emit
* submit 保存密码 导出所需数据 需回调
-->
<template>
  <el-dialog
    v-bind="$attrs"
    title="修改密码"
    :visible.sync="visible"
    v-on="$listeners"
  >
    <el-form
      v-if="visible"
      ref="changeForm"
      :model="formData"
      :rules="formRules"
      label-width="auto"
    >
      <el-form-item prop="oldPassword" label="旧密码">
        <el-input
          v-model.trim="formData.oldPassword"
          type="password"
          autocomplete="off"
          placeholder="请输入旧密码"
          clearable
        />
      </el-form-item>

      <CheckPasswordStrength
        ref="strengthCheck"
        title="密码至少包含数字、大写字母、小写字母、特殊字符中的三种类型"
        :visible.sync="strengthCheck"
        :level="strengthLevel"
      >
        <el-form-item prop="password" label="新密码">
          <el-input
            v-model="formData.password"
            type="password"
            autocomplete="off"
            placeholder="请输入新密码"
            clearable
            @focus="strengthCheck = true"
            @blur="strengthCheck = false"
          />
        </el-form-item>
      </CheckPasswordStrength>
      <el-form-item prop="checkPass" label="确认密码">
        <el-input
          v-model="formData.checkPass"
          type="password"
          autocomplete="off"
          placeholder="请确认密码"
          clearable
        />
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取 消</el-button>
      <el-button :loading="loading" type="primary" @click="handleSubmit">修 改</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { cloneDeep, isEmpty } from 'lodash'
import { strStrength } from '@/utils/validate'
import CheckPasswordStrength from '@/components/Form/CheckPasswordStrength.vue'

export default {
  name: 'ChangePassword',
  components: { CheckPasswordStrength },
  props: {
    value: {
      type: Boolean,
      default: false
    }
  },
  data () {
    const validatePass1 = (rule, value, callback) => {
      if (isEmpty(value)) {
        callback(new Error('请输入密码'))
      } else {
        if (this.formData.checkPass !== '') {
          this.$refs.changeForm.validateField('checkPass')
        }
        callback()
      }
    }
    const validatePass2 = (rule, value, callback) => {
      if (isEmpty(value)) {
        callback(new Error('请确认密码'))
      } else if (value !== this.formData.password) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }

    const validatePassStrength = (rule, value, callback) => {
      if (value) {
        const level = strStrength(value)
        this.strengthLevel = level
        if (level >= 3) {
          callback()
        } else if (level < 0) {
          callback(new Error('包含非法字符'))
        } else {
          callback(new Error('密码强度不够'))
        }
      } else {
        this.strengthLevel = 0
      }
    }
    const rules = {
      oldPassword: [{ required: true, message: '请输入旧密码', trigger: 'change' }],
      password: [
        { required: true, validator: validatePass1, trigger: 'change' },
        { min: 8, message: '密码不能少于8个字符', trigger: 'change' },
        { min: 8, message: '密码不能少于8个字符', trigger: 'change' },
        { max: 16, message: '密码不能超过16个字符', trigger: 'change' },
        { max: 16, message: '密码不能超过16个字符', trigger: 'change' },
        { validator: validatePassStrength, trgger: 'change' }
      ],
      checkPass: [{ required: true, validator: validatePass2, trigger: 'change' }]
    }
    return {
      loading: false,
      formRules: rules,
      formData: {},
      strengthCheck: false,
      strengthLevel: 0
    }
  },
  computed: {
    visible: {
      get () {
        return this.value
      },
      set (val) {
        this.$emit('input', val)
      }
    }
  },
  watch: {
    visible (val) {
      if (!val) {
        this.$nextTick(() => {
          this.formData = {}
          this.strengthLevel = 0 // 重置密码强度级别
        })
      }
    }
  },
  methods: {
    handleSubmit () {
      this.$refs.changeForm.validate((valid) => {
        if (valid) {
          this.loading = true
          const data = cloneDeep(this.formData)
          delete data.checkPass
          Object.freeze(data)
          this.$emit('submit', data, () => {
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
