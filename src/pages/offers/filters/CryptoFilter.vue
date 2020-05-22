<template>
  <div>
    <button class="crypto-filter">
      {{ selectedCrypto }}
    </button>
  </div>
</template>

<script>

export default {
  name: 'CryptoFilter',
  data() {
    return {
      cryptos: ['BTC', 'ETH', 'XRP', 'EOS', 'USDT'],
      selectedCrypto: 'Bitcoin'
    }
  },
  methods: {
    
  }
}
</script>

<style>
@import '../offers-page.css';

.crypto-filter {
  @apply button-filter;
  min-width: 62px;
}
</style>
