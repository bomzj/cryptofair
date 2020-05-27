<template>
  <div id="app">
    <Header />
    <Intro />
    <OurBenefits />
    <!-- <SupportedExchanges /> -->
    <Footer />
  </div>
</template>

<script>
import Header from '../../components/Header.vue'
import Intro from './Intro.vue'
import Footer from '../../components/Footer.vue'
import OurBenefits from './OurBenefits.vue'
//import SupportedExchanges from './SupportedExchanges.vue'

export default {
  name: 'App',
  components: {
    Header, Intro, OurBenefits, /*SupportedExchanges,*/ Footer
  }
}
</script>

<style>

</style>
