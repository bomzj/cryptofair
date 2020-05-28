<template>
  <BaseLayout>
    <div class="container flex flex-col mx-auto px-6">
      <OfferPageTitle />
      <Filters class="mb-6" />
      <OfferList class="mb-6"/>
    </div>
  </BaseLayout>
</template>

<script>
import OfferList from './OfferList'
import Filters from '@/filter/Filters'
import OfferPageTitle from './OfferPageTitle'
import BaseLayout from '@/layout/BaseLayout'

export default {
  name: 'OfferListPage',
  components: {
    BaseLayout, OfferPageTitle, Filters, OfferList
  }
}
</script>

<style>

</style>