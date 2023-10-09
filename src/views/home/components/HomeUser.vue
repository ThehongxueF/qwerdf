<template>
  <div class="home-personal">
    <img class="user-edit" src="@/assets/icons/home_edit.png" alt="" @click="personalInfo">
    <img :src="userInfo.headImageUrl || defaultAvatar" class="user-avatar">
    <div class="user-name">{{ userInfo.name }}</div>
    <div class="user-organization">代理机构-{{ userInfo.organization }}</div>
    <div class="user-form">
      <el-form :label-position="labelPosition" label-width="80px" :model="userInfo" disabled>
        <el-form-item label="用户名">
          <el-input v-model="userInfo.name" />
        </el-form-item>
        <el-form-item label="E_mail">
          <el-input v-model="userInfo.email" />
        </el-form-item>
        <el-form-item label="身份">
          <el-input v-model="userRoleMap[userInfo.role]" />
        </el-form-item>
        <el-form-item label="更新日期">
          <el-input v-model="userInfo.updatedAt" />
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import { userRoleMap } from '@/data/options'
import { Local } from '@/utils/storage'
import { formatAxis, formatDate } from '@/utils/formatTime'
export default {
  name: 'HomeUser',
  data () {
    return {
      userRoleMap,
      labelPosition: 'top'
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
  methods: {
    personalInfo () {
      this.$router.push({ name: 'Personal' })
    },
    initUserInfo () {
      if (!Local.get('userInfo')) return false
      this.userInfo = Local.get('userInfo')
      this.userInfo.time = formatDate(new Date(this.userInfo.time), 'YYYY-mm-dd HH:MM:SS')
    }
  }
}
</script>
<style lang="scss" scoped>
.home-personal {
  text-align: center;
  padding: 42px 27px;
  width: 95%;
  height: 850px;
  background: url('@/assets/common/personal-bg.png') center no-repeat;
  background-size: cover;
  color: #ffffff;
  position: relative;
  .user-edit {
    position: absolute;
    width: 20px;
    height: 20px;
    right: 30px;
    top: 30px;
    cursor: pointer;
  }

  .user-avatar {
    width: 80px;
    height: 80px;
    border-radius: 33px;
  }

  .user-name {
    margin-top: 15px;
    font-size: 21px;
    line-height: 29px;
    font-weight: 600px;
  }

  .user-organization {
    margin-top: 15px;
    font-size: 14px;
    line-height: 20px;
  }

  .user-form {
    margin-top: 30px;
    text-align: left;

    ::v-deep {
      .el-form {
        .el-form-item__label {
          color: rgba(255, 255, 255, 0.69);
          line-height: 10px;
        }

        .el-input--medium .el-input__inner {
          padding: 0px 1px;
          background: transparent;
          border: none;
          border-bottom: 1px solid rgba(255, 255, 255, 0.16);
          border-radius: none;
          color: #ffffff;
        }
      }
    }
  }
}
</style>
