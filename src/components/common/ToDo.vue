<!--
* 待办组件。
*
* targetTypeRouteMap对象 待办跳转路由
*
-->
<template>
  <div class="drawer-container" :class="drawer ? 'shadow' : 'noWidth'">
    <el-drawer title="待办事项" size="100%" :visible.sync="drawer" direction="rtl" :modal="false">
      <template v-if="listLoading || total > 0">
        <template v-for="(item,index) in list" v-loading="listLoading">
          <div
            v-if="item.targetId && targetTypeRouteMap[item.targetType]"
            :key="index"
          >
            <div class="todo" @click="toDo(item)">
              <div class="title">{{ item.content }}</div>
              <div class="link">
                <span>立即审核</span>
                <i class="el-icon-top-right" />
              </div>
            </div>
          </div>
        </template>
      </template>
      <el-empty v-else description="暂无待办事项" />
      <div class="pagination">
        <pagination
          v-show="total>0"
          layout="prev, pager, next"
          :total="total"
          :page.sync="listQuery.page"
          :limit.sync="listQuery.perPage"
          @pagination="getList"
        />
      </div>
    </el-drawer>
    <div ref="handleBtn" :class="[drawer ? 'unfold' : 'close', 'handle-btn']" @click="drawer = !drawer">
      <div class="btn-content">
        <i :class="[drawer ? 'icon-down' : 'icon-up','el-icon-sort-up','icon']" />
        <span>待办事项</span>
      </div>
    </div>
  </div>
</template>

<script>
import Pagination from '@/components/Pagination'
import { TARGET_TYPE } from '@/data/constant'
import { ToDo } from '@/api'

const targetTypeRouteMap = {
  [TARGET_TYPE.DEMAND]: 'Demands.Detail',
  [TARGET_TYPE.EXPERT]: 'Experts.Detail',
  [TARGET_TYPE.ACHIEVEMENT]: 'Achievements.Detail',
  [TARGET_TYPE.SERVICE]: 'Services.Detail',
  [TARGET_TYPE.PROJECT]: 'Projects.Detail',
  [TARGET_TYPE.PROJECTEXPENDITURE]: 'Projects.Detail',
  [TARGET_TYPE.PROJECTBUDGET]: 'Projects.Detail',
  [TARGET_TYPE.PROJECTCONTRACT]: 'Contracts.Detail',
  [TARGET_TYPE.BUSINESS]: 'Business.Detail',
  [TARGET_TYPE.WIKI]: 'Knowledges.Detail',
  [TARGET_TYPE.ACTIVITY]: 'Activity.Detail',
  [TARGET_TYPE.NEWS]: 'News.Detail',
  [TARGET_TYPE.SUBJECTTEAM]: 'ResearchGroup.Detail',
  [TARGET_TYPE.LABORATORY]: 'LaboratoryManage.Detail',
  'claim': 'Experts.Detail',
  'user': 'Users.Detail'
}
export default {
  name: 'ToDo',
  components: {
    Pagination
  },
  data () {
    return {
      targetTypeRouteMap,
      drawer: false,
      listQuery: {
        page: 1,
        perPage: 10
      },
      list: [],
      total: 10,
      listLoading: true
    }
  },
  watch: {
    drawer: {
      immediate: true,
      handler (val) {
        if (val) {
          this.getList()
        }
      }
    }
  },
  methods: {
    toDo (data) {
      if (data.targetId && this.targetTypeRouteMap[data.targetType]) {
        if (data.targetType === 'projectExpenditure' || data.targetType === 'projectBudget') {
          this.$router.push({ name: this.targetTypeRouteMap[data.targetType], params: { id: data.originId }})
          this.drawer = false
        } else {
          this.$router.push({ name: this.targetTypeRouteMap[data.targetType], params: { id: data.targetId }})
          this.drawer = false
        }
      }
    },
    async getList () {
      try {
        const params = {
          ...this.listQuery
        }
        const { todoList, count } = await ToDo.getToDoList(params)
        this.list = todoList
        this.total = count
      } finally {
        this.listLoading = false
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.drawer-container {
  position: fixed;
  top: 0;
  left: auto;
  right: 0;
  width: 40%;
  height: 100%;
  z-index: 999;
  transition: all 0.3s;
  ::v-deep{
    .el-drawer__wrapper {
      position: fixed;
      left: auto;
      right: 0 !important;
      width: 40% !important;
    }
    .el-drawer {
      box-shadow: 2px 2px 8px 0px rgba(0, 0, 0, 0.19);
    }
  }
  .todo{
    margin: 0 20px;
    padding: 16px 30px;
    display: flex;
    flex-direction: column;
    font-size: 14px;
    font-weight: 400;
    border-bottom: 1px solid #f7f9fb;
    cursor: pointer;
    .title{
      color: #333333;
    }
    .link{
      margin: 6px 0 0 0;
      color: var(--color-primary);
    }
  }
  .pagination{
    overflow-x: auto;
  }
  .handle-btn {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    background: #ffffff;
    box-shadow: -1px 0 3px 0px rgba(0, 0, 0, 0.19);
    border-radius: 8px 0px 0px 8px;
    cursor: pointer;
    .btn-content {
      display: flex;
      padding: 10px 0 12px 0;
      width: 30px;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      .icon {
        font-size: 12px;
        line-height: 14px;
        color: var(--color-primary);
      }
      .icon-down{
        transform: rotateZ(90deg) rotateY(180deg);
      }
      .icon-up{
        transform: rotateZ(270deg);
      }
      span {
        display: inline-block;
        width: 12px;
        font-size: 12px;
        font-weight: 400;
        line-height: 14px;
        color: var(--color-primary);
      }
    }
  }
  .unfold {
    right: 100% !important;
  }
  .close {
    right: 0% !important;
  }
}
.noWidth{
  width: 0;
}
.shadow {
  width: 40%;
  box-shadow: 2px 2px 8px 0px rgba(0, 0, 0, 0.19);
}
</style>
