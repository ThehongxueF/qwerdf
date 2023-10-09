<!--
* 自定义模板审核组件。
*
* @props
* target 目标对象
* records 日志数组
*
* @emit
* update-state 更新状态 导出状态/原因/是否回到初始状态 需回调
*
-->
<template>
  <div class="info">
    <h4>
      <span>当前状态</span>&nbsp;&nbsp;
      <el-tag :type="stateMap[state].type" size="mini">{{ stateMap[state].text }}</el-tag>
    </h4>
    <el-steps
      v-if="records&&records.length"
      direction="vertical"
      :active="activeStep"
      :process-status="activeStepStatus"
      finish-status="success"
    >
      <template v-for="(step, index) in steps">
        <el-step
          :key="index"
          :title="stepTitle(step, index, steps.length)"
        >
          <div slot="description">
            <div class="step-content">
              <div v-if="activeStep === index" class="action">
                <template v-for="(item, key) in step.actions">
                  <el-popover
                    v-if="item.confirmType !== 'back'"
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
                        @click="verify(item)"
                      >确定</el-button>
                    </div>
                    <!--  -->
                    <el-button
                      v-if="(!item.showState && step.isToApprove) || (item.showState === state && step.isToApprove)"
                      slot="reference"
                      style="margin: 0 6px 0 0;"
                      :type="item.btnType"
                      :icon="item.btnIcon ? `el-icon-${item.btnIcon}` : ''"
                      size="mini"
                      round
                    >
                      {{ item.btnText }}
                    </el-button>
                  </el-popover>
                  <template v-else>
                    <el-dropdown v-if="(!item.showState && step.isToApprove) || (item.showState === state && step.isToApprove)" :key="key" placement="bottom">
                      <el-button :type="item.btnType" size="mini" round>
                        {{ item.btnText }}<i class="el-icon-arrow-down el-icon--right" />
                      </el-button>
                      <el-dropdown-menu slot="dropdown">
                        <el-popover
                          v-for="(item2, index2) in item.children"
                          :key="index2"
                          title="提示"
                          placement="top"
                          width="260"
                          trigger="click"
                        >
                          <p>
                            <i class="el-icon-info" style="color: #E6A23C;" />
                            {{ item2.confirmTitle }}
                          </p>
                          <el-input
                            v-if="item2.showReason"
                            v-model="reason"
                            type="textarea"
                            :rows="5"
                            placeholder="请输入内容"
                          />
                          <div style="text-align: right; margin: 10px 0;">
                            <el-button
                              type="primary"
                              size="mini"
                              @click="verify(item2)"
                            >确定</el-button>
                          </div>
                          <el-dropdown-item slot="reference">
                            {{ item2.btnText }}
                          </el-dropdown-item>
                        </el-popover>
                      </el-dropdown-menu>
                    </el-dropdown>
                  </template>
                </template>
              </div>
              <template v-else>
                <div v-if="activeStep > index" class="info">
                  <div class="reason">{{ operateContent(step, index, steps.length).reason }}</div>
                  <div class="date">{{ index ===0 ? operateContent(step, index, steps.length).createdAt :operateContent(step,index, steps.length).updatedAt }}</div>
                </div>
              </template>
            </div>
          </div>
        </el-step>
      </template>
    </el-steps>
    <p v-else>
      未选择审批模板
    </p>
  </div>
</template>

<script>
import { stateMap } from '@/data/options'
import cloneDeep from 'lodash/cloneDeep'

const step = {
  new: {
    states: ['new', ''], // 新提交
    title: '新提交',
    content: '',
    actions: [
      {
        showState: 'new',
        confirmTitle: '确认提交审核吗？',
        confirmType: 'verify',
        btnType: 'primary',
        btnText: '提交审核'
      }
    ]
  },
  verifyAndBack: {
    states: ['verifing'], // 审核中
    title: '审核中',
    content: '',
    actions: [
      {
        confirmTitle: '确认审核通过吗？',
        confirmType: 'pass',
        btnType: 'success',
        btnIcon: 'check',
        btnText: '通过',
        showReason: true
      },
      {
        confirmTitle: '确认拒绝吗？',
        confirmType: 'fail',
        btnIcon: 'close',
        btnType: 'danger',
        btnText: '不通过',
        showReason: true
      },
      {
        confirmType: 'back',
        btnType: 'warning',
        btnIcon: 'top',
        btnText: '回退',
        children: [
          {
            confirmTitle: '确认回退到上一步吗?',
            confirmType: 'reverify',
            btnType: 'warning',
            btnIcon: 'top',
            btnText: '上一步',
            showReason: true
          },
          {
            confirmTitle: '确认回退到初始状态吗?',
            confirmType: 'restart',
            btnType: 'warning',
            btnIcon: 'top',
            btnText: '初始状态',
            showReason: true
          }
        ]
      }
    ]
  },
  verify: {
    states: ['verifing'], // 审核中
    title: '审核中',
    content: '',
    actions: [
      {
        confirmTitle: '确认审核通过吗？',
        confirmType: 'pass',
        btnType: 'success',
        btnIcon: 'check',
        btnText: '通过',
        showReason: true
      },
      {
        confirmTitle: '确认拒绝吗？',
        confirmType: 'fail',
        btnIcon: 'close',
        btnType: 'danger',
        btnText: '不通过',
        showReason: true
      }
    ]
  },
  result: {
    states: ['accepted', 'rejected'],
    title: '通过or拒绝',
    content: ''
  }
}
const templateStateMap = {
  'underApprove': {
    text: '待审核'
  },
  'rejected': {
    text: '已拒绝'
  },
  'returned': {
    text: '已回退'
  },
  'approved': {
    text: '已同意'
  }
}
export default {
  name: 'TemplateStateVerify',
  props: {
    target: {
      type: Object,
      default: () => {}
    },
    records: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      initStep: step,
      reason: '',
      stateMap,
      activeStepStatus: 'process',
      isStart: false,
      templateStateMap
    }
  },
  computed: {
    state () {
      return this.target.state
    },
    activeStep () {
      if (this.state === 'new') {
        return 0
      } else if (this.state === 'verifing') {
        let active = 0
        this.records.map((item, index) => {
          if ((index === 0 && item.state !== 'approved') || (index && item.state !== 'approved' && this.records[index - 1].state === 'approved')) {
            active = index + 1
          }
        })
        return active
      } else {
        return this.steps.length - 1
      }
    },
    steps () {
      if (this.records && this.records.length) {
        const steps = []
        steps.push({
          ...this.initStep.new,
          title: this.target.publisher && this.target.publisher.name ? this.target.publisher.name : '',
          isToApprove: true
        })
        this.records.map((item, index) => {
          const verify = item.enableBack ? this.initStep.verifyAndBack : this.initStep.verify
          steps.push(
            {
              ...item,
              ...verify,
              title: this.filterName(item)
            }
          )
        })
        steps.push({
          ...this.initStep.result,
          isToApprove: this.records[this.records.length - 1].isToApprove
        })
        return cloneDeep(steps)
      }
      return []
    }
  },
  watch: {
    state: {
      immediate: true,
      handler (val) {
        if (val === 'accepted') {
          this.activeStepStatus = 'success'
        } else if (val === 'rejected') {
          this.activeStepStatus = 'error'
        }
      }
    }
  },
  methods: {
    filterName (record) {
      if (record.type === 'user') {
        const footer = record.users && record.users.length > 3 ? '等' : ''
        return record.users.map(item => item.name).splice(0, 3).join(',') + footer
      } else {
        return record.organizationUnits[0].name
      }
    },
    stepTitle (step, index, length) {
      let title = ''
      switch (true) {
        case index === 0 :
          title = `${step.title}${this.state === 'new' ? '（暂存）' : '（新提交）'}`
          break
        case index === length - 1 :
          title = step.states.includes(this.state) ? `${this.stateMap[this.state].text}` : step.title
          break
        case index < this.activeStep :
          title = `${step.title}（${this.templateStateMap[step.state].text}）`
          break
        case index === this.activeStep :
          title = `${step.title}（审核中）`
          break
        case index > this.activeStep :
          title = `${step.title}（${this.templateStateMap[step.state].text}）`
          break
        default :
          title = step.states.includes(this.state) ? `${this.stateMap[this.state].text}` : step.title
      }
      return title
    },
    operateContent (step, index, length) {
      if (index === 0) {
        return {
          reason: '',
          createdAt: this.target.createdAt,
          updatedAt: this.target.updatedAt
        }
      } else if (index === length - 1) {
        return {
          reason: '',
          createdAt: '',
          updatedAt: ''
        }
      } else {
        return {
          reason: step.reason,
          createdAt: step.createdAt,
          updatedAt: step.updatedAt
        }
      }
    },
    verify (data) {
      switch (data.confirmType) {
        // 暂存 改为 审核中
        case 'verify':
          this.updateState('verifing')
          break
        // 当前节点审核通过
        case 'pass':
          this.updateState('approved', this.reason)
          break
        // 审核不通过
        case 'fail':
          this.updateState('rejected', this.reason)
          break
        // 回退初始状态
        case 'restart':
          this.updateState('returned', this.reason, true)
          break
        // 回退上一步
        case 'reverify':
          this.updateState('returned', this.reason, false)
          break
        default:
          break
      }
    },
    async updateState (state, reason, isStart) {
      this.$emit('update-state', state, reason, isStart, (val) => {
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
  .info {
    width: 100%;
    overflow: hidden;
    display: flex;
    justify-content: space-between;
    .reason {
      flex: 1;
      font-size: 12px;
      word-wrap: break-word;
      word-break: normal;
    }
    .date {
      width: 140px;
      font-size: 12px;
      text-align: right;
    }
  }
}
.action {
  padding: 5px 0;
}
</style>
