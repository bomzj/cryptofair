<template>
  <div>
    <button @click="$refs.modal.show()" class="filter" :class="{'filter-active' : hasSelection}">
      More...
    </button>
    <Modal ref="modal" 
           :id="$options.name" 
           title="Other filters"
           @apply-changes="applyChanges"
           @close="onModalClose">

      <h3 class="px-8 pt-5 text-gray-600 text-lg font-medium">Trade Limit</h3>
      <NumericInput :placeholder="'Enter the amount in ' + state.userCurrency +
                                  ' for which you want to ' + state.tradeType.toLowerCase() +
                                  ' the crypto'"
                    :input.sync="tradeAmount" />
      
      <h3 class="px-8 pt-5 text-gray-600 text-lg font-medium">Trader</h3>
      <div class="flex flex-wrap flex-grow content-start overflow-auto px-8 py-5">
        <label class="flex items-center w-full sm:w-1/3 mb-6">
          <input type="checkbox" 
                 class="form-checkbox" 
                 v-model="hideNewTraders">
          <SimpleListItem item="Hide new traders" />
        </label> 
      </div>

    </Modal>
  </div>
</template>

<script>
import store from '@/store'
import Modal from '@/ui/Modal'
import NumericInput from '@/ui/NumericInput.vue'
import CurrencyService from '@/currency/currency-service'
import SimpleListItem from '@/ui/SimpleListItem.vue'

export default {
  name: 'MoreFilter',
  components: { Modal, NumericInput, SimpleListItem },
  data() {
    return {
      state: store.state,
      tradeAmount: store.state.tradeAmount,
      hideNewTraders: store.state.hideNewTraders
    }
  },
  computed: {
    hasSelection: () => store.state.tradeAmount || store.state.hideNewTraders
  },
  methods: {
    onModalClose() {
      this.tradeAmount = store.state.tradeAmount
      this.hideNewTraders = store.state.hideNewTraders
    },
    applyChanges() {
      store.state.tradeAmount = this.tradeAmount
      store.state.hideNewTraders = this.hideNewTraders
    },
  }
}
</script>