<template>
  <div id="app" class="bg-gray-200 overflow-auto">
    <Header />
    <main>
      <slot></slot>
    </main>
    <Footer />
  </div>
</template>

<script>
import Header from '@/layout/Header.vue'
import Footer from '@/layout/Footer.vue'

export default {
  name: 'BaseLayout',
  components: {
    Header, Footer
  }
}
</script>