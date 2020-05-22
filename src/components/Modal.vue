<template>
  
</template>

<script>

export default {
  name: 'Modal',
  props: ['title', 'name'],
  components: {
  
  },
  data() {
    return {
      currencies: ['USD', 'EUR', 'GBP', 'RUB'],
      selectedCurrency: 'USD'
    }
  },
  mounted() {
    this.$refs.modal.attributes.name.value = this.name;
    
  },
  methods: {
    showModal() {
      this.$modal.show(this.name)
    }
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
  .vm--modal.modal {
    border-radius: 22px;
  }
</style>