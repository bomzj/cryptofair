<template>
  <footer class="mt-20 px-6 mb-20">
    <h2 class="page-title text-center mb-4">
        All the best cryptocurrency prices directly from millions real people all around the world in one place!
        <!-- The best cryptocurrency prices to buy or sell Bitcoin, Ethereum 
        and other crypto directly from real people around the world in one place! -->
    </h2>
    <div class="flex flex-wrap">
      <div class="feature-list">
        <p>First and the only one p2p crypto exchanges aggregator!</p>
        <p>Compare prices among leading secure p2p exchanges: LocalBitcoins, Paxful, LocalCryptos and etc</p>
        <p>Search for your best deal today without fees, registration and app downloading</p>
      </div>
      <div class="feature-list">
        <p>Find the best prices to buy or sell the most popular crypto - Bitcoin, Ethereum and other crypto coins</p>
        <p>Modern and easy to use UI with convenient search filters to see prices in your local currency</p>
        <p>No verification, no KYC, no AML to start search now</p>
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
.feature-list p {
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