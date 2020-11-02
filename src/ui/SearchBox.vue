<template>
  <div class="flex items-center px-8 py-5">
    <input class="form-input block w-full search-input outline-none" 
          v-model="searchQuery" 
          :placeholder="placeholder">
    <button class="-ml-8" @click="searchQuery = ''">
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 18 18"><path fill="#a0aec0" d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z"/></svg>
    </button>
  </div>
</template>

<script>
export default {
  name: 'SearchBox',
  props: ['placeholder'],
  data() {
    return {
      searchQuery: '',
    }
  },
  watch: {
    searchQuery() {
      this.$emit('change', this.searchQuery)
    }
  }
}
</script>