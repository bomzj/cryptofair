<template>
  <div class="flex flex-wrap items-center my-0">
    <BuySellFilter class="m-2"/>
    <CryptoFilter class="m-2"/>
    <PaymentMethodFilter class="m-2" />
    <MoreFilter class="m-2" />    
  </div>
</template>

<script>
import BuySellFilter from './filters/BuySellFilter.vue'
import CryptoFilter from './filters/CryptoFilter.vue'
import PaymentMethodFilter from './filters/PaymentMethodFilter.vue'
import MoreFilter from './filters/MoreFilter'

export default {
  name: 'Filters',
  components: {
    BuySellFilter, CryptoFilter, PaymentMethodFilter, MoreFilter
  }
}
</script>