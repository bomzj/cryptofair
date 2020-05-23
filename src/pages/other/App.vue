<template>
  <div id="app">
    <Header />
    <p class="text-3xl p-20">To Be Done</p>
    <Footer />
  </div>
</template>

<script>
import Header from '../../components/Header.vue'
import Footer from '../../components/Footer.vue'

export default {
  name: 'App',
  components: {
    Header, Footer
  }
}
</script>

<style>

</style>
