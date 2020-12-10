<template>
  <header class="flex flex-col lg:flex-row flex-wrap items-center justify-center lg:justify-start py-2 px-6 lg:p-6">
    <div class="flex flex-col sm:flex-row lg:flex-grow items-center lg:mr-6">
      <SiteLogo class="sm:mr-6" />
      <SiteShortDescription />
    </div>
    <div class="flex items-center mt-4 lg:mt-0">
      <CryptoMarketPrice class="mr-6"/>
      <UserCurrencySelector />
    </div>
  </header>
</template>

<script>
import SiteLogo from '@/layout/SiteLogo.vue'
import SiteShortDescription from '@/layout/SiteShortDescription.vue'
import CryptoMarketPrice from '@/layout/CryptoMarketPrice.vue'
import UserCurrencySelector from '@/currency/UserCurrencySelector.vue'

export default {
  name: 'Header',
  components: {
    SiteLogo, SiteShortDescription, CryptoMarketPrice, UserCurrencySelector
  },
  data() {
    return {
     
    }
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
