<template>
  <div v-loading="pageLoading" class="app-container">
    <el-row :gutter="10">
      <h3>{{ '单位管理 ——— ' + unit.title }}<span class="used">有效</span>
        <span class="outdate used">已过期</span></h3>
      <el-col :lg="{ span: 24 }" :xl="{ span: 12 }" class="mb10">
        <el-card class="base-info" shadow="hover">
          <div class="header" style="position:relative">
            <img class="unit-logo" src="@/assets/common/unit-logo.png" alt="">
            <span class="actions-wrapper" style="float: right;">
              <el-link
                :underline="false"
                type="danger"
                icon="el-icon-delete"
                class="mr10"
              >
                删除
              </el-link>
              <el-link
                :underline="false"
                icon="el-icon-edit"
                @click="drawerFormVisible = true"
              >
                编辑
              </el-link>
            </span>
          </div>
          <h3>基本信息</h3>
          <el-descriptions
            :column="1"
            :label-style="labelStyle"
            :content-style="contentStyle"
          >
            <el-descriptions-item label="单位名称"> {{ unit.title }} </el-descriptions-item>
            <el-descriptions-item label="单位地址"> {{ unit.address }} </el-descriptions-item>
            <el-descriptions-item label="单位联系人"> {{ unit.contact }} </el-descriptions-item>
            <el-descriptions-item label="联系方式"> {{ unit.mobile }} </el-descriptions-item>
            <el-descriptions-item label="自定义标语"> {{ '阿斯达克萨拉丁记录卡撒旦尽量躲开撒娇了' }} </el-descriptions-item>
          </el-descriptions>
          <div class="outdate-time flex-space-between">
            <div>账号过期时间: <span> 2023-10-13</span></div>
            <el-button
              type="primary"
              icon="el-icon-plus"
            >
              立即续费
            </el-button>
          </div>
        </el-card>
      </el-col>
      <el-col :lg="{ span: 24 }" :xl="{ span: 12 }">
        <el-card shadow="hover">
          <h3>{{ '工作开展情况' }}</h3>
          <el-row>
            <el-col :span="12">
              <el-card shadow="hover" style="margin-top: 20px; height:130px">
                <div class="flex-space-between" style="margin-left:50px; position:relative">
                  <img class="label-icon" src="@/assets/icons/unit_active.png" alt="">
                  <div class="label" style="text-align:center;">党员人数</div>
                  <div class="count"> 100</div>
                </div>
                <div class="flex-space-between" style="margin-left:50px; position:relative">
                  <div class="label">发展党员人数</div>
                  <div class="count"> 100</div>
                </div>
                <div class="flex-space-between" style="margin-left:50px; position:relative">
                  <div class="label">少数民族党员人数</div>
                  <div class="count">20</div>
                </div>
              </el-card>
            </el-col>
            <el-col :span="12">
              <el-card shadow="hover" style="margin-top: 20px; height:130px">
                <div class="flex-space-between" style="margin-left:50px; position:relative">
                  <img class="label-icon" src="@/assets/icons/unit_active.png" alt="">
                  <div class="label">主题党日</div>
                  <div class="count">50</div>
                </div>
              </el-card>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-card shadow="hover" style="margin-top: 20px;">
                <div class="flex-space-between" style="margin-left:50px; position:relative">
                  <img class="label-icon" src="@/assets/icons/unit_active.png" alt="">
                  <div class="label">三会一课</div>
                  <div class="count">50</div>
                </div>
              </el-card>
            </el-col>
            <el-col :span="12">
              <el-card shadow="hover" style="margin-top: 20px;">
                <div class="flex-space-between" style="margin-left:50px; position:relative">
                  <img class="label-icon" src="@/assets/icons/unit_active.png" alt="">
                  <div class="label">公示公开</div>
                  <div class="count">50</div>
                </div>
              </el-card>
            </el-col>
          </el-row>
        </el-card>
      </el-col>
    </el-row>
    <el-row :gutter="10" style="margin-top: 20px">
      <el-col :lg="{ span: 24 }" :xl="{ span: 24 }">
        <el-card shadow="hover" class="mb10" style="height: 300px; ">
          <div class="flex-space-between">
            <h3>下属支部</h3>
            <el-button
              type="primary"
              icon="el-icon-plus"
            >
              新增支部
            </el-button>
          </div>
          <div style="display:flex; overflow-x:auto;">
            <el-card v-for="item in branchList" :key="item.id" class="branch-card" shadow="hover" style="margin-top: 20px; height:150px">
              <h3 style="text-align:center;">{{ item.name }}</h3>
            </el-card>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <ele-form-drawer
      v-model="formData"
      :span="24"
      :drawer-attrs="drawerAttrs"
      :form-desc="unitFormDesc"
      :visible.sync="drawerFormVisible"
      title="编辑单位"
      size="800px"
      :request-fn="handleUpdate"
    />
  </div>
</template>
<script>
import { unitFormDesc } from '../config'
import { updateMixin, detailMixin } from '@/mixins'
export default {
  mixins: [updateMixin, detailMixin],
  data () {
    return {
      unitFormDesc,
      drawerFormVisible: false,
      unit: {
        title: '单位名称1',
        address: '上海市浦东新区',
        contact: '联系人1111',
        mobile: '15563241566',
        endTime: '2023-10-20'
      },
      branchList: [
        {
          id: 1,
          name: '支部一'
        },
        {
          id: 2,
          name: '支部二'
        },
        {
          id: 3,
          name: '支部三'
        },
        {
          id: 4,
          name: '支部四'
        },
        {
          id: 5,
          name: '支部五'
        }
      ]
    }
  },
  created () {
    this.formData = this.unit
  },
  methods: {
    handleUpdate () {
    }
  }
}
</script>

<style lang="scss" scoped>
.used {
  background-color: #00C9BF ;
  padding: 10px 12px;
  border-radius: 10px;
  color: #ffffff;
  font-size: 12px;
  line-height: 18px;
  margin-left: 10px;
}
.outdate {
  background-color: #C91D00;
}
.unit-logo {
  position: absolute;
  width: 220px;
  right: 100px;
  top: 50px;
}
.base-info {
  border: 1px solid #FFD4A3;
  border-radius: 4px;
  .outdate-time {
     border-top: 1px solid #FFD4A3;
     padding-top: 10px;
     font-size: 14px;
    color: rgb(102, 102, 102);
    font-weight: normal;
    span {
      font-size: 24px;
      color: #0DBCB6
    }
  }
}
.label-icon {
  position: absolute;
  left: -40px;
  width: 30px;
  height: 30px;
}
.label {
  text-align: center;
  padding: 8px;
  color: #7D8DB5;
  font-weight: bold;
}
.count {
  color: #303E65;
  font-weight: bold;
}
.branch-card {
  width: 126px;
  height: 126px;
  color: #75899F;
  margin: 5px;
}
</style>

