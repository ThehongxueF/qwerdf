<template>
  <ele-form
    ref="form"
    v-model="formData"
    :span="24"
    :form-desc="achievementFormDesc"
    @request="handleSubmit"
  >
    <template v-slot:form-btn>
      <div class="form-footer">
        <el-button @click="onCancel">重 置</el-button>
        <el-button type="primary" @click="onSubmit(true)">{{ submitBtnText }}</el-button>
      </div>
    </template>
  </ele-form>
</template>

<script>
import { mapGetters } from 'vuex'
import { createMixin } from '@/mixins'
import { achievementFormDesc } from '../config'
import { Session } from '@/utils/storage'
export default {
  mixins: [createMixin],
  props: {
    submitBtnText: {
      type: String,
      default: '保存'
    }
  },
  data () {
    return {
      achievementFormDesc
    }
  },
  computed: {
    ...mapGetters(['tags'])
  },
  // watch: {
  //   'formData.attachmentIds': {
  //     handler (val) {
  //       if (val && val.length > 0 && typeof (val[0]) === 'object') {
  //         this.formData.attachments = val
  //       }
  //     }
  //   }
  // },
  created () {
    this.achievementFormDesc.tagIds.options = this.tags
    const form = Session.get('ACHIEVEMENT')
    // if (form.attachments && form.attachments > 0) {
    //   form.attachmentIds = form.attachments
    // }
    if (form) {
      this.formData = form
    }
  },
  beforeDestroy () {
    // 离开组件时缓存表单数据
    Session.set('ACHIEVEMENT', this.formData)
  },
  methods: {
    onCancel () {
      this.formData = {}
      this.$refs.form.resetForm()
    },
    onSubmit (isToApprove) {
      this.formData.isToApprove = isToApprove
      this.$refs.form.handleSubmitForm()
    },
    handleSubmit () {
      this.$emit('on-submit', this.formData, () => {

      })
    }
  }
}
</script>
