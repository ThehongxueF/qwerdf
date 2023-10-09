<template>
  <el-row>
    <el-col :sspan="24">
      <el-result
        v-bind="$attrs"
      >
        <template #extra>
          <el-button type="info" @click="$router.replace({ name: 'Achievements' })">确定</el-button>
        </template>
      </el-result>
    </el-col>
  </el-row>
</template>
<script>
import { Session } from '@/utils/storage'
export default {
  props: {
    active: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {

    }
  },
  beforeDestroy () {
    if (this.active === 2) {
      // 当完成新增动作后，清空数据
      Session.remove('ACHIEVEMENT')
    }
  }
}
</script>
