<template>
  <div class="app-container index-wrapper">
    <h3 class="title">{{ company.name }}</h3>
    <div class="info">公司地址：{{ company.location && company.location.join('') }}</div>

    <panel-group :statistic="statistic" />

    <el-card shadow="never" class="list-card">
      <div class="custom-header">
        <span class="title">系统日志</span>
      </div>
      <div class="list-content">
        <el-table
          :data="list"
          :show-header="false"
          :row-class-name="tableRowClassName"
          style="width: 100%;"
        >
          <el-table-column prop="user" align="left">
            <template slot-scope="{ row }">
              <el-popover
                placement="right"
                width="200"
                trigger="hover"
              >
                <UserDescriptions :user="row.user" />

                <strong slot="reference">
                  {{ row.user.name }}
                </strong>
              </el-popover>
              登录系统
            </template>
          </el-table-column>
          <el-table-column
            prop="loginAt"
            align="right"
          >
            <template slot-scope="{ row }">
              <i class="el-icon-time" />
              {{ row.loginAt }}
            </template>
          </el-table-column>
        </el-table>

        <div class="page-container">
          <pagination
            v-show="total>0"
            :total="total"
            :page.sync="listQuery.pageNo"
            :limit.sync="listQuery.pageSize"
            size="small"
            layout="total, prev, pager, next"
            @pagination="getList"
          />
        </div>
      </div>
    </el-card>
  </div>

</template>

<script>
import { mapGetters } from 'vuex'
import PanelGroup from './components/PanelGroup.vue'

export default {
  name: 'DashboardAdmin',
  components: { PanelGroup },
  data () {
    return {
      statistic: {}
    }
  },
  computed: {
    ...mapGetters(['company'])
  },
  mounted () {
    this.fetchData()
    this.getList()
  },
  methods: {
    tableRowClassName ({ row, rowIndex }) {
      return rowIndex % 2 === 0 ? 'even-row' : 'odd-row'
    }
  }
}
</script>

<style lang="scss" scoped>
.index-wrapper {
  position: relative;
  padding: 32px;

  .title {
    color: #303133;
    font-weight: 500;
    margin-bottom: 4px;
    @include ft(18px, 25px);
  }

  .subtitle {
    color: #666666;
    @include ft(12px, 20px);
  }

  .list-card {
    margin-bottom: 24px;

    ::v-deep {
      .el-card__body {
        padding: 10px 20px;
      }

      .el-table {
        &::before {
          height: 0;
        }
      }

      .even-row,
      .odd-row {
        td {
          @include ft(14px, 22px);

          border: 0;
          color: $text-medium;
          padding: 8px 0;
        }
      }

      .odd-row {
        background: #fff;
      }

      .even-row {
        background: #f2f6fc;
      }
    }

    .custom-header {
      align-items: center;
      padding: 10px 0;
      border-bottom: 1px solid #ebeef5;
      display: flex;
      justify-content: space-between;

      .title {
        @include ft(14px, 22px);

        color: $text-heavy;
        display: inline-block;
        font-weight: 500;
        padding: 0 0 0 14px;
        position: relative;

        &::before {
          @include tb();
          @include wh(4px, 14px);

          background: $color-primary;
          border-radius: 2px;
          content: '';
          left: 0;
        }
      }
    }

    .list-content {
      padding: 10px 0 0;
      min-height: 400px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }

    .page-container {
      display: flex;
      justify-content: flex-end;
      margin: 10px -26px 0 0;
    }
  }
}
</style>
