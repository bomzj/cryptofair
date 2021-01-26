<template>
  <footer class="mt-20 px-6 mb-20">
    <h3 class="page-title text-center mb-4">
        All the Best Cryptocurrency Prices Directly From Millions Real People All Around The World In One Place! 
    </h3>
    <div class="flex flex-wrap">
      <div class="feature-list">
        <h4>First and the only one <b> peer-to-peer (p2p) crypto exchanges aggregator!</b></h4>
        <h4>P2P traiding platforms is a best way to buy & sell Bitcoin (BTC), Ethereum (ETH) and other cryptocurrencies globally without ID verification. <b> Find and Compare prices </b> among 5 leading secure person to person exchanges: LocalBitcoins, Paxful, LocalCryptos, etc</h4>
        <h4>Search for your best crypto trading deal today <b>without fees / registration / app downloading</b></h4>
      </div>
      <div class="feature-list">
        <h4>Find best prices from millions real people to trade the most popular cryptocoins - <b>Bitcoin, Ethereum, Tether</b> and others</h4>
        <h4>Modern and easy to use UI with convenient search filters to see prices in your local currency</h4>
        <h4>Buy Bitcoin with PayPal, Credit card, Skrill or 100+ other payment methods</h4>
        <h4>Looking for how to <b>trade Bitcoin anonymously</b>? Start to search offers now without verification! No KYC, No AML</h4>
      </div>
    </div>
    <!-- <ContactForm /> -->
  </footer>
</template>

<script>
import ContactForm from '@/layout/ContactForm.vue'

export default {
  components: { ContactForm },
}
</script>

<!-- Add "scoped" attribute to pmit CSS to this component only -->
<style scoped>
.feature-list h4 {
  @apply my-4;
}

.feature-list {
  @apply w-full px-8 text-base text-gray-600;
}

@screen lg {
  .feature-list {
    @apply w-1/2;
  }
}
</style>