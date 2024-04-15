<!--
* 对接跟进列表组件。
*
* 支持新增、编辑跟进记录
*
* @props
* targetId 对接目标id 必填
* targetType 对接目标类型 必填
* showAdd 控制新增按钮的显示与隐藏
* showEdit 控制编辑按钮的显示与隐藏
*
-->
<template>
  <div>
    <!-- 列表 -->
    <el-table
      v-loading="listLoading"
      :data="followNotes"
      height="300"
      fit
      style="width: 100%;"
    >
      <!-- 空 -->
      <el-empty slot="empty" :image-size="100" description="暂无数据" />
      <!-- 展开内容 -->
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="table-expand">
            <el-form-item label="跟进人">
              <span>{{ props.row.follower && props.row.follower.name }}</span>
            </el-form-item>
            <el-form-item label="跟进内容">
              <span>{{ props.row.content }}</span>
            </el-form-item>
            <el-form-item label="附件图片">
              <!-- <FileList v-if="props.row.images && props.row.images.length" :list="props.row.images" />
              <i v-else>暂无</i> -->
              <el-link
                v-if="props.row.attachments && ( props.row.attachments.length > 0 )"
                :icon="download.loading ? 'el-icon-loading' : 'el-icon-download'"
                type="info"
                @click="onDownload(props.row.id)"
              >
                下载文件
              </el-link>
              <i v-else>暂无</i>
            </el-form-item>
            <el-form-item label="更新时间">
              <span><i class="el-icon-time" /> {{ props.row.updatedAt }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column
        v-slot="{ row }"
        prop="title"
        label="跟进标题"
      >
        {{ row.title }}
      </el-table-column>
      <el-table-column
        prop="createdAt"
        label="创建时间"
      />
      <el-table-column
        prop="action"
        label="操作"
        width="120px"
        center
      >
        <template slot="header">
          <el-button
            v-if="showAdd"
            icon="el-icon-plus"
            type="text"
            @click="onCreate"
          >新增跟进</el-button>
        </template>
        <template
          v-slot="{ row }"
        >
          <el-link
            v-if="showEdit"
            icon="el-icon-edit"
            @click="() => onEdit(row)"
          >编辑</el-link>
        </template>
      </el-table-column>
    </el-table>
    <div class="page-container">
      <pagination
        v-show="total>0"
        :total="total"
        :page-no.sync="listQuery.pageNo"
        :limit.sync="listQuery.pageSize"
        @pagination="getList"
      />
    </div>

    <!-- 抽屉 -->
    <ele-form-drawer
      v-model="formData"
      :span="24"
      :is-loading="drawerFormLoading"
      :form-desc="formDesc"
      :drawer-attrs="drawerAttrs"
      :visible.sync="drawerFormVisible"
      :title="editMode ? '编辑跟进' : '新增跟进'"
      size="800px"
      @request="onSubmit"
    />
    <!-- 下载弹窗 -->
    <el-dialog title="文件下载" width="600px" :visible.sync="download.visible">
      <el-alert
        :closable="false"
        title="临时链接，请尽快完成下载"
        type="info"
        effect="light"
        show-icon
      />

      <div v-for="(item, index) in attachments" :key="index" class="mt20 mb20">
        <a
          :href="item.url"
          target="_blank"
          rel="noopener noreferrer"
          class="mb10"
        >
          <el-link type="primary">
            <i class="el-icon-download" />
            {{ item.fileName + item.extension }}
          </el-link>
        </a>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import cloneDeep from 'lodash/cloneDeep'
import { listMixin } from '@/mixins'
import { FollowNote } from '@/api'
import { Local } from '@/utils/storage'
import { getToken } from '@/utils/auth'
import { TOKEN_KEY, COLLEGE_DOMAIN_KEY } from '@/data/constant'
// import { imgUploadOptions } from '@/data/options'
// import FileList from '../FileList'

const modelMap = {
  id: 'ID',
  title: '标题',
  content: '内容',
  images: '附件图片',
  createdAt: '创建时间',
  updatedAt: '更新时间',
  attachmentIds: '附件图片'
}

const headers = {
  [TOKEN_KEY]: getToken(),
  [COLLEGE_DOMAIN_KEY]: Local.get(COLLEGE_DOMAIN_KEY)
}
const uploadUrl = `${process.env.VUE_APP_BASE_API}${process.env.VUE_APP_API_PREFIX}/attachmentUpload`

const formDesc = {
  title: {
    label: modelMap.title,
    type: 'input',
    required: true
  },
  content: {
    label: modelMap.content,
    type: 'textarea',
    required: true
  },
  // images: {
  //   label: modelMap.images,
  //   type: 'image-uploader',
  //   attrs: {
  //     ...imgUploadOptions,
  //     headers,
  //     multiple: true
  //   }
  // },
  attachmentIds: {
    label: modelMap.attachmentIds,
    type: 'upload-file',
    valueFormatter (files) {
      files = files.map(item => item.id ? item.id : item)
      return files
    },
    displayFormatter (files) {
      return Array.isArray(files) ? files.map(item => {
        return item.name ? item : ({
          id: item.id,
          size: item.size,
          name: `${item.fileName}${item.extension}`
        })
      }) : files
    },
    attrs: {
      limit: 5,
      headers,
      action: uploadUrl,
      isCanDownload: false,
      responseFn (response, file) {
        return response
      }
    }
  }
}

export default {
  name: 'FollowNoteList',
  // components: { FileList },
  mixins: [listMixin],
  props: {
    targetId: {
      type: [String, Number],
      default: null,
      required: true
    },
    targetType: {
      type: String,
      default: null,
      required: true
    },
    showAdd: {
      type: Boolean,
      default: true
    },
    showEdit: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      formDesc,
      formData: {},
      followNotes: [],
      editMode: true,
      drawerFormVisible: false,
      drawerFormLoading: false,
      drawerAttrs: {
        'before-close': this.handleClose
      },
      listQuery: {
        pageNo: 1,
        pageSize: 5
      },
      attachments: [],
      download: {
        loading: false,
        visible: false,
        files: []
      }
    }
  },
  mounted () {
    this.getList()
  },
  methods: {
    async getList () {
      try {
        const params = {
          ...this.listQuery,
          targetId: this.targetId,
          targetType: this.targetType
        }
        const { followNotes, count } = await FollowNote.getFollowNotesOfTarget(params)
        this.followNotes = followNotes
        this.total = count
      } finally {
        this.listLoading = false
      }
    },
    onCreate () {
      this.editMode = false
      this.formData = {}
      this.drawerFormVisible = true
    },
    onEdit (row) {
      this.editMode = true
      this.formData = cloneDeep(row)
      if (row.attachmentIds && row.attachmentIds.length > 0) {
        this.formData.attachmentIds = row.attachments
      }
      this.drawerFormVisible = true
    },
    async onSubmit (data) {
      this.drawerFormLoading = true
      data.targetId = this.targetId
      data.targetType = this.targetType
      if (data.attachmentIds && data.attachmentIds.length === 0) {
        data.attachmentIds = null
      }
      try {
        await FollowNote.saveFollowNote(data)
        this.drawerFormVisible = false
        this.$message.success('提交成功')
        this.getList()
      } finally {
        this.drawerFormLoading = false
      }
    },
    async onDownload (id) {
      try {
        this.download.loading = true
        this.attachments = await FollowNote.getAttachments(id)
        this.download.visible = true
      } finally {
        this.download.loading = false
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .table-expand {
    font-size: 0;
  }
  .table-expand label {
    width: 90px;
    color: #99a9bf;
  }
  .table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 100%;
  }
</style>
