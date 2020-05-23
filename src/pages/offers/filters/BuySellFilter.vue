<template>
  <div>
    <button @click="toggleTradeType" class="buy-sell-filter">
      {{ state.tradeType }}
    </button>
  </div>
</template>

<script>
import store from '@/store.js'

export default {
  name: 'BuySellFilter',
  data() {
    return {
      state: store.state
    }
  },
  methods: {
    toggleTradeType() {
      store.state.tradeType = store.state.tradeType == 'Buy' ? 'Sell' : 'Buy';
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
