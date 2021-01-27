<template>
  <section class="flex flex-wrap items-center py-2 ml-6">
    <BuySellFilter class="mr-6 mb-4"/>
    <CryptoFilter class="mr-6 mb-4"/>
    <PaymentMethodFilter class="mr-6 mb-4" />
    <CurrencyFilter class="mr-6 mb-4"/>
    <CountryFilter class="mr-6 mb-4" />
    <MoreFilter class="mr-2 mb-4" />    
  </section>
</template>

<script>
import './filters.css'
import BuySellFilter from './BuySellFilter'
import CryptoFilter from './CryptoFilter'
import CurrencyFilter from './CurrencyFilter'
import PaymentMethodFilter from './PaymentMethodFilter'
import CountryFilter from './CountryFilter'
import MoreFilter from './MoreFilter'

export default {
  name: 'Filters',
  components: {
    BuySellFilter, CryptoFilter, CurrencyFilter, PaymentMethodFilter, 
    CountryFilter, MoreFilter
  }
}
</script>