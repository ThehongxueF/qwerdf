<template>
  <el-form ref="loginForm" :model="ruleForm" :rules="rules" size="large" class="login-content-form" label-position="top">
    <el-form-item prop="mobile" label="手机号">
      <el-input v-model="ruleForm.mobile" type="text" clearable autocomplete="off">
        <template #prepend>+86</template>
      </el-input>
    </el-form-item>
    <el-form-item prop="identifyCode" label="图片验证码">
      <el-row :gutter="15">
        <el-col :span="16">
          <el-input v-model="ruleForm.identifyCode" autocomplete="off" />
        </el-col>
        <el-col :span="8">
          <div class="login-content-code" style="height: 40px;" @click="getCaptcha">
            <img
              :src="captchaImg"
              alt="验证码"
              class="login-content-code-img"
            >
          </div>
        </el-col>
      </el-row>
    </el-form-item>
    <el-form-item prop="smsCode" label="短信验证码">
      <el-row :gutter="8">
        <el-col :span="14">
          <el-input v-model="ruleForm.smsCode" type="text" maxlength="6" clearable autocomplete="off">
            <!-- <template #prefix>
              <i class="el-icon-message" />
            </template> -->
          </el-input>
        </el-col>
        <el-col :span="10">
          <sms-button
            :style="{ height: '100%' }"
            class="login-content-code"
            @send="getSmsCode"
          />
        </el-col>
      </el-row>
    </el-form-item>
    <el-form-item size="small" prop="agreement">
      <el-checkbox v-model="ruleForm.agreement" size="medium" class="agreement-check">
        <UserAgreements :user-agreement="userAgreement" :privacy-agreement="privacyAgreement" :type="'login'" />
      </el-checkbox>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" class="login-content-submit" :loading="loading.signIn" @click="onSignIn">
        <span class="submit-text">登 录</span>
      </el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import { cloneDeep } from 'lodash'
import { Login } from '@/api'
import { PrevLoading } from '@/utils/loading'
import { formatAxis } from '@/utils/formatTime'
import { validPhoneNumber } from '@/utils/validate'
import SmsButton from '@/components/SmsButton.vue'
import UserAgreements from '@/components/UserAgreements.vue'
import { mapGetters, mapActions } from 'vuex'
import { v4 as uuidv4 } from 'uuid'

export default {
  name: 'LoginMobile',
  components: { SmsButton, UserAgreements },
  data () {
    const validateMobile = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入手机号'))
      } else if (!validPhoneNumber(value)) {
        callback(new Error('请输入正确的手机号码'))
      } else {
        callback()
      }
    }
    const validateCode = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入短信验证码'))
      } else {
        if (this.ruleForm.mobile !== '') {
          this.$refs.loginForm.validateField('mobile')
        }
        callback()
      }
    }
    const validateAgreement = (rule, value, callback) => {
      // if (!this.showAgreement) {
      //   callback()
      // }
      if (value !== true) {
        callback(new Error('请仔细阅读协议内容并勾选'))
      } else {
        callback()
      }
    }
    const validateIdentifyCode = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入验证码'))
      } else {
        callback()
      }
    }
    return {
      ruleForm: {
        mobile: '',
        smsCode: '',
        identifyCode: '',
        agreement: false
      },
      loading: {
        signIn: false
      },
      redirect: undefined,
      otherQuery: {},
      rules: {
        mobile: [{ validator: validateMobile, trigger: 'change' }],
        smsCode: [{ validator: validateCode, trigger: 'change' }],
        agreement: [{ validator: validateAgreement, trigger: 'change' }],
        identifyCode: [{ validator: validateIdentifyCode, trigger: 'change' }]
      },
      uuid: '',
      captchaImg: ''
    }
  },
  computed: {
    ...mapGetters(['userAgreement', 'privacyAgreement']),
    showAgreement () {
      return this.userAgreement.loginEnable || this.privacyAgreement.loginEnable
    },
    currentTime () {
      return formatAxis(new Date())
    }
  },
  watch: {
    $route: {
      handler: function (route) {
        const query = route.query
        if (query) {
          this.redirect = query.redirect
          this.otherQuery = this.getOtherQuery(query)
        }
      },
      immediate: true
    }
  },
  async created () {
    await this.getAgreement()
    this.getCaptcha()
  },
  methods: {
    ...mapActions(['getUserAgreements']),
    async getAgreement () {
      this.getUserAgreements({ type: 'user' })
      this.getUserAgreements({ type: 'privacy' })
    },
    getOtherQuery (query) {
      return Object.keys(query).reduce((acc, cur) => {
        if (cur !== 'redirect') {
          acc[cur] = query[cur]
        }
        return acc
      }, {})
    },
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
        console.error('获取验证码失败：' + message)
      }
    },
    /* 发送验证码 */
    async getSmsCode (start, finish) {
      this.$refs.loginForm.validateField('mobile', async (err) => {
        if (!err) {
          this.$refs.loginForm.validateField('identifyCode', async (err) => {
            if (!err) {
              try {
                start()
                await Login.getSmsCode({ mobile: this.ruleForm.mobile, captchaCode: this.ruleForm.identifyCode, captchaId: this.uuid })
                this.$message.info('验证码已发送！')
              } catch (error) {
                this.getCaptcha()
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
    async onSignIn () {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading.signIn = true
          const data = cloneDeep(this.ruleForm)

          this.$store.dispatch('user/login', data)
            .then(() => {
              this.loading.signIn = false
              this.signInSuccess()
            })
            .catch((e) => {
              this.loading.signIn = false
              this.getCaptcha()
            })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    signInSuccess () {
      PrevLoading.start()
      // 初始化登录成功时间问候语
      const currentTimeInfo = this.currentTime
      // 登录成功，跳到转首页
      this.$router.push({ path: this.redirect || '/', query: this.otherQuery })
      // 登录成功提示
      setTimeout(() => {
        // 关闭 loading
        this.loading.signIn = false
        const signInText = '欢迎回来！'
        this.$message.success(`${currentTimeInfo}，${signInText}`)
      }, 300)
    }
  }
}
</script>

<style scoped lang="scss">
.login-content-form {
	margin-top: 20px;
  ::v-deep {
        .el-form-item__label {
          color: rgba(255, 255, 255, 0.69);
          font-size: 12px;
          line-height: 10px;
        }

        .el-input__inner {
          padding: 0px 2px;
          background: transparent;
          border: none;
          border-bottom: 1px solid rgba(255, 255, 255, 0.16);
          border-radius: none;
          color: #ffffff;
          // -webkit-box-shadow: 0 0 0 1000px rgba(255, 255, 255, 0.16) inset;
          // -webkit-text-fill-color: #ffffff !important;
        }
        .el-input-group__prepend {
          background-color: transparent;
          border: none;
          border-bottom: 1px solid rgba(255, 255, 255, 0.16);
        }
    }
	.login-content-code {
		width: 100%;
	}
	.login-content-submit {
		width: 100%;
		height: 48px;
		letter-spacing: 2px;
		font-weight: 300;
		margin-top: 15px;

		.submit-text {
			font-size: 16px;
			line-height: 24px;
			font-weight: 500;
		}
	}
}
</style>
