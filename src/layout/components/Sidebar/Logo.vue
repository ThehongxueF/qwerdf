<template>
  <div class="sidebar-logo-container" :class="{'collapse':collapse}">
    <transition name="sidebarLogoFade">
      <router-link v-if="collapse" key="collapse" class="sidebar-logo-link" to="/">
        <h1 class="sidebar-title"><img src="@/assets/icons/logo.png" class="sidebar-logo">{{ title }} </h1>
      </router-link>
      <router-link v-else key="expand" class="sidebar-logo-link" to="/">
        <h1 class="sidebar-title"><img src="@/assets/icons/logo.png" class="sidebar-logo">{{ title }} </h1>
      </router-link>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'SidebarLogo',
  props: {
    collapse: {
      type: Boolean,
      required: true
    }
  },
  data () {
    return {
      title: '党组织信息公示管理后台'
    }
  }
}
</script>

<style lang="scss" scoped>
.sidebarLogoFade-enter-active {
  transition: opacity 1.5s;
}

.sidebarLogoFade-enter,
.sidebarLogoFade-leave-to {
  opacity: 0;
}

.sidebar-logo-container {
  position: relative;
  width: 100%;
  height: 50px;
  padding: 0 0px;
  line-height: 50px;
  box-shadow: 0 1px 4px rgba(0,21,41,.08);
  background: url('~@/assets/common/header-bg.png');
  // background-size: cover;
  overflow: hidden;

  & .sidebar-logo-link {
    height: 100%;
    width: 100%;

    & .sidebar-logo {
      width: 22px;
      height: 22px;
      vertical-align: middle;
      margin-right: 10px;
      margin-top: -5px;
    }

    & .sidebar-title {
      display: inline-block;
      margin: 0;
      margin-left: 10px;
      color: #ffffff;
      font-weight: 500;
      line-height: 50px;
      font-size: 16px;
      font-family: Avenir, Helvetica Neue, Arial, Helvetica, sans-serif;
      vertical-align: middle;
    }
  }

  &.collapse {
    .sidebar-logo {
      margin-right: 0px;
    }
  }
}
</style>
