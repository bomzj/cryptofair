<template>
  <section class="bg-gray-200">
    <div class="container mx-auto p-6">
      <h2 class="text-4xl font-semibold text-center mb-8 text-center">Supported Exchanges</h2>
      <div class="flex flex-wrap justify-around text-gray-800">
        <div class="flex m-6">
          <img src="../../assets/paxful.svg" width="200"/>
        </div>
        <div class="flex m-6">
          <img src="../../assets/localbitcoins.svg"  width="50"  class="mr-3" />
          <p class="text-3xl text-gray-700 font-bold">LocalBitcoins</p>
        </div>
        <div class="flex m-6">
          <img src="../../assets/localcoinswap.svg"  width="80" class="mr-3"/>
          <p class="text-3xl text-gray-700 font-bold">LocalCoinSwap</p>
        </div>
        <div class="flex m-6">
          <img src="../../assets/bisq.svg"  width="120" class="mr-3"/>
        </div>
        <div class="flex m-6">
          <p class="text-3xl text-gray-700 font-bold">LocalCryptos</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'Header'
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
