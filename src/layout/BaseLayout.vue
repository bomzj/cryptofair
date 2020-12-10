<template>
  <div id="app" class="bg-gray-200">
    <div class="lg:container mx-auto overflow-auto">
      <Header />
      <main>
        <slot></slot>
      </main>
      <Footer />
    </div>
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