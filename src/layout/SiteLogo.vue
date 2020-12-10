<template>
  <a href="/" class="inline-block text-4xl lg:text-4xl 2xl:text-6xl font-bold uppercase text-gray-700">Cryptofair</a>
</template>

<script>
import store from '@/store.js'

export default {
  name: 'SiteLogo',
  data() {
    return {
      state: store.state
    }
  }
}
</script>

<style>

</style>
