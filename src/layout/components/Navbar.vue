<template>
  <div class="navbar">
    <hamburger v-if="false" id="hamburger-container" :is-active="sidebar.opened" class="hamburger-container" @toggleClick="toggleSideBar" />

    <breadcrumb v-if="false" id="breadcrumb-container" class="breadcrumb-container" />

    <div class="right-menu">
      <template v-if="device!=='mobile'">
        <!-- <div class="title right-menu-item">
          中国工程院院士专家成果展示与转化中心
        </div> -->

        <screenfull v-if="false" id="screenfull" class="right-menu-item hover-effect" />

      </template>

      <el-dropdown class="avatar-container right-menu-item hover-effect" trigger="click">
        <div class="avatar-wrapper">
          <img :src="userInfo.headImageUrl || defaultAvatar" class="user-avatar">
          <i class="el-icon-caret-bottom" />
        </div>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item disabled>
            <span style="color: #333; font-weight: 500;">你好，{{ userInfo.name }}</span>
          </el-dropdown-item>
          <!-- <router-link to="/personal">
            <el-dropdown-item divided>个人中心</el-dropdown-item>
          </router-link> -->
          <el-dropdown-item divided @click.native="logout">
            <span style="display:block;">退出登录</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { Login, Notification } from '@/api'
import defaultAvatar from '@/assets/common/default-avatar.png'
import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'
import Screenfull from '@/components/Screenfull'
import { TARGET_TYPE } from '@/data/constant'
import { notifyPollingMixin } from '@/mixins'

export default {
  components: {
    Breadcrumb,
    Hamburger,
    Screenfull
  },
  mixins: [notifyPollingMixin],
  data () {
    const targetTypeRouteMap = {
      [TARGET_TYPE.DEMAND]: 'Demands.Detail',
      [TARGET_TYPE.EXPERT]: 'Experts.Detail',
      [TARGET_TYPE.ACHIEVEMENT]: 'Achievements.Detail',
      [TARGET_TYPE.SERVICE]: 'Services.Detail',
      [TARGET_TYPE.PROJECT]: 'Projects.Detail',
      [TARGET_TYPE.PROJECTBUDGET]: 'Projects.Detail',
      [TARGET_TYPE.PROJECTEXPENDITURE]: 'Projects.Detail',
      [TARGET_TYPE.CONTRACT]: 'Contracts.Detail',
      [TARGET_TYPE.WIKI]: 'Knowledges.Detail',
      [TARGET_TYPE.NEWS]: 'News.Detail',
      [TARGET_TYPE.BUSINESS]: 'Business.Detail',
      [TARGET_TYPE.LABORATORY]: 'LaboratoryManage.Detail',
      [TARGET_TYPE.ACTIVITY]: 'Activity.Detail',
      'publicity': 'Publicity.Detail',
      'docking': 'Dockings.Detail'
    }
    return {
      defaultAvatar,
      targetTypeRouteMap
    }
  },
  computed: {
    ...mapGetters([
      'userInfo',
      'collegeInfo',
      'sidebar',
      'avatar',
      'device',
      'wsmessage',
      'userCounts',
      'authModules'
    ]),
    showNotifications () {
      return this.authModules.includes('Notification')
    }
  },
  watch: {
    async wsmessage ({ event, eventBody }) {
      switch (event) {
        case 'notification':
          {
            const { content, targetId, targetType, id } = eventBody
            this.$notify.info({
              duration: 20000,
              title: '新消息',
              dangerouslyUseHTMLString: true,
              message: `<p style="margin-bottom: 20px;">
                      ${content}
                    </p>
                    <strong style="cursor: pointer;">
                      点击查看 &raquo;
                    </strong>
              `,
              onClick: async () => {
                if (targetId && this.targetTypeRouteMap[targetType]) {
                  if (targetType === 'projectExpenditure' || targetType === 'projectBudget') {
                    const target = await this.getTargetId(id)
                    this.$router.push({ name: this.targetTypeRouteMap[targetType], params: { id: target.targetId }})
                  } else {
                    this.$router.push({ name: this.targetTypeRouteMap[targetType], params: { id: targetId }})
                  }
                } else {
                  this.$message.warning(`未知类型：${targetType}`)
                }
              }
            })
          }
          break
        default:
          break
      }
    }
  },
  methods: {
    toggleSideBar () {
      this.$store.dispatch('app/toggleSideBar')
    },
    async logout () {
      // 登出调用接口，通知后端
      await Login.signOut()
      // 登出，前端清空数据
      await this.$store.dispatch('user/logout')
      this.$message.success('已退出登录')
      /*
      * 登出使用href强制刷新页面，清空缓存
      * VUE_APP_PUBLISH_PATH 为当前端的基础路由
      */
      window.location.href = `${process.env.VUE_APP_PUBLISH_PATH !== '/' ? process.env.VUE_APP_PUBLISH_PATH : ''}/login`
    },
    async getTargetId (id) {
      const target = await Notification.getTarget({ id: id, isPc: true })
      return target
    }
  }
}
</script>

<style lang="scss" scoped>
.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  // background: #fff;
  background: url('~@/assets/common/header-bg.png') center no-repeat;
  background-size: cover;
  box-shadow: 0 1px 4px rgba(0,21,41,.08);

  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background .3s;
    -webkit-tap-highlight-color:transparent;

    &:hover {
      background: rgba(0, 0, 0, .025)
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .errLog-container {
    display: inline-block;
    vertical-align: top;
  }

  .right-menu {
    float: right;
    height: 100%;
    line-height: 50px;

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background .3s;

        &:hover {
          background: rgba(0, 0, 0, .025)
        }
      }
    }

    .title.right-menu-item{
      color: var(--color-primary);
      font-size: 16px;
      font-weight: 500;
    }

    .avatar-container {
      margin-right: 30px;

      .avatar-wrapper {
        margin-top: 10px;
        position: relative;

        .user-avatar {
          cursor: pointer;
          width: 32px;
          height: 32px;
          border-radius: 10px;
        }

        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          color: #ffffff;
          right: -20px;
          top: 10px;
          font-size: 12px;
        }
      }
    }
  }
}
</style>
