<template>
  <div class="box-card">
    <aside v-if="mainTitle" class="main-title">
      <div>
        <svg-icon v-if="icon" :icon-class="icon" />
        {{ mainTitle }}
      </div>
      <div
        v-if="!subTitle"
        class="button-wrapper"
      >
        <slot name="button" />
      </div>
    </aside>
    <el-card>
      <template v-if="subTitle" #header>
        <div class="flex-bar">
          <span class="sub-title">
            <svg-icon v-if="subIcon" :icon-class="subIcon" />
            {{ subTitle }}
          </span>
          <div class="button-wrapper">
            <slot name="button" />
          </div>
        </div>
      </template>
      <slot name="default" />
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'BasisCard',
  props: {
    icon: {
      type: String,
      default: ''
    },
    mainTitle: {
      type: String,
      default: ''
    },
    subTitle: {
      type: String,
      default: ''
    },
    subIcon: {
      type: String,
      default: ''
    }
  }
}
</script>

<style lang="scss" scoped>
.box-card {
  margin-bottom: 20px;
  .main-title {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .el-card {
    .sub-title {
      line-height: 28px;
    }
  }
  .button-wrapper {
    height: 100%;
    line-height: 100%;
  }
}
</style>
