<!--
* 版权显示。
-->
<template>
  <p v-if="showCopyRight" class="home-footer-bottom">
    <a
      v-if="icpState"
      class="link-item ignore-mark"
      :href="copyright && copyright.icpUrl"
      target="_blank"
    >{{ copyright && copyright.icpCode }}</a>
    <a
      v-if="govState"
      class="link-item ignore-mark"
      :href="copyright && copyright.govUrl"
      target="_blank"
    >{{ copyright && copyright.govCode }}</a>
    <span v-if="copyrightTextState" class="item ignore-mark">{{ copyright && copyright.copyrightText }}</span>
    <span v-if="copyrightEnglishState" class="item ignore-mark">{{ copyright && copyright.copyrightEnglish }}</span>
  </p>
</template>

<script>
import { Copyright } from '@/api'

export default {
  name: 'FooterBottom',
  data () {
    return {
      copyright: {}
    }
  },
  computed: {
    copyrightTextState () {
      return this.copyright && this.copyright.copyrightTextState
    },
    copyrightEnglishState () {
      return this.copyright && this.copyright.copyrightEnglishState
    },
    icpState () {
      return this.copyright && this.copyright.icpState
    },
    govState () {
      return this.copyright && this.copyright.govState
    },
    showCopyRight () {
      return this.copyrightTextState || this.copyrightEnglishState || this.icpState || this.govState
    }
  },
  async created () {
    await this.getCopyright()
  },
  methods: {
    async getCopyright () {
      this.copyright = await Copyright.getCopyright('college-guest')
    }
  }
}
</script>

<style scoped lang="scss">
.home-footer-bottom {
  width: 100%;
  height: 40px;
  text-align: center;
  color: #606266;
  @include font(12px, 400, 40px);
  .item {
    margin: 0 4px;
  }
  .link-item {
    margin: 0 4px;
    color: #606266;
    display: inline-block;
    cursor: pointer;
  }
  .link-item:hover {
    color: var(--color-primary);
  }
}
</style>
