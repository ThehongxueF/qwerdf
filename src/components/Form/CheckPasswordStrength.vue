<!--
* 密码强度组件。
*
* @props
* title 描述标题
* visible 控制弹出窗的显示与隐藏 使用visible.sync
* level 等级
*
-->
<template>
  <el-popover
    v-model="strengthCheck"
    placement="right"
    trigger="manual"
  >
    <!--  -->
    <div :style="{ width: '240px' }">
      <slot name="title">
        <small v-if="title" style="color: #999;">
          <i class="el-icon-info" />
          {{ title }}
        </small>
      </slot>
      <div class="user-register">
        强度：<span :class="passwordLevelClass">{{ passwordLevelName }}</span>
      </div>
      <el-progress
        :percentage="(strengthLevel+1) * 25"
        :show-text="false"
        :stroke-width="6"
        :color="passwordLevelColor"
        stroke-linecap="square"
      />
      <div style="margin-top: 10px;">
        <span class="tips" />
      </div>
    </div>
    <template #reference>
      <slot />
    </template>
  </el-popover>
</template>

<script>

const levelNames = {
  0: '弱',
  1: '中',
  2: '强',
  3: '非常强'
}
const levelClass = {
  0: 'error',
  1: 'warning',
  2: 'success',
  3: 'high'
}
const levelColor = {
  0: '#FF1700',
  1: '#FF8E00',
  2: '#73B839',
  3: '#16982B'
}

export default {
  name: 'CheckPasswordStrength',
  props: {
    title: {
      type: String,
      default: null
    },
    visible: {
      type: Boolean,
      default: false
    },
    level: {
      type: Number,
      default: 0
    }
  },
  computed: {
    strengthCheck: {
      get () {
        return this.visible
      },
      set (val) {
        this.$emit('update:visible', val)
      }
    },
    strengthLevel () {
      return this.level > 0 ? this.level - 1 : 0
    },
    passwordLevelClass () {
      return levelClass[this.strengthLevel]
    },
    passwordLevelName () {
      return levelNames[this.strengthLevel]
    },
    passwordLevelColor () {
      return levelColor[this.strengthLevel]
    }
  }
}
</script>

<style lang="scss" scoped>
  .user-register {
    padding: 5px 0;
    font-size: 16px;
    line-height: 24px;

    span {
      font-weight: 500;
    }

    .error {
      color: #ff1700;
    }

    .warning {
      color: #ff8e00;
    }

    .success {
      color: #73B839;
    }

    .high {
      color: #16982B;
    }

  }

  .tips {
    color: $text-light;
    font-size: 12px;
  }

</style>
