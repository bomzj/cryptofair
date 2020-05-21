<template>
  <div>
    <button @click="toggleTradeType" class="trade-type-toggle">
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
.trade-type-toggle {
  @apply border-2 border-solid border-gray-600 text-gray-600 font-normal px-4 py-1 rounded-full;
  min-width: 62px;
}
</style>
