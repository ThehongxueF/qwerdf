<template>
  <div class="page-wrapper">
    <div class="modules-wrapper">
      <div
        v-for="(item) in list"
        :key="item.id"
        class="module-item"
        @click="$router.push({ name: 'thirdParty.detail', params: { id: item.id } })"
      >
        <img :src="item.logoUrl" alt="LOGO" class="cover">
        <span class="label one-text-overflow">{{ item.name }}</span>
      </div>
    </div>
    <pagination
      v-show="total>0"
      :total="total"
      :background="false"
      :page-no.sync="listQuery.pageNo"
      :limit.sync="listQuery.pageSize"
      @pagination="getList"
    />
  </div>
</template>

<script>
// import { Plugin } from '@/api'
import { listMixin } from '@/mixins'
import Pagination from '@/components/Pagination'

export default {
  name: 'ThirdParty',
  components: { Pagination },
  mixins: [listMixin],
  data () {
    return {
      listQuery: {
        pageNo: 1,
        pageSize: 50
      }
    }
  },
  mounted () {
    this.getList()
  },
  methods: {
    async getList () {
      this.listLoading = true
      try {
        // const { plugins, count } = await Plugin.getPlugins({
        //   ...this.listQuery
        // })
        // this.list = plugins
        // this.total = count
        this.listLoading = false
      } catch ({ message = '获取插件列表出错' }) {
        this.$message.error(message)
        this.listLoading = false
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.modules-wrapper {
  display: flex;
  flex-wrap: wrap;

  .module-item {
    width: 150px;
    margin: 0 20px 20px 0;
    padding: 10px 20px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    cursor: pointer;

    &:hover {
      border-radius: 8px;
      background-color: #F7F9FB;

      .label {
        color: var(--color-primary);
      }
    }

    .cover {
      @include wh(40px, 40px);

      display: inline-block;
      border-radius: 4px;
    }
    .label {
      @include ft(14px, 20px);

      margin: 10px 0 0 0;
      color: #000000;
    }
  }
}
</style>
