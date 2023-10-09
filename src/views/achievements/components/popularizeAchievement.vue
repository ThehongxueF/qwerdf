<template>
  <div>
    <template v-if="options&&options.length">
      <el-form ref="ruleForm" :model="ruleForm" :rules="rules">
        <el-form-item prop="checkList">
          <el-checkbox-group v-model="ruleForm.checkList">
            <el-checkbox v-for="option in options" :key="option.id" :label="option.id">
              {{ option.name }}
            </el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item v-if="showDataPushAgreement" prop="agreement">
          <el-checkbox v-model="ruleForm.agreement" size="medium" class="agreement-check">
            <span>我已阅读并同意</span>
            <el-link target="_blank" type="primary" :underline="false" @click.prevent="openPromotional">
              《推广协议》
            </el-link>
          </el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-button
            style="margin-top:10px;"
            :loading="confirmLoading"
            type="primary"
            @click="handleConfirm"
          >提交</el-button>
        </el-form-item>
      </el-form>
    </template>
    <p v-else>暂无供应商</p>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'PopularizeAchievement',
  props: {
    options: {
      type: Array,
      require: true,
      default: () => []
    }
  },
  data () {
    const validateAgreement = (rule, value, callback) => {
      if (value !== true) {
        callback(new Error('请仔细阅读协议内容并勾选'))
      } else {
        callback()
      }
    }
    return {
      confirmLoading: false,
      ruleForm: {
        checkList: [],
        agreement: false
      },
      rules: {
        checkList: [
          { required: true, message: '请选择供应商', trigger: 'change' }
        ],
        agreement: [
          { validator: validateAgreement, trigger: 'change' }
        ]
      }
    }
  },
  computed: {
    ...mapGetters(['dataPushAgreement']),
    showDataPushAgreement () {
      return this.dataPushAgreement.loginEnable
    }
  },
  async mounted () {
    await this.getAgreement()
  },
  methods: {
    ...mapActions(['getUserAgreements']),
    openPromotional () {
      const routeData = this.$router.resolve({
        name: 'promotional'
      })
      window.open(routeData.href, '_blank')
    },
    async getAgreement () {
      this.getUserAgreements({ type: 'dataPush' })
    },
    handleConfirm () {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          this.confirmLoading = true
          this.$emit('on-confirm', this.ruleForm.checkList, () => {
            this.confirmLoading = false
          })
        } else {
          return false
        }
      })
    }
  }
}
</script>

<style lang="sass" scoped>

</style>
