<template>
  <div>
    <button @click="$modal.show($options.name)" class="filter filter-active">
      {{ state.crypto }}
    </button>
    <v-modal :name="$options.name"  classes="modal" height="400px">
      <div class="flex flex-col h-full px-8 py-5">
        <header class="mb-10">
          <h2 class="text-lg text-center font-semibold">Select Cryptocurrency</h2>
          <button class="float-right -mt-8 rounded-full hover:bg-gray-200" @click="closeModal">
            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 18 18"><path d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z"/></svg>
          </button>
        </header>
        <!-- <hr> -->
        <div class="flex-grow mb-0">
          <div class="flex items-center mb-8">
            <!--<img src="@/assets/search-icon.svg" class="-mr-6 z-10" /> -->
            <input class="form-input block w-full search-input outline-none" v-model="searchQuery" placeholder="Search Cryptocurrency">
            <button class="-ml-8" @click="clearInput">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 18 18"><path fill="#a0aec0" d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z"/></svg>
            </button>
          </div>
          <div class="flex flex-wrap overflow-auto">
            <label v-for="crypto in getFilteredCryptoList()" :key="crypto.name" class="flex items-center w-1/3 mb-6">
              <input type="radio" class="form-radio" v-model="selectedCrypto" :value="crypto.name">
              <span class="ml-2">{{ crypto.name }}</span>
            </label> 
          </div>
        </div>
        <footer class="flex justify-end">
          <button class="button mr-4" @click="closeModal">Cancel</button>
          <button class="button button-primary" @click="onSave">Save</button>
        </footer>
    </div>
  </v-modal> 
  </div>
</template>

<script>
import store from '@/store.js'

export default {
  name: 'CryptoFilter',
  data() {
    return {
      cryptos: [
        { name: 'Bitcoin' }, 
        { name: 'Ethereum' }, 
        { name: 'XRP' }, 
        { name: 'Tether' }, 
        { name: 'Bitcoin Cash' }, 
        { name: 'Litecoin' }, 
        { name: 'Binance Coin' }
      ],
      selectedCrypto: store.state.crypto,
      searchQuery: '',
      state: store.state
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
    getFilteredCryptoList() {
      return this.cryptos.filter(c => c.name.toLowerCase().includes(this.searchQuery));
    },
    clearInput() {
      this.searchQuery = '';
    },
    onSave() {
      store.state.crypto = this.selectedCrypto;
      this.closeModal();
    },
    closeModal() {
      this.selectedCrypto = store.state.crypto;
      this.$modal.hide(this.$options.name);
    }
  }
}
</script>

<style>

</style>
