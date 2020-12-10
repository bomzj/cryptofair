<template>
  <BaseLayout>
    <div class="flex flex-col mx-auto px-6">
      <Filters class="m-3" />
      <OfferList class="mb-6"/>
    </div>
  </BaseLayout>
</template>

<script>
import OfferList from './OfferList'
import Filters from '@/filter/Filters'
import BaseLayout from '@/layout/BaseLayout'

export default {
  name: 'OfferListPage',
  components: {
    BaseLayout, Filters, OfferList
  }
}
</script>

<style>

</style>