<template>
  <section class="bg-gray-100">
    <div class="container mx-auto p-6">
      <h1 class="text-4xl font-medium text-gray-800 m-8 text-center">Supported Exchanges</h1>
      <div class="flex flex-wrap justify-around text-gray-800">
        <div class="flex m-8">
          <img src="../../assets/paxful.svg" class="w-64"/>
        </div>
        <div class="flex m-8">
          <img src="../../assets/localbitcoins.svg"  class="w-64" />
        </div>
        <div class="flex m-8">
          <img src="../../assets/localcoinswap.svg" class="w-64"/>
        </div>
        <div class="flex m-8">
          <img src="../../assets/bisq.svg" class="w-64"/>
        </div>
        <div class="flex m-8">
          <img src="../../assets/localcryptos.svg" class="w-64"/>
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
