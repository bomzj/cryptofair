<template>
  <div>
    <button @click="toggleTradeType" class="border-2 border-solid border-gray-600 hover:border-gray-600 text-gray-600 font-normal py-1 px-4 rounded-full mr-3">
      {{ tradeType }}
    </button>
  </div>
</template>

<script>

export default {
  name: 'BuySellToggle',
  data() {
    return {
      tradeType: 'Buy'
    }
  },
  methods: {
    toggleTradeType() {
      this.tradeType = this.tradeType == 'Buy' ? 'Sell' : 'Buy';
    }
  }

}
</script>

<style>

</style>
