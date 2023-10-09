<!--
* 标签筛选组件。
*
* @props
* value 当前选择数据 使用v-model
* name 标题
*
* @emit
* on-change 更改时触发
*
* 注意：
* tags从store取，该值为全局获取
* value传入时，会进行处理，分为一级和二级标签
-->
<template>
  <div class="tags-filter">
    <span v-if="name" class="tags-filter__name filters-container__label">{{ name }}：</span>
    <div class="tags-filter__content">
      <RadioFilter
        v-model="firstLevelValue"
        :options="firstLevelTags"
      />
      <CheckboxFilter
        v-show="firstLevelValue"
        v-model="secondLevelValues"
        :check-all.sync="secondLevelCheckAll"
        :options="secondLevelTags"
        class="mt10"
      />
    </div>
  </div>
</template>

<script>
import { isEqual } from 'lodash'
import { mapGetters } from 'vuex'
import CheckboxFilter from './CheckboxFilter.vue'
import RadioFilter from './RadioFilter.vue'

export default {
  name: 'TagsFilter',
  components: { CheckboxFilter, RadioFilter },
  props: {
    value: {
      type: String,
      default: ''
    },
    name: {
      type: String,
      default: '标签筛选'
    }
  },
  data () {
    return {
      firstLevelValue: null,
      secondLevelValues: [],
      secondLevelCheckAll: false
    }
  },
  computed: {
    ...mapGetters(['tags']),
    firstLevelTags () {
      if (this.tags && this.tags.length) {
        return this.tags.map(item => ({ value: item.id, text: item.name }))
      }
      return []
    },
    secondLevelTags () {
      if (this.firstLevelValue) {
        const firstLevelTag = this.tags.find(item => +item.id === +this.firstLevelValue)
        if (firstLevelTag && firstLevelTag.subordinates) {
          return firstLevelTag.subordinates.map(item => ({ value: item.id, text: item.name }))
        }
        return []
      }
      return []
    },
    currentValue () {
      const values = []
      if (this.secondLevelValues && this.secondLevelValues.length) {
        // values.push(this.firstLevelValue)
        values.push(...this.secondLevelValues)
      } else {
        if (this.firstLevelValue) {
          values.push(this.firstLevelValue)
        }
      }
      return values
    }
  },
  watch: {
    firstLevelValue: {
      handler (newVal, oldVal) {
        if (newVal !== oldVal) {
          this.secondLevelValues = []
        }
      }
    },
    currentValue: {
      deep: true,
      handler (val, oldVal) {
        if (val && val.length) {
          this.$emit('input', val.join(','))
        } else {
          this.$emit('input', null)
        }
        if (!isEqual(val, oldVal)) {
          this.$emit('on-change', val)
        }
      }
    }
  },
  methods: {
  }
}
</script>

<style lang="scss" scoped>
.tags-filter {
  display: flex;
  padding: 10px 0;

  &__name {
    padding: 5px 0;
  }

  &__content {
    margin-left: 5px;
  }
}
</style>
