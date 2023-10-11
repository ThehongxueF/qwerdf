<template>
  <div v-loading="pageLoading" class="app-container">
    <el-row :gutter="10">
      <el-col :lg="{ span: 24 }" :xl="{ span: 12 }" class="mb10">
        <el-card shadow="hover">
          <div class="header">
            <state-tag state="new" />
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
              >
                编辑
              </el-link>
            </span>
          </div>
          <h3>{{ unit.title }}</h3>
          <el-descriptions
            :column="1"
            :label-style="labelStyle"
            :content-style="contentStyle"
          >
            <el-descriptions-item label="单位地址"> {{ unit.address }} </el-descriptions-item>
            <el-descriptions-item label="单位联系人"> {{ unit.contact }} </el-descriptions-item>
            <el-descriptions-item label="联系方式"> {{ unit.mobile }} </el-descriptions-item>
            <el-descriptions-item label="自定义标语"> {{ '阿斯达克萨拉丁记录卡撒旦尽量躲开撒娇了' }} </el-descriptions-item>
            <el-descriptions-item label="账号过期时间"><span style="color: #ff4972; margin-right: 10px">{{ unit.endTime }}</span> <el-button size="mini" style="; margin-top: -10px;">续期</el-button> </el-descriptions-item>
          </el-descriptions>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  data () {
    return {
      unit: {
        title: '单位名称1',
        address: '上海市浦东新区',
        contact: '联系人1111',
        mobile: '15563241566',
        endTime: '2023-10-20'
      }
    }
  }
}
</script>

