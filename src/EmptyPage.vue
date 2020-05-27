<template>
  <div id="app">
    <Header />
    <div class="container flex mx-auto px-6">
		<h1 class="text-4xl font-medium my-6 text-gray-700">To Be Done</h1>
	</div>
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
