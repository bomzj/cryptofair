<template>
  <header class="bg-blue-800">
      <nav class="container mx-auto flex items-center justify-between flex-wrap px-6 py-6">
        <div class="flex items-center flex-shrink-0 text-white mr-6">
          <!-- <img src="../assets/btc-to-usd-white.svg" width="64" height="64" class="mr-2"/> -->
          <a href="/" class="font-semibold text-xl tracking-tight inline-block">Cryptofair</a>
        </div>
        <div class="block sm:hidden">
          <button class="flex items-center px-3 py-2 border rounded text-blue-200 border-blue-500 hover:text-white hover:border-white" @click="onBurgerMenuIconClick">
            <svg class="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Menu</title><path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"/></svg>
          </button>
        </div>
        <div class="w-full hidden sm:flex sm:items-center sm:w-auto" ref="menuItems">
          <div class="text-md sm:flex-grow">
            <a href="/offers" class="block mt-4 sm:inline-block sm:mt-0 text-blue-200 hover:text-white mr-4">
              Offers
            </a>
            <a href="/news" class="block mt-4 sm:inline-block sm:mt-0 text-blue-200 hover:text-white mr-4">
              News
            </a>
            <a href="/exchanges" class="block mt-4 sm:inline-block sm:mt-0 text-blue-200 hover:text-white mr-4">
              Exchanges
            </a>
            <a href="/coins" class="block mt-4 sm:inline-block sm:mt-0 text-blue-200 hover:text-white mr-4">
              Coins
            </a>
            <a href="/wallets" class="block mt-4 sm:inline-block sm:mt-0 text-blue-200 hover:text-white mr-4">
              Wallets
            </a>
          </div>
          <SelectCurrencyButton />
        </div>
      </nav>
    </header>
</template>

<script>
import SelectCurrencyButton from '@/currency/SelectCurrencyButton'

export default {
  name: 'Header',
  components: {
    SelectCurrencyButton
  },
  data() {
    return {
      isMenuVisible: null
    }
  },
  mounted () {
    this.isMenuVisible = window.getComputedStyle(this.$refs.menu).display == 'none';
  },
  methods: {
    onBurgerMenuIconClick() {
      this.$refs.menuItems.classList.toggle("hidden");
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
