<template>
  <div>
    <button @click="openModal" class="filter filter-active">
      {{ savedCoin }}
    </button>
    <v-modal :name="$options.name" :adaptive="true" width="700" :height="modalMaxHeight">
      <div class="flex flex-col h-full bg-gray-200"> 
        <header class="px-8 py-5">
          <h2 class="text-xl text-center text-gray-700 font-semibold">Select cryptocurrency you want to {{ state.tradeType.toLowerCase() }}</h2>
          <button class="float-right -mt-8 rounded-full hover:bg-gray-300" @click="closeModal">
            <img src="@/ui/close-icon.svg" width="30" height="30" />
          </button>
        </header>
        <div class="flex items-center px-8 py-5">
          <input class="form-input block w-full search-input outline-none" v-model="searchQuery" placeholder="Search crypto by name or symbol">
          <button class="-ml-8" @click="clearSearchQuery">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 18 18"><path fill="#a0aec0" d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z"/></svg>
          </button>
        </div>
        
        <div class="flex flex-wrap flex-grow content-start overflow-auto px-8 py-5">
          <label v-for="coin in filterCoinList()" :key="coin.symbol" class="flex items-center w-full sm:w-1/3 mb-6">
            <input type="radio" class="form-radio" v-model="selectedCoinInModal" :value="coin.symbol">
            <span class="text-lg ml-2">{{ coin.name }} <sup class="text-gray-500">{{ coin.symbol }}</sup></span>
          </label> 
        </div>
        
        <footer class="flex justify-end px-8 py-5">
          <button class="button mr-4" @click="closeModal">Cancel</button>
          <button class="button button-primary" @click="applyChanges">Apply</button>
        </footer>
      </div>
    </v-modal> 
  </div>
</template>

<script>
import store from '@/store.js'
import CryptocurrencyService from '@/cryptocurrency/cryptocurrency-service'

export default {
  name: 'CryptoFilter',
  data() {
    return {
      state: store.state,
      selectedCoinInModal: store.state.coin,
      searchQuery: '',
      coins: CryptocurrencyService.getCryptocurrencies()
    }
  },
  computed: {
    savedCoin: () => CryptocurrencyService.getCryptocurrencies().find(c => c.symbol == store.state.coin).name,
    modalMaxHeight: () => window.innerHeight// - 10
  },
  methods: {
    filterCoinList() {
      return CryptocurrencyService.getCryptocurrencies().filter(c => 
        c.name.toLowerCase().includes(this.searchQuery) ||
        c.symbol.toLowerCase().includes(this.searchQuery)
      );
    },
    clearSearchQuery() {
      this.searchQuery = '';
    },
    openModal() {
      this.selectedCoinInModal = store.state.coin;
      this.$modal.show(this.$options.name)
    },
    closeModal() {
      this.$modal.hide(this.$options.name);
    },
    applyChanges() {
      store.state.coin = this.selectedCoinInModal;
      this.closeModal();
    }
  }
}
</script>