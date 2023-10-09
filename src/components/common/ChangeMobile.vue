<!--
* 更改手机号弹窗组件。
*
* @props
* value 控制弹窗显示与隐藏 建议使用v-model
* mobile 初始手机号 必选项
*
* @emit
* validate 验证手机号 导出所需数据 需回调
* submit 保存手机号 导出所需数据 需回调
-->
<template>
  <el-dialog
    v-bind="$attrs"
    title="修改手机号"
    :visible.sync="visible"
    :close-on-click-modal="false"
    v-on="$listeners"
  >
    <template v-if="visible">
      <el-form
        v-if="step === 0"
        key="changeForm"
        ref="changeForm"
        :model="formData"
        :rules="formRules"
        label-width="auto"
      >
        <h4>为了确保为您本人操作，请先进行安全验证</h4>
        <el-form-item prop="mobile">
          <!-- <el-input v-model="formData.mobile" type="text" placeholder="请输入手机号" clearable autocomplete="off">
            <template #prepend>+86</template>
          </el-input> -->
          {{ mobile }}
        </el-form-item>
        <el-form-item prop="identifyCode">
          <el-row :gutter="15">
            <el-col :span="16">
              <el-input v-model="formData.identifyCode" autocomplete="off" placeholder="验证码" />
            </el-col>
            <el-col :span="8">
              <div style="height:36px;" @click="getCaptcha">
                <img
                  :src="captchaImg"
                  alt="验证码"
                >
              </div>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item prop="code">
          <el-row :gutter="8">
            <el-col :span="14">
              <el-input v-model="formData.code" type="text" maxlength="6" placeholder="请输入短信验证码" clearable autocomplete="off">
                <template #prefix>
                  <i class="el-icon-message" />
                </template>
              </el-input>
            </el-col>
            <el-col :span="10">
              <sms-button
                :style="{ height: '100%' }"
                @send="getSmsCode"
              />
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item>
          <el-button :loading="loading" type="primary" @click="handleValidateSubmit">确认</el-button>
        </el-form-item>
      </el-form>
      <el-form
        v-if="step === 1"
        key="newForm"
        ref="newForm"
        :model="newFormData"
        :rules="newFormRules"
        label-width="auto"
      >
        <h4>请输入您要绑定的手机号</h4>
        <el-form-item prop="mobile">
          <el-input v-model="newFormData.mobile" type="text" placeholder="请输入手机号" clearable autocomplete="off">
            <template #prepend>+86</template>
          </el-input>
        </el-form-item>
        <el-form-item prop="identifyCode">
          <el-row :gutter="15">
            <el-col :span="16">
              <el-input v-model="newFormData.identifyCode" autocomplete="off" placeholder="验证码" />
            </el-col>
            <el-col :span="8">
              <div style="height:36px;" @click="getNewCaptcha">
                <img
                  :src="newCaptchaImg"
                  alt="验证码"
                >
              </div>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item prop="code">
          <el-row :gutter="8">
            <el-col :span="14">
              <el-input v-model="newFormData.code" type="text" maxlength="6" placeholder="请输入短信验证码" clearable autocomplete="off">
                <template #prefix>
                  <i class="el-icon-message" />
                </template>
              </el-input>
            </el-col>
            <el-col :span="10">
              <sms-button
                :style="{ height: '100%' }"
                @send="getNewSmsCode"
              />
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item>
          <el-button :loading="newLoading" type="primary" @click="handleSubmit">确认</el-button>
        </el-form-item>
      </el-form>
    </template>
  </el-dialog>
</template>

<script>
import { cloneDeep } from 'lodash'
import { validPhoneNumber } from '@/utils/validate'
import SmsButton from '@/components/SmsButton.vue'
import { v4 as uuidv4 } from 'uuid'
import { Login, User } from '@/api'

export default {
  name: 'ChangeMobile',
  components: { SmsButton },
  props: {
    value: {
      type: Boolean,
      default: false
    },
    mobile: {
      type: String,
      require: true,
      default: ''
    }
  },
  data () {
    const validateMobile = (rule, value, callback) => {
      if (!value) {
        callback(new Error('请输入手机号'))
      } else if (!validPhoneNumber(value)) {
        callback(new Error('请输入正确的手机号码'))
      } else {
        callback()
      }
    }
    const validateCode = (rule, value, callback) => {
      if (!value) {
        callback(new Error('请输入短信验证码'))
      } else {
        if (this.formData.mobile !== '') {
          this.$refs.changeForm.validateField('mobile')
        }
        callback()
      }
    }
    const validateNewCode = (rule, value, callback) => {
      if (!value) {
        callback(new Error('请输入短信验证码'))
      } else {
        if (this.newFormData.mobile !== '') {
          this.$refs.newForm.validateField('mobile')
        }
        callback()
      }
    }
    const validateIdentifyCode = (rule, value, callback) => {
      if (!value) {
        callback(new Error('请输入验证码'))
      } else {
        callback()
      }
    }
    return {
      captchaImg: null,
      loading: false,
      formRules: {
        identifyCode: [{ validator: validateIdentifyCode, trigger: 'change' }],
        code: [{ validator: validateCode, trigger: 'change' }]
      },
      formData: {},
      uuid: '',
      newCaptchaImg: null,
      newLoading: false,
      newFormRules: {
        mobile: [{ validator: validateMobile, trigger: 'change' }],
        identifyCode: [{ validator: validateIdentifyCode, trigger: 'change' }],
        code: [{ validator: validateNewCode, trigger: 'change' }]
      },
      newFormData: {},
      newUuid: '',
      step: 0
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
    value: {
      immediate: true,
      handler (val) {
        if (val) {
          this.step = 0
          this.formData = {}
          this.newFormData = {}
          this.getCaptcha()
        }
      }
    }
  },
  methods: {
    async getCaptcha () {
      this.uuid = uuidv4()
      try {
        const data = await Login.getCaptcha({
          height: 40,
          width: 90,
          captchaId: this.uuid
        })
        const blob = new Blob([data], { type: 'image/png' })
        this.captchaImg = URL.createObjectURL(blob)
      } catch ({ message }) {
        this.$message.error('获取验证码失败：' + message)
      }
    },
    /* 发送验证码 */
    async getSmsCode (start, finish) {
      this.$refs.changeForm.validateField('identifyCode', async (err) => {
        if (!err) {
          try {
            start()
            await User.checkMobileVerification({ mobile: this.mobile, captchaCode: this.formData.identifyCode, captchaId: this.uuid })
            this.$message.info('验证码已发送！')
          } catch (err) {
            this.getCaptcha()
            finish()
          }
        } else {
          return false
        }
      })
    },
    async getNewCaptcha () {
      this.newUuid = uuidv4()
      try {
        const data = await Login.getCaptcha({
          height: 40,
          width: 90,
          captchaId: this.newUuid
        })
        const blob = new Blob([data], { type: 'image/png' })
        this.newCaptchaImg = URL.createObjectURL(blob)
      } catch ({ message }) {
        this.$message.error('获取验证码失败：' + message)
      }
    },
    /* 发送验证码 */
    async getNewSmsCode (start, finish) {
      this.$refs.newForm.validateField('mobile', async (err1) => {
        if (!err1) {
          this.$refs.newForm.validateField('identifyCode', async (err) => {
            if (!err) {
              try {
                start()
                await User.checkMobileVerification({ mobile: this.newFormData.mobile, captchaCode: this.newFormData.identifyCode, captchaId: this.newUuid })
                this.$message.info('验证码已发送！')
              } catch (err) {
                this.getNewCaptcha()
                finish()
              }
            } else {
              return false
            }
          })
        } else {
          return false
        }
      })
    },
    handleValidateSubmit () {
      this.$refs.changeForm.validate((valid) => {
        if (valid) {
          this.loading = true
          this.$emit('validate', { code: this.formData.code }, (err) => {
            this.loading = false
            if (err) {
              this.getCaptcha()
            } else {
              this.getNewCaptcha()
              this.step = 1
            }
          })
        } else {
          return false
        }
      })
    },
    handleSubmit () {
      this.$refs.newForm.validate((valid) => {
        if (valid) {
          this.newLoading = true
          const data = cloneDeep(this.newFormData)
          Object.freeze(data)
          this.$emit('submit', data, (err) => {
            this.newLoading = false
            if (err) {
              this.getNewCaptcha()
            }
          })
        } else {
          return false
        }
      })
    }
  }
}
</script>
