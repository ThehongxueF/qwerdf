<!--
* 控制侧边栏展开组件。
*
* @props
* userAgreement 控制用户协议显示与隐藏
* privacyAgreement 控制隐私政策显示与隐藏
* type 类型 login / 其他
*
-->
<template>
  <span>
    <slot>
      <span class="tips">
        <span class="desc">我已阅读并同意</span>
        <el-link :href="path + '/agreement'" target="_blank" type="primary" :underline="false">
          用户协议
        </el-link>
        <span class="desc">和</span>
        <el-link :href="path + '/privacy'" target="_blank" type="primary" :underline="false">
          隐私政策
        </el-link>
      </span>
    </slot>
  </span>
</template>

<script>
export default {
  name: 'UserAgreements',
  props: {
    userAgreement: {
      type: Object,
      required: true
    },
    privacyAgreement: {
      type: Object,
      required: true
    },
    type: {
      type: String,
      required: true
    }
  },
  computed: {
    showUserAgreement () {
      return this.type === 'login' ? this.userAgreement.loginEnable : this.userAgreement.registerEnable
    },
    showPrivacyAgreement () {
      return this.type === 'login' ? this.privacyAgreement.loginEnable : this.privacyAgreement.registerEnable
    },
    path () {
      return process.env.VUE_APP_PUBLISH_PATH !== '/' ? process.env.VUE_APP_PUBLISH_PATH : ''
    }
  }
}
</script>

<style lang="scss" scoped>
.tips {
  padding-bottom: 12px;
  color: #999;
  font-size: 14px;
  line-height: 22px;
  margin: 0;

  span {
    line-height: 0;
    vertical-align: middle;
  }
}
</style>
