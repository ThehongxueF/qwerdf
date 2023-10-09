<template>
  <div class="login-container">
    <div class="login-container-center">
      <div class="login-container-center-left">
        123
      </div>
      <div class="login-container-center-right">
        456
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.login-container {
  width: 100%;
	height: 100%;
	background: url('~@/assets/login/background.png') center no-repeat;
	background-size: cover;
	padding: 150px 50px;
  overflow-y: auto;
  /* firefox */
  scrollbar-width: none;
  .login-container-center {
    margin: 0 auto;
    display: flex;
    max-width: 800px;
    height: 100%;
    min-height: 550px;
    border-radius: 8px;
    overflow: hidden;
    background-color: #ffffff;
    .login-container-center-left {
      background: url('~@/assets/login/center-bh.png') center no-repeat;
      background-size: cover;
    }
  }
}
</style>
