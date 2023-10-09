<!--
* 通用用户卡片组件。
*
* @props
* title 标题
* user 用户对象
*
-->
<template>
  <el-card shadow="hover" :body-style="{ padding: '0 20px 16px' }">
    <p class="title"><strong>{{ title }}</strong></p>
    <div class="user-card-wrapper">
      <div class="avatar-wrapper">
        <el-avatar :size="40" :src="(user && user.headImageUrl)" @error="errorHandler">
          <img :src="defaultAvatar">
        </el-avatar>
      </div>
      <!-- <div v-if="user" class="user-card-info">
        <el-link :underline="false" class="info mb4">
          <router-link :to="{ name: 'Users.Detail', params: { id: user.id } }" class="mr10">
            <i class="el-icon-user" />
            {{ user && user.name }}
          </router-link>
          <slot name="tag" />
        </el-link>
        <span class="info">
          <i class="el-icon-mobile" /> {{ user && user.mobile }}
        </span>
      </div> -->
      <div v-if="user" class="user-card-info">
        <div class="info mb4">
          <div class="mr10">
            <i class="el-icon-user" />
            {{ user && user.name }}
          </div>
          <slot name="tag" />
        </div>
        <span class="info">
          <i class="el-icon-mobile" /> {{ user && user.mobile }}
        </span>
      </div>
      <div v-else class="user-card-info">
        <span class="info">
          <i>暂无</i>
        </span>
      </div>
      <div class="extra">
        <slot name="extra" />
      </div>
    </div>
  </el-card>
</template>

<script>
import defaultAvatar from '@/assets/common/default-avatar.png'

export default {
  props: {
    title: {
      type: String,
      default: ''
    },
    user: {
      type: Object,
      default: () => {}
    }
  },
  data () {
    return {
      defaultAvatar
    }
  },
  methods: {
    errorHandler () {
      return true
    }
  }
}
</script>

<style lang="scss" scoped>
p {
  color: $text-medium;
  font-weight: 500;
}
.user-card-wrapper {
  display: flex;
  justify-content: space-between;
  align-items: center;
  .avatar-wrapper {
    flex-basis: 50px;
  }
  .user-card-info {
    flex: 1;
    display: flex;
    flex-direction: column;
    .info {
      display: inline-block;
      margin: 0 24px 4px;
      min-width: 80px;
      font-size: 14px;
    }
  }
}
.extra {
  white-space: nowrap;
}
</style>
