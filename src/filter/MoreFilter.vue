<template>
  <div>
    <button @click="$refs.modal.show()" class="filter" :class="{'filter-active' : isFilterActive}">
      More...
    </button>
    <Modal ref="modal"
           :is-scrollable="true"
           :id="$options.name" 
           title="Other filters"
           @apply-changes="applyChanges"
           @close="onModalClose">
      <div class="flex flex-col flex-grow">
        <h3 class="px-8 pt-5 text-gray-600 text-lg font-medium">Trade Limit</h3>
        <NumericInput :placeholder="'Enter the amount in ' + state.userCurrency +
                                    ' for which you want to ' + state.tradeType.toLowerCase() +
                                ' the crypto'"
                      :input.sync="tradeAmount" />
      
        <h3 class="px-8 pt-5 text-gray-600 text-lg font-medium">Trader</h3>
        <div class="flex flex-wrap content-start px-8 py-5">
          <label class="flex items-center w-full sm:w-1/3 mb-6">
            <input type="checkbox" class="form-checkbox" v-model="hideNewTraders">
            <SimpleListItem item="Hide new traders" />
          </label> 
        </div>
      
        <h3 class="px-8 pt-5 text-gray-600 text-lg font-medium">Exchanges</h3>
        <MultiSelectList v-slot="{ item }"
                          ref="selectList"
                          :items="allExchanges"
                          :selected-items="selectedExchanges" 
                          @change="selectedExchanges = $event">
          <SimpleListItem :item="item" />
        </MultiSelectList>
      </div> 
    </Modal>
  </div>
</template>

<script>
import store from '@/store'
import Modal from '@/ui/Modal.vue'
import NumericInput from '@/ui/NumericInput.vue'
import CurrencyService from '@/currency/currency-service'
import SimpleListItem from '@/ui/SimpleListItem.vue'
import MultiSelectList from '@/ui/MultiSelectList.vue'
import OfferService from '@/offer/offer-service'

export default {
  name: 'MoreFilter',
  components: { Modal, NumericInput, SimpleListItem, MultiSelectList },
  data() {
    return {
      state: store.state,
      tradeAmount: store.state.tradeAmount,
      hideNewTraders: store.state.hideNewTraders,
      allExchanges: OfferService.exchanges.map(x => x.name),
      selectedExchanges: store.state.exchanges
    }
  },
  computed: {
    isFilterActive() {
      return store.state.tradeAmount || 
             store.state.hideNewTraders ||
             !!store.state.exchanges.length
    } 
  },
  methods: {
    onModalClose() {
      this.tradeAmount = store.state.tradeAmount
      this.hideNewTraders = store.state.hideNewTraders
      this.selectedExchanges = store.state.exchanges
    },
    applyChanges() {
      store.state.tradeAmount = this.tradeAmount
      store.state.hideNewTraders = this.hideNewTraders
      store.state.exchanges = this.selectedExchanges
    },
  }
}
</script>