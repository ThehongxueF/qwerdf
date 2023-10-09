<template>
  <div>
    <froala-view v-model="dataPushAgreement.content" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Promotional',
  computed: {
    ...mapGetters(['dataPushAgreement'])
  },
  async created () {
    await this.$store.dispatch('getUserAgreements', { type: 'dataPush' })
  }
}
</script>
