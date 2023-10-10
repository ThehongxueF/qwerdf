<template>
  <el-form ref="loginForm" :model="ruleForm" :rules="rules" size="large" class="login-content-form" label-position="top">
    <el-form-item prop="account" label="用户名">
      <el-input v-model="ruleForm.account" placeholder="请输入用户名" type="text" clearable autocomplete="off">
        <!-- <template #prefix>
          <i class="el-input__icon el-icon-user" />
        </template> -->
      </el-input>
    </el-form-item>
    <el-form-item prop="password" label="密码">
      <el-input
        v-model="ruleForm.password"
        type="password"
        autocomplete="off"
        placeholder="请输入密码"
        show-password
      />
    </el-form-item>
    <el-form-item prop="identifyCode">
      <el-row :gutter="15">
        <el-col :span="16">
          <el-input v-model="ruleForm.identifyCode" autocomplete="off" />
        </el-col>
        <el-col :span="8">
          <div class="login-content-code" @click="getCaptcha">
            <img :src="captchaImg" alt="验证码" class="login-content-code-img">
          </div>
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
import { v4 as uuidv4 } from 'uuid'
import { PrevLoading } from '@/utils/loading'
import { formatAxis } from '@/utils/formatTime'
import { Login } from '@/api'
import { validPhoneNumber, validEmail } from '@/utils/validate'
import UserAgreements from '@/components/UserAgreements.vue'
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'LoginAccount',
  components: {
    UserAgreements
  },
  data () {
    const validateAccount = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入用户名'))
      } else {
        callback()
      }
    }
    const validatePassword = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
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
    const validateAgreement = (rule, value, callback) => {
      if (value !== true) {
        callback(new Error('请仔细阅读协议内容并勾选'))
      } else {
        callback()
      }
    }
    return {
      uuid: '',
      identifyCode: '',
      captchaImg: null,
      ruleForm: {
        account: process.env.VUE_APP_LOGIN_USERNAME,
        password: process.env.VUE_APP_LOGIN_PASSWORD,
        identifyCode: '',
        agreement: false
      },
      loading: {
        signIn: false
      },
      redirect: undefined,
      otherQuery: {},
      rules: {
        account: [{ validator: validateAccount, trigger: 'change' }],
        password: [{ validator: validatePassword, trigger: 'change' }],
        identifyCode: [{ validator: validateIdentifyCode, trigger: 'change' }],
        agreement: [{ validator: validateAgreement, trigger: 'change' }]
      }
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
  mounted () {
    this.$nextTick(async () => {
      await this.getCaptcha()
      await this.getAgreement()
    })
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
        this.$message.error('获取验证码失败：' + message)
      }
    },
    async onSignIn () {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading.signIn = true
          const data = cloneDeep(this.ruleForm)
          switch (true) {
            case validEmail(data.account):
              data.email = data.account
              break
            case validPhoneNumber(data.account):
              data.mobile = data.account
              break
            default:
              data.username = data.account
              break
          }
          data.captchaId = this.uuid
          data.captchaCode = data.identifyCode
          delete data.account
          delete data.identifyCode
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
          color: #aaaaaa;
          line-height: 10px;
          font-size: 12px;
        }

        .el-input__inner {
          padding: 0px 10px;
          background: transparent;
          border: none;
          border: 1px solid #ebebeb;
          border-radius: none;
          color: #aaaaaa;
          // -webkit-box-shadow: 0 0 0 1000px rgba(255, 255, 255, 0.16) inset;
          // -webkit-text-fill-color: #ffffff !important;
        }
    }
	.login-content-password {
		display: inline-block;
		width: 25px;
		cursor: pointer;
		&:hover {
			color: #909399;
		}
	}
	.login-content-code {
    width: 100%;
		display: flex;
		align-items: center;
		justify-content: stretch;
		.login-content-code-img {
      object-fit: contain;
			width: 100%;
			height: 40px;
			line-height: 40px;
			background-color: #ffffff;
			border: 1px solid rgb(220, 223, 230);
			color: #333;
			font-size: 16px;
			font-weight: 700;
			letter-spacing: 5px;
			text-indent: 5px;
			text-align: center;
			cursor: pointer;
			transition: all ease 0.2s;
			border-radius: 4px;
			user-select: none;
			&:hover {
				border-color: #c0c4cc;
				transition: all ease 0.2s;
			}
		}
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
