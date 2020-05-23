<template>
  <div class="flex flex-wrap items-center my-0">
    <BuySellFilter class="text-lg m-2"/>
      
    <CryptoFilter class="text-lg m-2"/>

    <a href="#" class="border border-solid hover:border-gray-600 text-lg text-gray-500 hover:text-gray-600 font-normal py-1 px-4 rounded-full m-2">
      Payment Method
    </a>

    <a href="#" class="border border-solid hover:border-gray-600 text-lg text-gray-500 hover:text-gray-600 font-normal py-1 px-4 rounded-full m-2">
      More...
    </a>
  </div>
</template>

<script>
//import state from '@/store.js'
import BuySellFilter from './filters/BuySellFilter.vue'
import CryptoFilter from './filters/CryptoFilter.vue'
//console.log(state)
export default {
  name: 'App',
  components: {
    BuySellFilter, CryptoFilter
  },
  data() {
    return {
      amount: null,
      cryptoSelect: {
        value: [
          { name: 'Bitcoin', code: 'BTC' }
        ],
        options: [
          { name: 'Bitcoin', code: 'BTC' },
          { name: 'Ethereum', code: 'ETH' },
          { name: 'Tether', code: 'USDT' }
        ]
      },
      paymentSelect: {
        value: [
          { name: 'Bank Transfer' }
        ],
        options: [
          { name: 'Bank Transfer' },
          { name: 'SEPA Transfer' },
          { name: 'Credit Card' },
          { name: 'Skrill' },
          { name: 'PayPal' },
          { name: 'TransferWise' },
        ]
      }
    }
  }
}
</script>

<style>

</style>
