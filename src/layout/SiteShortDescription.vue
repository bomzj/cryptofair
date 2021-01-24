<template>
  <div class="text-base 2xl:text-2xl text-gray-600">
    <h1>Peer-to-Peer Cryptocurrency Exchanges Aggregator</h1>
    <h2>Compare best prices to {{ state.tradeType.toLowerCase() }} {{ getCryptocurrencyName(state.coin) }} without KYC</h2>
  </div>
</template>

<script>
import store from '@/store.js'
import CryptocurrencyService from '@/cryptocurrency/cryptocurrency-service'

export default {
  name: 'SiteShortDescription',
  data() {
    return {
      state: store.state
    }
  },
  methods: {
    getCryptocurrencyName(code) {
      return CryptocurrencyService.getCryptocurrencyNameBy(code)
    }
  }
}
</script>

<style>

</style>
