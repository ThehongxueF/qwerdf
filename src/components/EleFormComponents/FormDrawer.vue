<template>
  <!-- 抽屉 Drawer -->
  <el-drawer
    :visible.sync="drawerVisible"
    :title="title"
    :before-close="handleClose"
    :size="size"
    direction="rtl"
    append-to-body
    class="ele-form-drawer-wrapper"
  >
    <div class="drawer-form">
      <ele-form
        v-model="eleFormData"
        :form-desc="formDesc"
        :rules="formRules"
        :span="24"
      >
        <template v-for="(descObj, descKey ) in formDesc">
          <template :slot="`${descKey}-wrapper`">
            <slot :name="descKey" :row="{eleFormData}" />
          </template>
        </template>
        <template v-slot:form-btn>
          <el-button
            type="primary"
            @click="onSubmit(eleFormData)"
          >
            <slot name="submit">
              提交
            </slot>
          </el-button>
          <el-button
            @click="handleBack"
          >
            <slot name="cancel">
              取消
            </slot>
          </el-button>
        </template>
      </ele-form>
    </div>
  </el-drawer>
</template>

<script>
export default {
  name: 'EleFormDrawer',
  props: {
    visible: {
      type: Boolean,
      required: true
    },
    title: {
      type: String,
      default: '标题'
    },
    size: {
      type: String,
      default: '70%'
    },
    formData: {
      type: Object,
      default: () => {}
    },
    formDesc: {
      type: Object,
      required: true
    },
    formRules: {
      type: Object,
      default: () => {}
    }
  },
  computed: {
    drawerVisible: {
      get () {
        return this.visible
      },
      set (state) {
        this.$emit('update:visible', state)
      }
    },
    eleFormData: {
      get () {
        return this.formData
      },
      set (newEleFormData) {
        this.$emit('update:formData', newEleFormData)
      }
    }
  },
  methods: {
    handleBack () {
      this.handleClose(() => {
        this.drawerVisible = false
      })
    },
    handleClose (done) {
      this.$confirm('注意：放弃编辑，将不会保存此次修改内容！', '确认信息', {
        type: 'warning',
        confirmButtonText: '继续编辑',
        cancelButtonText: '放弃编辑'
      })
        .then(() => {
        })
        .catch(action => {
          if (action === 'cancel') {
            done()
          }
        })
    },
    async onSubmit (data) {
      try {
        this.$emit('submit', this.eleFormData)
        this.drawerVisible = !this.drawerVisible
      } catch (error) {
        console.log(error)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.drawer-form {
  padding: 20px;
  .ele-form-drawer-wrapper {
    ::v-deep {
      .el-drawer__open {
        z-index: 999;
        .el-drawer {
          overflow: auto;
        }
      }
    }
  }
}
</style>
