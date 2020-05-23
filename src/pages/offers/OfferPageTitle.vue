<template>
  <h1 class="text-4xl font-medium my-6 text-gray-700">Best Prices to {{ tradeType }} {{ crypto }}</h1>
</template>

<script>
// import state from '@/store.js'
// console.log(state)
export default {
  name: 'OfferPageTitle',
  data() {
    return {
      tradeType: 'Buy',
      crypto: 'Bitcoin'
    }
  }
}
</script>

<style>

</style>
