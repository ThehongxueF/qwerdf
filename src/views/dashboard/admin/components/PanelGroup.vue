<template>
  <el-row :gutter="20" class="panel-group">
    <el-col :xs="12" :sm="8" :lg="3" class="card-panel-col">
      <router-link :to="{ name: 'UserAccount' }">
        <div class="card-panel">
          <div class="card-panel-icon-wrapper">
            <img
              src="@/assets/common/icons/icon-staff.png"
              width="40px"
              height="40px"
              alt=""
              class="icon"
            >
          </div>
          <div class="card-panel-description">
            <div class="card-panel-text">
              员工
            </div>
            <div class="card-panel-num">
              <count-to :start-val="0" :end-val="statistic.staffCount" :duration="2600" />
              <span class="suffix">人</span>
            </div>
          </div>
        </div>
      </router-link>
    </el-col>
    <el-col :xs="12" :sm="8" :lg="3" class="card-panel-col">
      <div class="card-panel">
        <div class="card-panel-icon-wrapper">
          <img
            src="@/assets/common/icons/icon-company.png"
            width="40px"
            height="40px"
            alt=""
            class="icon"
          >
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">
            下属单位
          </div>
          <div class="card-panel-num">
            <count-to :start-val="0" :end-val="statistic.branchCount" :duration="3000" class="card-panel-num" />
            <span class="suffix">条</span>
          </div>
        </div>
      </div>
    </el-col>
    <el-col :xs="12" :sm="8" :lg="3" class="card-panel-col">
      <router-link :to="{ name: 'ProjectApplication' }">
        <div class="card-panel">
          <div class="card-panel-icon-wrapper icon-shopping">
            <img
              src="@/assets/common/icons/icon-program.png"
              width="40px"
              height="40px"
              alt=""
              class="icon"
            >        </div>
          <div class="card-panel-description">
            <div class="card-panel-text">
              申报项目
            </div>
            <div class="card-panel-num">
              <count-to :start-val="0" :end-val="statistic.applicationsCount" :duration="3600" class="card-panel-num" />
              <span class="suffix">个</span>
            </div>
          </div>
        </div>
      </router-link>
    </el-col>
    <el-col :xs="12" :sm="8" :lg="3" class="card-panel-col">
      <router-link :to="{ name: 'Technologyies' }">
        <div class="card-panel">
          <div class="card-panel-icon-wrapper icon-shopping">
            <img
              src="@/assets/common/icons/icon-achievement.png"
              width="40px"
              height="40px"
              alt=""
              class="icon"
            >
          </div>
          <div class="card-panel-description">
            <div class="card-panel-text">
              技术成果
            </div>
            <div class="card-panel-num">
              <count-to :start-val="0" :end-val="statistic.techsCount" :duration="2600" />
              <span class="suffix">条</span>
            </div>
          </div>
        </div>
      </router-link>
    </el-col>
    <el-col :xs="12" :sm="8" :lg="3" class="card-panel-col">
      <router-link :to="{ name: 'Demands' }">
        <div class="card-panel">
          <div class="card-panel-icon-wrapper icon-shopping">
            <img
              src="@/assets/common/icons/icon-demand.png"
              width="40px"
              height="40px"
              alt=""
              class="icon"
            >
          </div>
          <div class="card-panel-description">
            <div class="card-panel-text">
              技术需求
            </div>
            <div class="card-panel-num">
              <count-to :start-val="0" :end-val="statistic.demandsCount" :duration="2600" />
              <span class="suffix">条</span>
            </div>
          </div>
        </div>
      </router-link>
    </el-col>
    <el-col :xs="12" :sm="8" :lg="3" class="card-panel-col">
      <router-link :to="{ name: 'ExpertManageExperts' }">
        <div class="card-panel">
          <div class="card-panel-icon-wrapper icon-shopping">
            <img
              src="@/assets/common/icons/icon-professor.png"
              width="40px"
              height="40px"
              alt=""
              class="icon"
            >
          </div>
          <div class="card-panel-description">
            <div class="card-panel-text">
              专家
            </div>
            <div class="card-panel-num">
              <count-to :start-val="0" :end-val="statistic.expertsCount" :duration="2600" />
              <span class="suffix">人</span>
            </div>
          </div>
        </div>
      </router-link>
    </el-col>
    <el-col :xs="12" :sm="8" :lg="3" class="card-panel-col">
      <router-link :to="{ name: 'Docking' }">
        <div class="card-panel">
          <div class="card-panel-icon-wrapper">
            <img
              src="@/assets/common/icons/icon-butt.png"
              width="40px"
              height="40px"
              alt=""
              class="icon"
            >
          </div>
          <div class="card-panel-description">
            <div class="card-panel-text">
              对接
            </div>
            <div class="card-panel-num">
              <count-to :start-val="0" :end-val="statistic.dockingsCount" :duration="2600" />
              <span class="suffix">人</span>
            </div>
          </div>
        </div>
      </router-link>
    </el-col>
  </el-row>
</template>

<script>
import CountTo from 'vue-count-to'

export default {
  components: {
    CountTo
  },
  props: {
    statistic: {
      type: Object,
      default: () => {}
    }
  }
}
</script>

<style lang="scss" scoped>
.panel-group {
  margin-top: 18px;

  .card-panel-col {
    margin-bottom: 32px;
  }

  .card-panel {
    height: 162px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    background: #fff;
    padding: 20px 20px 22px;
    border: 1px solid #EBEEF5;
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    justify-content: center;

    .card-panel-icon-wrapper {
      text-align: center;
      padding: 12px;
      transition: all 0.38s ease-out;
      border-radius: 8px;
      background: #F2F6FC;
    }

    .card-panel-icon {
      font-size: 48px;
    }

    .card-panel-description {
      margin: 8px 0 0;

      .card-panel-text {
        text-align: center;
        line-height: 24px;
        font-weight: 500;
        color: #303133;
        font-size: 16px;
      }

      .card-panel-num, .suffix {
        font-size: 14px;
        line-height: 22px;
        color: #247AE4;
      }
      .card-panel-num {
        text-align: center;
      }
      .suffix {
        color: #666666;
      }
    }
  }
}

@media (max-width:550px) {
  .card-panel-description {
    display: none;
  }

  .card-panel-icon-wrapper {
    float: none !important;
    width: 100%;
    height: 100%;
    margin: 0 !important;

    .svg-icon {
      display: block;
      margin: 14px auto !important;
      float: none !important;
    }
  }
}
</style>
