<!--
* 审核组件。
*
* @props
* current 状态
* records 日志数组
*
* @emit
* update-state 更新状态 导出状态/原因 需回调
-->
<template>
  <div class="info">
    <h4>
      <span>当前状态</span>&nbsp;&nbsp;
      <el-tag :type="stateMap[state].type" size="mini">{{ stateMap[state].text }}</el-tag>
    </h4>
    <el-steps
      direction="vertical"
      :active="activeStep"
      :process-status="activeStepStatus"
      finish-status="success"
    >
      <template v-for="(step, index) in steps">
        <el-step
          :key="index"
          :title="stepTitle(step)"
        >
          <div slot="description">
            <div class="step-content">
              <div v-if="activeStep === index" class="action">
                <template v-for="(item, key) in step.actions">
                  <el-popover
                    :key="key"
                    title="提示"
                    placement="top"
                    width="260"
                    trigger="click"
                  >
                    <p>
                      <i class="el-icon-info" style="color: #E6A23C;" />
                      {{ item.confirmTitle }}
                    </p>
                    <el-input
                      v-if="item.showReason"
                      v-model="reason"
                      type="textarea"
                      :rows="5"
                      placeholder="请输入内容"
                    />
                    <div style="text-align: right; margin: 10px 0;">
                      <el-button
                        type="primary"
                        size="mini"
                        :disabled="item.showReason && !reason"
                        @click="verify(item)"
                      >确定</el-button>
                    </div>
                    <!--  -->
                    <el-button
                      v-if="!item.showState || item.showState === state"
                      slot="reference"
                      :type="item.btnType"
                      :icon="item.btnIcon ? `el-icon-${item.btnIcon}` : ''"
                      size="mini"
                      round
                    >
                      {{ item.btnText }}
                    </el-button>
                  </el-popover>
                </template>
              </div>
              <template v-else>
                <div v-if="activeStep > index && operateContent(step)" class="info">
                  操作者：
                  <span class="link-type">{{ operateContent(step).operator && operateContent(step).operator.name }}</span>
                  <span class="date">{{ operateContent(step).createdAt }}</span>
                </div>
              </template>
            </div>
          </div>
        </el-step>
      </template>
    </el-steps>
    <!-- 操作记录 -->
    <el-table
      v-if="list.length > 0"
      :data="list"
      style="width: 100%; margin-top: 20px;"
    >
      <el-table-column
        prop="createdAt"
        label="操作时间"
        width="120px"
        align="center"
      >
        <template slot-scope="{ row }">
          <i class="el-icon-time" />
          <span style="margin-left: 4px">{{ row.createdAt }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="操作内容"
        align="center"
        width="180px"
      >
        <template slot-scope="{ row }">
          <span style="margin-left: 10px">
            <el-tag v-if="row.beforeState && stateMap[row.beforeState]" :type="stateMap[row.beforeState].type || 'info'">
              {{ stateMap[row.beforeState].text }}
            </el-tag>
            <i class="el-icon-right" />
            <el-tag v-if="row.afterState && stateMap[row.afterState]" :type="stateMap[row.afterState].type || 'info'">
              {{ stateMap[row.afterState].text }}
            </el-tag>
          </span>
        </template>
      </el-table-column>
      <el-table-column
        prop="user"
        label="操作人"
      >
        <template slot-scope="{ row }">
          {{ row.operator && row.operator.name }}
        </template>
      </el-table-column>
      <el-table-column
        prop="rejectReason"
        label=""
      >
        <template v-if="row.rejectReason" slot-scope="{ row }">
          <i>拒绝理由：</i>
          <span>{{ row.rejectReason }}</span>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination
      :current-page.sync="currentPage"
      :total="total"
      :page-size.sync="pageSize"
      hide-on-single-page
      style="margin-top: 20px;"
    />
  </div>
</template>

<script>
import { stateMap } from '@/data/options'

const initSteps = [
  {
    states: ['new', ''], // 新提交
    title: '新提交',
    content: '',
    actions: [
      {
        confirmTitle: '确认开始审核吗？',
        confirmType: 'verify',
        btnType: 'primary',
        btnText: '开始审核'
      }
    ]
  },
  {
    states: ['verifing'], // 新提交
    title: '审核中',
    content: '',
    actions: [
      {
        confirmTitle: '确认审核通过吗？',
        confirmType: 'pass',
        btnType: 'success',
        btnIcon: 'check',
        btnText: '通过'
      },
      {
        confirmTitle: '确认拒绝吗？',
        confirmType: 'fail',
        btnIcon: 'close',
        btnType: 'danger',
        btnText: '不通过',
        showReason: false
      }
    ]
  },
  {
    states: ['accepted', 'rejected'],
    title: '通过or拒绝',
    content: '',
    actions: [
      {
        showState: 'accepted',
        confirmTitle: '确认回退吗?',
        confirmType: 'reverify',
        btnType: 'warning',
        btnIcon: 'top',
        btnText: '回退'
      },
      {
        showState: 'rejected',
        confirmTitle: '确认重新提交审核?',
        confirmType: 'reverify',
        btnType: 'success',
        btnIcon: 'top',
        btnText: '重新提交审核'
      }
    ]
  }
]

export default {
  name: 'StateVerify',
  props: {
    current: {
      type: String,
      default: 'initial'
    },
    records: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      state: this.current,
      reason: '',
      stateMap,
      activeStep: 0,
      activeStepStatus: 'process',
      steps: initSteps,
      pageSize: 5,
      currentPage: 1
    }
  },
  computed: {
    total () {
      return this.records.length
    },
    pageCount () {
      return Math.ceil(this.total / this.pageSize)
    },
    list () {
      return this.records.slice((this.currentPage - 1) * this.pageSize, this.currentPage * this.pageSize)
    }
  },
  watch: {
    state: {
      immediate: true,
      handler (val) {
        this.steps.forEach((item, index) => {
          if (item.states.includes(val)) {
            this.activeStep = index
          }
        })
      }
    }
  },
  methods: {
    operateContent (step) {
      const records = []
      step.states.forEach(state => {
        const record = this.records.find(item => item.beforeState === state)
        if (record) {
          records.push(record)
        }
      })
      records.sort(item => item.createdAt)
      return records[0]
    },
    stepTitle (step) {
      return step.states.includes(this.state) ? stateMap[this.state].text : step.title
    },
    verify (data) {
      switch (data.confirmType) {
        case 'verify':
          this.updateState('verifing')
          break
        case 'pass':
          this.updateState('accepted')
          break
        case 'fail':
          this.updateState('rejected', this.reason)
          this.activeStepStatus = 'error'
          break
        case 'finish':
          this.updateState('completed')
          break
        case 'pause':
          this.updateState('pausing')
          this.activeStepStatus = 'error'
          break
        case 'restart':
          this.updateState('verifing')
          break
        case 'reverify':
          this.updateState('verifing')
          break
        case 'offline':
          this.updateState('offline')
          break
        default:
          break
      }
    },
    reset () {
      this.activeStep = 0
      this.state = ''
      this.activeStepStatus = 'process'
      this.steps = initSteps
    },
    async updateState (state, reason) {
      this.activeStepStatus = 'process'
      this.$emit('update-state', state, reason, (val) => {
        this.state = val
        this.reason = ''
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.current-state {
  display: inline-flex;
  font-size: 18px;
  font-weight: 500;
  margin-bottom: 10px;
  align-items: center;
}
.step-content {
  min-height: 40px;
  color: #666;
  font-size: 14px;
  .date {
    margin-left: 4px;
    font-size: 12px;
  }
}
.action {
  padding: 5px 0;
}
</style>
