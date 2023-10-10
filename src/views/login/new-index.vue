<template>
  <div class="login-container">
    <div class="login-container-center">
      <div class="login-container-center-left">
        <img src="@/assets/login/left-bg.png" alt="">
      </div>
      <div class="login-container-center-right">
        <h2 class="title">党组织信息公示管理后台</h2>
        <div class="account">
          <Account />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Account from './components/account.vue'
export default {
  name: 'Login',
  components: { Account }
}
</script>

<style scoped lang="scss">
.login-container {
  width: 100%;
	height: 100%;
	background: url('~@/assets/login/background.png') center no-repeat;
	background-size: cover;
	padding: 0px 50px;
  padding-top: 10%;
  overflow-y: auto;
  /* firefox */
  scrollbar-width: none;
  .login-container-center {
    margin: 0 auto;
    display: flex;
    // max-width: 50%;
    width: 900px;
    min-height: 600px;
    border-radius: 8px;
    // overflow: hidden;
    background-color: #ffffff;
    .login-container-center-left {
      width: 40%;
      background: url('~@/assets/login/center-bg.png') center no-repeat;
      background-size: cover;
      position: relative;
      img {
        width: 400px;
        position: absolute;
        top: -135px;
        left: -63px;
      }
    }
    .login-container-center-right {
      flex: 1;
      padding: 50px;
      .title {
        margin: auto;
        text-align: center;
      }
      .account {
        margin-top: 50px;
      }
    }
  }
}
</style>
