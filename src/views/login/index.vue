<template>
  <div class="login-container">
    <div class="login-container-mask" />
    <div class="login-container-center">
      <div class="image-content">
        <div class="image-content-title">
          <img src="@/assets/login/logo.png" alt="">
        </div>
        <div class="image-content-content">
          欢迎来到
          <div class="image-content-welcome">
            Welcome to
          </div>
          <div class="image-content-name">
            <div>中国工程院院士专家成果转化中心</div>
            <div style="color:#ff7800">技术转移综合管理系统</div>
          </div>
        </div>
      </div>
      <div class="form-content">
        <div class="login-content" :class="{ 'login-content-mobile': tabsActiveName === 'mobile' }">
          <div class="login-content-main">
            <!-- <h5 v-if="collegeInfo" class="login-content-subtitle">{{ collegeInfo && collegeInfo.name.slice(0,14) }}</h5>
            <h4 class="login-content-title">技术转移综合管理系统</h4> -->
            <h4 class="login-content-title">登录</h4>
            <el-tabs v-model="tabsActiveName" class="add-padding" stretch @tab-click="onTabsClick">
              <el-tab-pane v-if="showCode" label="验证码登录" name="mobile" :disabled="tabsActiveName === 'mobile'">
                <transition name="el-zoom-in-center">
                  <Mobile v-show="!isTabPaneShow" />
                </transition>
              </el-tab-pane>
              <el-tab-pane label="密码登录" name="account" :disabled="tabsActiveName === 'account'">
                <transition name="el-zoom-in-center">
                  <Account v-show="isTabPaneShow" />
                </transition>
              </el-tab-pane>
            </el-tabs>
            <!-- <div class=ee -->
            <div class="add-padding login-content-links">
              <el-button
                v-if="tabsActiveName === 'account'"
                class="forget-password"
                type="text"
                size="small"
                @click="$router.push({ name: 'passwordReset' })"
              >忘记密码？</el-button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <FooterBottom class="login-footer" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Account from './components/account.vue'
import Mobile from './components/mobile.vue'
import FooterBottom from '@/components/common/FooterBottom.vue'

export default {
  components: { Account, Mobile, FooterBottom },
  data () {
    return {
      tabsActiveName: 'account',
      isTabPaneShow: true
    }
  },
  computed: {
    ...mapGetters(['collegeInfo']),
    showCode () {
      return process.env.VUE_APP_USE_SMS === 'true'
    }
  },
  methods: {
    onTabsClick () {
      this.isTabPaneShow = !this.isTabPaneShow
    }
  }
}
</script>

<style scoped lang="scss">
.login-container {
	width: 100%;
	height: 100%;
	background: url('~@/assets/login/background.png') center no-repeat;
	background-size: cover;
	padding: 100px 50px;
  overflow-y: auto;
  /* firefox */
  scrollbar-width: none;
  .login-container-mask{
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    background:rgba(255,255,255,0.2);
  }
	.login-container-center {
    margin: 0 auto;
    display: flex;
    max-width: 1600px;
    height: 100%;
    min-height: 550px;

    border-radius: 8px;
    overflow: hidden;
    .image-content {
      flex: 5;
      height: 100%;
      max-width: 1000px;
      position: relative;
      padding: 35px 45px;
      background: rgba(20, 20, 36, 0.5);
      color: white;
      .image-content-title {
        color: white;
        img {
          width: 315px;
          height: 42px;
        }
      }
      .image-content-content {
        margin-top: 180px;
        margin-left: 109px;
        font-size: 48px;
        line-height: 72px;
        font-weight: 700;
        position: relative;
      }
      .image-content-welcome {
        position: absolute;
        top: 35px;
        font-size: 72px;
        -webkit-text-stroke: 1px rgba(255,255,255,0.1); //文字描边
        color: transparent;   //字体颜色设置为透明
      }
      .image-content-name {
        margin-top: 68px;
      }
    }
		.form-content {
			padding: 20px;
			flex: 3;
			background-color: rgba(16, 18, 30, 0.7);
			transition: height 0.2s linear;
			overflow-x: hidden;
      overflow-y: scroll;
			z-index: 1;
			display: flex;
			align-items: center;
		}
		.form-content::-webkit-scrollbar {
      display: none;
    }
	}

	.login-content {
		transition: height 0.2s linear;
		overflow: hidden;
		z-index: 1;
		display: flex;
		align-items: center;
		width: 100%;

		.login-content-main {
			margin: 0 auto;
			width: 420px;
			max-width: 80%;
      .add-padding {
        padding: 0 40px;
      }
      .login-content-subtitle {
        color: var(--color-text-heavy);
        font-weight: 500;
        font-size: 28px;
        line-height: 32px;
        text-align: center;
        margin: 20px 0 0 0;
        white-space: nowrap;
        z-index: 5;
        position: relative;
        transition: all 0.3s ease;
      }
			.login-content-title {
				// color: var(--color-text-heavy);
        color: #FFFFFF;
				font-weight: 500;
				font-size: 30px;
				line-height: 38px;
				text-align: center;
				margin: 30px 0 30px;
				white-space: nowrap;
				z-index: 5;
				position: relative;
				transition: all 0.3s ease;
			}
        ::v-deep {
        .el-tabs__nav {
          .el-tabs__active-bar {
            height: 4px;
          }
          .el-tabs__item {
          font-size: 18px;
          line-height: 26px;
          font-weight: 400;
          // color: var(--color-text-light);
          color: #ffffff;

          &.is-active {
            font-weight: 500;
            color: var(--color-primary);
          }
        }
        }
        .el-tabs__nav-wrap::after {
          background-color: rgba(235,238,245,0.5);
        }
       }

			.login-content-links {
				display: flex;
				justify-content: space-between;
				font-size: 12px;
				line-height: 20px;
        height: 32px;

				.forget-password {
					color: #909399;
				}

				.register {
					color: var(--color-default) !important;
				}
			}
		}
		.login-content-main-sacn {
			position: absolute;
			top: 0;
			right: 0;
			width: 50px;
			height: 50px;
			overflow: hidden;
			cursor: pointer;
			transition: all ease 0.3s;
			&-delta {
				position: absolute;
				width: 35px;
				height: 70px;
				z-index: 2;
				top: 2px;
				right: 21px;
				background: var(--el-color-white);
				transform: rotate(-45deg);
			}
			&:hover {
				opacity: 1;
				transition: all ease 0.3s;
				color: var(--color-primary);
			}
			i {
				width: 47px;
				height: 50px;
				display: inline-block;
				font-size: 48px;
				position: absolute;
				right: 2px;
				top: -1px;
			}
		}
	}
	.login-content-mobile {
		height: 100%;
	}
	.login-footer{
    position: absolute;
    bottom: 0;
		left: 0;
		margin: 0;
    z-index: -1;
  }
}

/* 页面宽度小于1440px
------------------------------- */
@media screen and (max-width: 1440px) {
  .login-container {
    padding: 90px 50px;
  }
}

/* 页面高度小于690px
------------------------------- */
@media screen and (max-height: 750px) {
  .login-container {
    padding: 40px 50px;
  }
  .login-content-title {
    margin: 10px 0 30px !important;
  }
}
/* 页面高度大于1000px
------------------------------- */
@media screen and (min-height: 1000px) {
  .login-container {
    display: flex;
    align-items: center;
  }
  .login-container-center {
    flex: 1;
    height: 800px !important;
  }
}
</style>
