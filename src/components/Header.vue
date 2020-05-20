<template>
  <header class="bg-blue-800">
      <nav class="container mx-auto flex items-center justify-between flex-wrap px-6 py-6">
        <div class="flex items-center flex-shrink-0 text-white mr-6">
          <!-- <img src="../assets/btc-to-usd-white.svg" width="64" height="64" class="mr-2"/> -->
          <a href="/" class="font-semibold text-xl tracking-tight inline-block">Cryptofair</a>
        </div>
        <div class="block lg:hidden">
          <button class="flex items-center px-3 py-2 border rounded text-blue-200 border-blue-500 hover:text-white hover:border-white">
            <svg class="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Menu</title><path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"/></svg>
          </button>
        </div>
        <div class="w-full block lg:flex lg:items-center lg:w-auto">
          <div class="text-sm lg:flex-grow">
            <a href="#responsive-header" class="block mt-4 lg:inline-block lg:mt-0 text-blue-200 hover:text-white mr-4">
              Offers
            </a>
            <a href="#responsive-header" class="block mt-4 lg:inline-block lg:mt-0 text-blue-200 hover:text-white mr-4">
              News
            </a>
            <a href="#responsive-header" class="block mt-4 lg:inline-block lg:mt-0 text-blue-200 hover:text-white mr-4">
              Exchanges
            </a>
            <a href="#responsive-header" class="block mt-4 lg:inline-block lg:mt-0 text-blue-200 hover:text-white mr-4">
              Coins
            </a>
            <a href="#responsive-header" class="block mt-4 lg:inline-block lg:mt-0 text-blue-200 hover:text-white mr-4">
              Wallets
            </a>
          </div>
          <CurrencySwitcher />
          <!-- <div>
            <a href="#" class="inline-block text-sm px-4 py-2 leading-none border rounded text-blue-200 border-blue-500 hover:border-transparent hover:text-white hover:bg-blue-500 mt-4 lg:mt-0">$ USD</a>
          </div> -->
        </div>
      </nav>
    </header>
</template>

<script>
import CurrencySwitcher from './CurrencySwitcher'

export default {
  name: 'Header',
  components: {
    CurrencySwitcher
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
