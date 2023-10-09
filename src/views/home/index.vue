<template>
  <div class="app-container home">
    <!-- 用户信息 -->
    <el-row>
      <el-col :span="6">
        <HomeUser />
      </el-col>
      <el-col :span="18">
        <el-card>
          <div class="home-todo">
            <div class="home-todo-top">
              <span>我的待办</span>
            </div>
            <div class="home-todo-container">
              <div class="container-pending">
                <span class="pending-title title">
                  <svg-icon icon-class="verify" class="icon" />
                  待审核
                </span>
                <div class="pending-list list">
                  <div v-for="item in pendingList" :key="item.prop" class="list-item" @click="toList(item.routeName)">
                    <div class="list-item-title">待审核{{ item.title }}</div>
                    <div class="list-item-count">{{ toDoCount.toApprove&&toDoCount.toApprove[item.prop] }}</div>
                  </div>
                </div>
              </div>
              <div class="container-launched">
                <span class="launched-title title">
                  <svg-icon icon-class="launched" class="icon" />
                  待上线
                </span>
                <div class="launched-list list">
                  <div v-for="item in launchedList" :key="item.prop" class="list-item" @click="toList(item.routeName)">
                    <div class="list-item-title">待上线{{ item.title }}</div>
                    <div class="list-item-count">{{ toDoCount.toVisibleItem&&toDoCount.toVisibleItem[item.prop] }}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import defaultAvatar from '@/assets/common/default-avatar.png'
import { ToDo } from '@/api'
import { formatAxis } from '@/utils/formatTime'
import { TARGET_TYPE } from '@/data/constant'
import { pendingList, launchedList } from './data/list-data'
import HomeUser from '@/views/home/components/HomeUser.vue'
const targetTypeRouteMap = {
  [TARGET_TYPE.DEMAND]: 'Demands',
  [TARGET_TYPE.EXPERT]: 'ExpertManageExperts',
  [TARGET_TYPE.ACHIEVEMENT]: 'Achievements',
  [TARGET_TYPE.SERVICE]: 'Services',
  [TARGET_TYPE.PROJECT]: 'Projects',
  [TARGET_TYPE.PROJECTCONTRACT]: 'Contracts',
  [TARGET_TYPE.BUSINESS]: 'Business',
  [TARGET_TYPE.NEWS]: 'News',
  [TARGET_TYPE.ACTIVITY]: 'ActivityActiviteList',
  [TARGET_TYPE.WIKI]: 'Knowledge',
  [TARGET_TYPE.LABORATORY]: 'LaboratoryManage.Detail',
  claim: 'Claims',
  user: 'Users',
  publicity: 'Publicity'
}
export default {
  name: 'Home',
  components: {
    HomeUser
  },
  data () {
    return {
      defaultAvatar,
      targetTypeRouteMap,
      pendingList,
      launchedList,
      toDoCount: {}
    }
  },
  computed: {
    ...mapGetters([
      'userInfo'
    ]),
    currentTime () {
      return formatAxis(new Date())
    }
  },
  mounted () {
    this.initToDoCount()
  },
  methods: {
    toList (type) {
      this.$router.push({ name: this.targetTypeRouteMap[type] })
    },
    async initToDoCount () {
      this.toDoCount = await ToDo.getToDoCount()
    }
  }
}
</script>
<style lang="scss" scoped>
.home {
  width: 100%;
  height: 100%;
  overflow: hidden;
  font-family: PingFangSC-Medium, PingFang SC;
  ::v-deep {
      .el-card__body {
        padding: 20px 0px;
      }
    }
  .home-todo {
    height: 800px;
    .home-todo-top {
      padding-bottom: 20px;
      border-bottom: 1px solid #E9E9E9;
      font-weight: 600;
      font-size: 16px;
      line-height: 16px;
      span {
        padding:30px;
      }
    }
    .home-todo-container {
      margin-top: 10px;
      padding: 30px;
      display: flex;
      overflow-y: auto;
      height: 750px;
      .title {
        background-color: #EFF5FF;
        font-size: 14px;
        line-height: 16px;
        padding: 3px 5px;
        font-weight: 600;
      }
      .icon {
          color: #1e65f0;
          width: 16px;
          height: 16px;
          line-height: 16px;
        }
        .list {
          margin-top: 20px;
          overflow-y: auto;
          .list-item {
            padding: 20px 15px;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: space-between;
            .list-item-title {
              font-size: 16px;
              line-height: 22px;
              color: #666666;
            }
            .list-item-count {
              font-weight: bold;
              font-size: 24px;
              line-height: 29px;
              color: #1E65F0;
            }
          }
          .list-item:hover {
            background-color: #F2F6FA;
          }
        }
      .container-pending {
        width: 30%;

      }
      .container-launched {
        width: 30%;
        margin-left: 200px;
      }
    }
  }

}
</style>
