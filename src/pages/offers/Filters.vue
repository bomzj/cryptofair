<template>
  <div class="flex flex-wrap items-center mx-auto my-8">
    <BuySellToggleFilter class="mr-2"/>
      
    <a href="#" class="border-2 border-solid border-gray-600 hover:border-gray-600 text-gray-600 font-normal py-1 px-4 rounded-full mr-3">
      Bitcoin
    </a>

    <a href="#" class="border border-solid hover:border-gray-600 text-gray-500 hover:text-gray-600 font-normal py-1 px-4 rounded-full mr-3">
      Payment Method
    </a>

    <a href="#" class="border border-solid hover:border-gray-600 text-gray-500 hover:text-gray-600 font-normal py-1 px-4 rounded-full">
      More...
    </a>
  </div>
</template>

<script>
import BuySellToggleFilter from './filters/BuySellToggleFilter.vue'

export default {
  name: 'App',
  components: {
    BuySellToggleFilter
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
