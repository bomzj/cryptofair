<template>
  <div>
    <button @click="$refs.modal.show()" class="filter filter-active">
      {{ savedCurrency }}
    </button>
    <Modal ref="modal" 
           :id="$options.name" 
           title="Select currency" 
           @show="onModalOpen"
           @apply-changes="applyChanges">
      
      <template v-if="currencies">
        <SearchBox placeholder="Search currency by name or symbol" 
                   @change="onSearchQueryChange" />
        
        <SingleSelectList ref="selectList"
                          v-slot="{ item }"
                          :items="currencies"
                          item-id-prop="code"
                          :selected-item-id="selectedCurrencyInModal" 
                          @change="onSelectListUpdate">
          <span class="text-lg lg:text-2xl 2xl:text-3xl ml-2">{{ item.name }} <sup class="text-gray-500">{{ item.code }}</sup></span>
        </SingleSelectList>
      </template>
      <img v-else src="@/ui/spinner.svg" class="w-24 mx-auto"/>
    </Modal> 
  </div>
</template>

<script>
import '@/filter/filters.css'
import store from '@/store.js'
import Modal from '@/ui/Modal.vue'
import SearchBox from '@/ui/SearchBox.vue'
import SingleSelectList from '@/ui/SingleSelectList.vue'
import TagList from '@/ui/TagList.vue'
import CurrencyService from './currency-service'

export default {
  name: 'UserCurrencySelector',
  components: { Modal, SearchBox, SingleSelectList, TagList },
  data() {
    return {
      selectedCurrencyInModal: store.state.userCurrency,
      currencies: null,
      searchQuery: '',
    }
  },
  computed: {
    savedCurrency: () => store.state.userCurrency,
  },
  created() {
    this.buildCurrencyList()
  },
  methods: {
    async buildCurrencyList() {
      let currencies = CurrencyService.getCurrencies()

      // define top 10 world currencies
      let topCurrencyCodes = ['USD', 'EUR', 'JPY', 'GBP', 'AUD', 
                              'CAD', 'CHF', 'CNH', 'HKD', 'NZD']

      // insert user local currency at beggining of the list
      let detectedUserCurrency = await CurrencyService.detectUserCurrency()
      if (detectedUserCurrency) {
        topCurrencyCodes = topCurrencyCodes.filter(c => c != detectedUserCurrency.code)
        topCurrencyCodes = topCurrencyCodes.splice(0, 0, detectedUserCurrency.code)
      }

      let topCurrencies = topCurrencyCodes.map(c => CurrencyService.getCurrency(c))
      let bottomCurrencies = currencies.filter(c => !topCurrencyCodes.includes(c.code))
      
      this.currencies = [...topCurrencies, ...bottomCurrencies]
    },
    getSelectedCurrencyAsTag() {
      return this.selectedCurrencyInModal ? 
             [{ id: this.selectedCurrencyInModal, 
                name: this.currencies.find(c => c.code == this.selectedCurrencyInModal)?.name }] 
             : []
    },
    onModalOpen() {
      this.selectedCurrencyInModal = store.state.userCurrency;
    },
    onSearchQueryChange(searchQuery) {
      searchQuery = searchQuery?.toLowerCase()
      let items = this.currencies.filter(i => 
                                         i.name.toLowerCase().includes(searchQuery) ||
                                         i.code.toLowerCase().includes(searchQuery))
      this.$refs.selectList.setItems(items)
    },
    onSelectListUpdate(selectedItemId) {
      this.selectedCurrencyInModal = selectedItemId
    },
    applyChanges() {
      store.state.userCurrency = this.selectedCurrencyInModal;
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