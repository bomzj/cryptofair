<template>
  <div>
    <button @click="toggleTradeType" class="buy-sell-filter">
      {{ tradeType }}
    </button>
  </div>
</template>

<script>
export default {
  name: 'BuySellFilter',
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
@import '../offers-page.css';

.buy-sell-filter {
  @apply button-filter;
  min-width: 66px;
} 
</style>
