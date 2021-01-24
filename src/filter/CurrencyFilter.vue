<template>
  <div>
    <button @click="$refs.modal.show()" class="filter" :class="{'filter-active' : active}">
      {{ shortTitle }}
    </button>
    <Modal ref="modal" 
           :id="$options.name" 
           title="Select a currency to filter offers by" 
           @show="onModalOpen"
           @apply-changes="applyChanges">
      <!-- <p class="text-base lg:text-lg 2xl:text-xl text-center text-gray-500 -mt-6 mb-6">All offers prices will be converted to this currency</p> -->
      <template v-if="currencies">
        <SearchBox placeholder="Search currency by name or symbol" 
                   @change="onSearchQueryChange" />
        
        <TagList ref="tagList" 
                 :items="selectedCurrencyInModal ? [selectedCurrencyInModal] : []" 
                 @update:items="onTagListUpdate" />

        <SingleSelectList ref="selectList"
                          v-slot="{ item }"
                          :items="currencies"
                          item-id-prop="code"
                          :selected-item-id="selectedCurrencyInModal" 
                          @change="onSelectListUpdate">
          <span class="text-xl ml-2">{{ item.name }} <sup class="text-gray-500">{{ item.code }}</sup></span>
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
import CurrencyService from '@/currency/currency-service'

export default {
  name: 'CurrencyFilter',
  components: { Modal, SearchBox, SingleSelectList, TagList },
  data() {
    return {
      selectedCurrencyInModal: store.state.currency,
      currencies: null,
      searchQuery: '',
    }
  },
  computed: {
    shortTitle() {
      return store.isStateReady && store.state.currency ? 
             store.state.currency : 'Currency'
    },
    active() { return !!store.state.currency }
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
        topCurrencyCodes.splice(0, 0, detectedUserCurrency.code)
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
      this.selectedCurrencyInModal = store.state.currency;
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
      this.$refs.tagList.setItems([this.selectedCurrencyInModal])
    },
    onTagListUpdate(selectedItemIds) {
      this.selectedCurrencyInModal = selectedItemIds[0]
      this.$refs.selectList.selectItem(this.selectedCurrencyInModal)
    },
    applyChanges() {
      store.state.currency = this.selectedCurrencyInModal;
    }
  }
}
</script>