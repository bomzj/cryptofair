<template>
  <footer class="m-8">
    <div class="flex flex-col text-center my-12">
      <h1 class="page-title">
        All the best cryptocurrency prices directly from real people all around the world in one place!
        <!-- The best cryptocurrency prices to buy or sell Bitcoin, Ethereum 
        and other crypto directly from real people around the world in one place! -->
      </h1>
      <ul class="list-none text-lg text-gray-600">
        <li>First and the only one p2p crypto exchange aggregator!</li>
        <li>Looks up in leading p2p exchanges: LocalBitcoins, Paxful, LocalCryptos and etc</li>
        <li>Finds the best prices to buy or sell Bitcoin, Ethereum and other crypto coins</li>
        <li>Modern and easy to use UI with convenient search filters to see prices in your local currency</li>
        <li>No fees, no registration, no app downloading</li>
        <li>No verification, no KYC, no AML</li>
      </ul>
    </div>
    <ContactForm />
  </footer>
</template>

<script>
import ContactForm from '@/layout/ContactForm.vue'

export default {
  components: { ContactForm },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
ul li {
  @apply my-4;
}
</style>