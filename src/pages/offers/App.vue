<template>
  <div id="app">
    <Header />
    <div class="container flex flex-col mx-auto px-6">
      <OfferPageTitle />
      <Filters class="mb-6" />
      <Offers class=""/>
    </div>
    <Footer />
  </div>
</template>

<script>
import Header from '../../components/Header.vue'
import Footer from '../../components/Footer.vue'
import Offers from './Offers.vue'
import Filters from './Filters.vue'
import OfferPageTitle from './OfferPageTitle.vue'

export default {
  name: 'App',
  components: {
    Header, OfferPageTitle, Filters, Offers, Footer
  }
}
</script>

<style>

</style>
