<template>
  <div id="app">
    <Header />
    <div class="container flex flex-col mx-auto">
      <Filters />
      <Offers />
    </div>
    <Footer />
  </div>
</template>

<script>
import Header from '../../components/Header.vue'
import Footer from '../../components/Footer.vue'
import Offers from './Offers.vue'
import Filters from './Filters.vue'

export default {
  name: 'App',
  components: {
    Header, Filters, Offers, Footer
  }
}
</script>

<style>

</style>
