<template>
  <footer class="mt-20 px-6 mb-20">
    <h3 class="page-title text-center mb-4">
        All the Best Cryptocurrency Prices Directly From Millions Real People All Around The World In One Place! 
    </h3>
    <div class="flex flex-wrap">
      <div class="feature-list">
        <h4>First and the only one p2p crypto exchanges aggregator!</h4>
        <h4>Compare prices among 5 leading secure p2p exchanges: LocalBitcoins, Paxful, LocalCryptos, etc</h4>
        <h4>Search for your best crypto trading deal today without fees, registration, app downloading</h4>
      </div>
      <div class="feature-list">
        <h4>Find the best prices to buy/sell the most popular cryptocoins - Bitcoin, Ethereum, Tether and others</h4>
        <h4>Modern and easy to use UI with convenient search filters to see prices in your local currency</h4>
        <h4>No verification, no KYC, no AML to start search now</h4>
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