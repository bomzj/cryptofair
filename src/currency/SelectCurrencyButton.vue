<template>
  <div>
    <button @click="openModal" class="button-currency">
      {{ savedCurrency }}
    </button>
    <v-modal :name="$options.name" :adaptive="true" width="700" :height="modalMaxHeight">
      <div class="flex flex-col h-full"> 
        <header class="px-8 py-5">
          <h2 class="text-lg text-center font-semibold">Select Currency</h2>
          <button class="float-right -mt-8 rounded-full hover:bg-gray-200" @click="closeModal">
            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 18 18"><path d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z"/></svg>
          </button>
        </header>
        
        <div class="flex items-center px-8 py-5">
          <input class="form-input block w-full search-input outline-none" v-model="searchQuery" placeholder="Search Currency">
          <button class="-ml-8" @click="clearSearchQuery">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 18 18"><path fill="#a0aec0" d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z"/></svg>
          </button>
        </div>
        
        <div class="flex flex-wrap flex-grow content-start overflow-auto px-8 py-5">
          <template v-if="filterCurrencyList(topCurrencyList).length">
            <label  v-for="item in filterCurrencyList(topCurrencyList)" :key="item.code" class="flex items-center w-full sm:w-1/2 mb-6">
              <input type="radio" class="form-radio" v-model="selectedCurrencyInModal" :value="item.code">
              <span class="text-lg ml-2">{{ item.name }} <sup class="text-gray-500">{{ item.code }}</sup></span>
            </label> 
          
            <hr class="w-full mx-5 mb-6">
          </template>

          <label v-for="item in filterCurrencyList(bottomCurrencyList)" :key="item.code" class="flex items-center w-full sm:w-1/2 mb-6">
            <input type="radio" class="form-radio" v-model="selectedCurrencyInModal" :value="item.code">
            <span class="text-lg ml-2">{{ item.name }} <sup class="text-gray-500">{{ item.code }}</sup></span>
          </label> 
        </div>
          
        <footer class="flex justify-end px-8 py-5">
          <button class="button mr-4" @click="closeModal">Cancel</button>
          <button class="button button-primary" @click="onApply">Apply</button>
        </footer>
      </div>
    </v-modal> 
  </div>
</template>

<script>
import store from '@/store.js'
import CurrencyService from './currency-service'

export default {
  name: 'SelectCurrencyButton',
  data() {
    return {
      selectedCurrencyInModal: store.state.userCurrency,
      searchQuery: '',
      topCurrencyList: [],
      bottomCurrencyList: [],
    }
  },
  computed: {
    savedCurrency: () => store.state.userCurrency,
    modalMaxHeight: () => window.innerHeight - 10
  },
  created() {
    this.buildCurrencyLists()
  },
  methods: {
    filterCurrencyList(currencyList) {
      return currencyList.filter(i => 
        i.name.toLowerCase().includes(this.searchQuery) ||
        i.code.toLowerCase().includes(this.searchQuery)
      )
    },
    async buildCurrencyLists() {
      let currencyList = CurrencyService.getCurrencies()

      // build top currency list
      let predictedUserCurrency = await CurrencyService.getUserCurrencyByGeolocation()

      this.topCurrencyList = [currencyList.find(i => i.code == 'USD')]

      if (!predictedUserCurrency || predictedUserCurrency.code == 'USD') {
        this.topCurrencyList.push(currencyList.find(i => i.code == 'EUR'));
      } else {
        this.topCurrencyList.push(predictedUserCurrency);
      }

      // build bottom currency list by excluding duplicated currencies 
      // that are already presented in top currency list
      this.bottomCurrencyList = currencyList.filter(c => !this.topCurrencyList.some(tc => tc.code == c.code))
    },
    clearSearchQuery() {
      this.searchQuery = '';
    },
    openModal() {
      this.selectedCurrencyInModal = store.state.userCurrency;
      this.$modal.show(this.$options.name)
    },
    closeModal() {
      this.$modal.hide(this.$options.name);
    },
    onApply() {
      store.state.userCurrency = this.selectedCurrencyInModal;
      this.closeModal();
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .button-currency {
    @apply inline-block text-sm px-4 py-2 leading-none border rounded-full text-blue-200 border-blue-500;
    min-width: 62px;
  }
  
  .button-currency:hover {
    @apply border-white text-white;
  }
</style>