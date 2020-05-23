<template>
  <section class="bg-blue-800 text-white px-6 py-3 text-center">
    <h2 class="mb-2 text-xl text-gray-300">Peer-to-Peer(P2P) Cryptocurrency Exchange Aggregator</h2> 
    <h1 class="text-4xl font-medium m-4 text-gray-300">Find the best prices to buy/sell Bitcoin, Ethereum and other Cryptocurrencies from people around the world</h1>
    <a href="/offers" class="inline-block px-12 py-4 mt-4 font-semibold text-xl text-white bg-blue-500 hover:bg-blue-400">Compare Prices</a>
    <section class="mt-10 mb-4">
      <h2 class="text-xl text-gray-300">The best cryptocurrency real-time prices from the most popular P2P exchanges</h2>
      <div class="flex flex-wrap justify-center mt-4">
        <div class="m-6 mr-12 flex flex-col items-center text-center sm:w-1/8 all:w-full">
          <div class="flex items-center">
            <img src="./btc.svg" width="50" class="mr-2" />
            <span class="inline-block text-2xl font-semibold text-gray-400">Bitcoin</span>
          </div>
          <span class="inline-block text-2xl font-bold mt-2">$9,642.33</span>
        </div>
        <div class="m-6 mr-12 flex flex-col items-center text-center sm:w-1/8 all:w-full">
          <div class="flex items-center">
            <img src="./eth.svg" width="50" class="mr-2" />
            <span class="inline-block text-2xl font-semibold text-gray-400">Ethereum</span>
          </div>
          <span class="inline-block text-2xl font-bold mt-2">$198.51</span>
        </div>
        <div class="m-6 mr-12 flex flex-col items-center text-center sm:w-1/8 all:w-full">
          <div class="flex items-center">
            <img src="./xrp.svg" width="50" class="mr-2" />
            <span class="inline-block text-2xl font-semibold text-gray-400">XRP</span>
          </div>
          <span class="inline-block text-2xl font-bold mt-2">$0.202593</span>
        </div>
        <div class="m-6 mr-12 flex flex-col items-center text-center sm:w-1/8 all:w-full">
          <div class="flex items-center">
            <img src="./eos.svg" width="50" class="mr-2" />
            <span class="inline-block text-2xl font-semibold text-gray-400">EOS</span>
          </div>
          <span class="inline-block text-2xl font-bold mt-2">$2.53</span>
        </div>
      </div>
    </section>

    
  </section>
</template>

<script>
export default {
  name: 'Intro'
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
