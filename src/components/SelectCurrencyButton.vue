<template>
<div>
  <button @click="$modal.show($options.name)" class="select-currency-button">{{ state.currency }}</button>
  <v-modal :name="$options.name"  classes="modal" height="400px">
      <div class="flex flex-col h-full px-8 py-5">
        <header class="mb-10">
          <h2 class="text-lg text-center font-semibold">Select Currency</h2>
          <button class="float-right -mt-8 rounded-full hover:bg-gray-200" @click="closeModal">
            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 18 18"><path d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z"/></svg>
          </button>
        </header>
        <!-- <hr> -->
        <div class="flex-grow mb-0">
          <div class="flex items-center mb-8">
            <!--<img src="@/assets/search-icon.svg" class="-mr-6 z-10" /> -->
            <input class="form-input block w-full search-input outline-none" v-model="searchQuery" placeholder="Search Currency">
            <button class="-ml-8" @click="clearInput">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 18 18"><path fill="#a0aec0" d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z"/></svg>
            </button>
          </div>
          <div class="flex flex-wrap overflow-auto">
            <label v-for="currency in getFilteredCurrencyList()" :key="currency.name" class="flex items-center w-1/3 mb-6">
              <input type="radio" class="form-radio" v-model="selectedCurrency" :value="currency.name">
              <span class="ml-2">{{ currency.name }}</span>
            </label> 
          </div>
        </div>
        <footer class="flex justify-end">
          <button class="px-4 py-2 font-semibold text-lg text-gray-700 border-gray-500 hover:bg-gray-200 uppercase mr-4" @click="closeModal">Cancel</button>
          <button class="px-4 py-2 font-semibold text-lg text-white bg-blue-500 hover:bg-blue-400 uppercase" @click="onSave">Save</button>
        </footer>
    </div>
  </v-modal> 
   <!-- <Modal title="Select Currency" name="test">  
    <label v-for="(currency, index) in currencies" :key="currency" class="inline-flex items-center" :class="{'ml-6': index > 0}">
      <input type="radio" class="form-radio" v-model="selectedCurrency" :value="currency">
      <span class="ml-2">{{ currency }}</span>
    </label>
  </Modal> -->
</div>
</template>
<script>
import state from '@/app-state.js'

export default {
  name: 'SelectCurrencyButton',
  data() {
    return {
      currencies: [
        { name: 'USD' }, 
        { name: 'EUR' }, 
        { name: 'GBP' }, 
        { name: 'RUB' }, 
        
      ],
      selectedCurrency: state.currency || 'USD',
      searchQuery: '',
      state: state
    }
  },
  created() {
    //this.populateCryptoList();
    //console.log('after populateCryptoList()');
  },
  methods: {
    async populateCryptoList() {
      const response = await fetch('https://api.coingecko.com/api/v3/coins/list');
      const list = await response.json();
      if (list) {
      //  this.cryptos = list;
      }
      //console.log('populate finished')
    },
    getFilteredCurrencyList() {
      return this.currencies.filter(c => c.name.toLowerCase().includes(this.searchQuery));
    },
    clearInput() {
      this.searchQuery = '';
    },
    onSave() {
      // Save currency filter into app state so it will be available for all components
      state.currency = this.selectedCurrency;
      this.closeModal();
    },
    closeModal() {
      this.selectedCurrency = state.currency;
      this.$modal.hide(this.$options.name);
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .select-currency-button {
    @apply inline-block text-sm px-4 py-2 leading-none border rounded-full text-blue-200 border-blue-500;
    min-width: 62px;
  }
  
  .select-currency-button:hover {
    @apply border-white text-white;
  }
</style>


