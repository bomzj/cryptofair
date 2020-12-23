<template>
  <div class="flex items-center px-8 py-5">
    <input class="form-input block w-full search-input outline-none text-xl" 
          v-model="searchQuery" 
          :placeholder="placeholder">
    <button class="-ml-8 clear-icon" @click="searchQuery = ''"/>
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