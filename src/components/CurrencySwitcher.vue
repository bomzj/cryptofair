<template>
  <div>
    <button @click="showModal" class="inline-block text-sm px-4 py-2 leading-none border rounded-full text-blue-200 border-blue-500 hover:border-white hover:text-white mt-4 lg:mt-0">{{ currency }}</button>
    <modal name="currency-switcher" width="400px">
      <div>
        <div class="px-4 py-5">
          <h2 class="text-lg text-center font-semibold">Select Currency</h2>
          <button class="float-right -mt-8 rounded-full hover:bg-gray-200 focus:outline-none" @click="$modal.hide('currency-switcher')">
            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 18 18"><path d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z"/></svg>
          </button>
        </div>
        <hr />
        <div class="px-6 py-5 text-center">
          <label class="inline-flex items-center">
            <input type="radio" class="form-radio focus:shadow-none" v-model="currency" value="USD">
            <span class="ml-2">USD</span>
          </label>
          <label class="inline-flex items-center ml-6">
            <input type="radio" class="form-radio focus:shadow-none" v-model="currency" value="EUR">
            <span class="ml-2">EUR</span>
          </label>
           <label class="inline-flex items-center ml-6">
            <input type="radio" class="form-radio focus:shadow-none" v-model="currency" value="GBP">
            <span class="ml-2">GBP</span>
          </label>
          <label class="inline-flex items-center ml-6">
            <input type="radio" class="form-radio focus:shadow-none" v-model="currency" value="RUB">
            <span class="ml-2">RUB</span>
          </label>
        </div>
      </div>
    </modal>
  </div>
</template>

<script>

export default {
  name: 'CurrencySwitcher',
  components: {
  
  },
  data() {
    return {
      currency: 'USD'
    }
  },
  methods: {
    showModal() {
      this.$modal.show('currency-switcher')
    }
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.form-radio {
  @apply .form-radio .w-6 .h-6 ;
}
</style>
