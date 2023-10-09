<!--
* 专家科研成果步骤条组件。
*
* @props
* value 使用v-model
* options 步骤数组
*
* @emit
* select 选择 导出index
-->
<template>
  <div class="mt-steps">
    <div
      v-for="(option, index) in options"
      :key="index"
      :class="['mt-steps__step', active == index ? 'mt-steps__step--active' : '']"
      @click="select(index)"
    >
      <div
        v-if="index === 0"
        class="mt-steps__icon"
        :style="{left: `${44 + 100*active}%`}"
      >
        <el-icon class="el-icon-position" style="color: #fff;" />
      </div>
      <div :class="['mt-steps__index', active > index ? 'mt-steps__line' : '']" />
      <div class="mt-steps__label">{{ option.label }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MtSteps',
  props: {
    value: {
      type: Number,
      default: 0
    },
    options: {
      type: Array,
      default: () => [],
      required: true
    }
  },
  computed: {
    active: {
      get () {
        return this.value
      },
      set (val) {
        this.$emit('input', val)
      }
    }
  },
  methods: {
    select (index) {
      this.$emit('select', index)
      this.active = index
    }
  }
}
</script>

<style lang="scss" scoped>
.mt-steps {
  position: relative;
  display: flex;
  justify-content: space-between;

  &__step {
    position: relative;
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 16px;
    font-weight: 600;
    line-height: 20px;
    cursor: pointer;
    &:not(:last-child) {
      .mt-steps__index::after {
        content: '';
        position: absolute;
        top: 2px;
        left: calc(50%);
        border: 1px dotted;
        width: 96%;
        color: var(--color-primary);
      }
    }
  }

  &__step--active {
    .mt-steps__label{
      color: var(--color-primary);
    }
  }

  &__index {
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background: var(--color-primary);
    opacity: 0.3;
    margin-bottom: 10px;
    text-align: center;
  }

  &__icon {
    position: absolute;
    top: -4px;
    width: 16px;
    height: 16px;
    font-size: 10px;
    line-height: 18px;
    background: var(--color-primary);
    border-radius: 50%;
    text-align: center;
    transition: left 0.3s ease-in-out;
    z-index: 9;
  }

  &__line {
    &::after {
      opacity: 1 !important;
    }
  }

  &__label {
    color: #333;
    font-size: 14px;
    font-weight: 400;
    line-height: 20px;
  }
}
</style>
