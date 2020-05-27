<template>
  <div>
    <button @click="toggleTradeType" class="filter filter-active">
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

<style scoped>
button {
  min-width: 66px;
} 
</style>
