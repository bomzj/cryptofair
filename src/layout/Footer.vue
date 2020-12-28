<template>
  <footer class="m-8">
    <div class="flex flex-col">
      <h1 class="text-2xl font-medium text-center text-gray-700">
        All the best cryptocurrency prices directly from real people all around the world in one place!
        <!-- The best cryptocurrency prices to buy or sell Bitcoin, Ethereum 
        and other crypto directly from real people around the world in one place! -->
      </h1>
      <div class="flex flex-wrap flex-col lg:flex-row mt-4">
        <ul class="list-none text-lg text-gray-600 w-full lg:w-2/3">
          <li>First and the only one p2p crypto exchange aggregator!</li>
          <li>Looks up in leading p2p exchanges: LocalBitcoins, Paxful, LocalCryptos and etc</li>
          <li>Finds the best prices to buy or sell Bitcoin, Ethereum and other crypto coins</li>
          <li >Modern and easy to use UI with convenient search filters to see prices in your local currency</li>
          <li>No fees, no registration, no app downloading</li>
          <li>No verification, no KYC, no AML</li>
        </ul>
        <div class="flex flex-col w-full lg:w-1/3">
          <textarea class="form-textarea block flex-grow text-xl my-2" rows="6" placeholder="Write to us" />
          <button class="button button-outline-primary self-end" click="submitFeedback">Submit</button>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
    
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
ul li {
  @apply my-4;
}
</style>