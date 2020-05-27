<template>
  <h1 class="text-4xl font-medium my-6 text-gray-700">The Best Prices to {{ state.tradeType }} {{ state.crypto }}</h1>
</template>

<script>
import store from '@/store.js'

export default {
  name: 'OfferPageTitle',
  data() {
    return {
      state: store.state
    }
  }
}
</script>

<style>

</style>
