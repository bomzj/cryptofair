<template>
  <div class="flex flex-wrap items-center py-2 ml-6">
    <BuySellFilter class="mr-2 mb-2"/>
    <CryptoFilter class="mr-2 mb-2"/>
    <PaymentMethodFilter class="mr-2 mb-2" />
    <MoreFilter class="mr-2 mb-2" />    
  </div>
</template>

<script>
import './filters.css'
import BuySellFilter from './BuySellFilter'
import CryptoFilter from './CryptoFilter'
import PaymentMethodFilter from './PaymentMethodFilter'
import MoreFilter from './MoreFilter'

export default {
  name: 'Filters',
  components: {
    BuySellFilter, CryptoFilter, PaymentMethodFilter, MoreFilter
  }
}
</script>