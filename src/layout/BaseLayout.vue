<template>
  <div id="app">
    <Header />
    <main>
      <slot></slot>
    </main>
    <Footer />
  </div>
</template>

<script>
import Header from '@/layout/Header'
import Footer from '@/layout/Footer'

export default {
  name: 'BaseLayout',
  components: {
    Header, Footer
  }
}
</script>