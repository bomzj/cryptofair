<template>
  <div>
    <button @click="showModal()" class="filter" :class="{'filter-active' : hasSelection}">
      {{ title }}
    </button>
    <Modal ref="modal" 
           :id="$options.name" 
           :title="`Select payment methods you want to ${state.tradeType.toLowerCase()} crypto with`" 
           @apply-changes="onApplyChanges">
      
      <template v-if="paymentMethods">
        <SearchBox placeholder="Search payment methods" 
                  @change="onSearchQueryChange" />
        
        <div v-show="selectedPaymentMethods.length" class="flex px-8 py-5">
          <div v-for="item in selectedPaymentMethods" 
               :key="item" 
               class="flex 
                      items-center border 
                      bg-gray-300 
                      text-lg 
                      text-gray-500 
                      pl-2 
                      pr-1 
                      py-2 
                      mr-3">
            <span class="block mr-1">{{item}}</span>
            <button class="rounded-full hover:bg-gray-400 p-1" @click="deselectItem(item)">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 18 18"><path fill="#a0aec0" d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z"/></svg>
            </button>
          </div>
          <button v-show="selectedPaymentMethods.length > 1" 
                  class="button" 
                  @click="clearAllSelection()">
            Clear all
          </button>
        </div>

        <MultiSelectList v-slot="{ item }"
                        ref="selectList"
                        :items="paymentMethods"
                        :item-id-prop="null"
                        :selected-item-ids="selectedPaymentMethods" 
                        @change="selectedPaymentMethods = $event">
          <SimpleListItem :item="item" />
        </MultiSelectList>
      </template>
      <img v-else src="@/ui/spinner.svg" class="w-24 mx-auto"/>
    </Modal>
  </div>
</template>

<script>
import store from '@/store'
import Modal from '@/ui/Modal'
import SearchBox from '@/ui/SearchBox'
import MultiSelectList from '@/ui/MultiSelectList'
import SimpleListItem from '@/ui/SimpleListItem'
import PaymentMethodService from '@/offer/payment-method-service'

export default {
  name: 'PaymentMethodFilter',
  components: { Modal, SearchBox, MultiSelectList, SimpleListItem },
  data() {
    return {
      state: store.state,
      paymentMethods: null, // to be loaded dynamically
      selectedPaymentMethods: [],
    }
  },
  async created() {
    this.paymentMethods = await PaymentMethodService.getPaymentMethods()
  },
  computed: {
    hasSelection: () => !!store.state.paymentMethods.length,
    title() {
      let array = store.state.paymentMethods
      if (!array || !array.length) return 'Payment Methods'
      if (array.length == 1) return array[0]
      if (array.length > 1) return 'Payment Methods - ' + array.length
    } 
  },
  methods: {
    showModal() {
      // SelectedPaymentMethods may have selection that differs from state.paymentMethods on modal close
      // so it must be reloaded each time we show modal
      this.selectedPaymentMethods = [...store.state.paymentMethods]
      this.$refs.modal.show()
    },
    onSearchQueryChange(searchQuery) {
      searchQuery = searchQuery?.toLowerCase()
      let items = this.paymentMethods.filter(i => i.toLowerCase().includes(searchQuery))
      this.$refs.selectList.setItems(items)
    },
    onApplyChanges() {
      store.state.paymentMethods = this.selectedPaymentMethods
    },
    deselectItem(item) {
      let itemIndexToRemove = this.selectedPaymentMethods.indexOf(item)
      this.selectedPaymentMethods.splice(itemIndexToRemove, 1)
      this.$refs.selectList.selectItems(this.selectedPaymentMethods)
    },
    clearAllSelection() {
      this.selectedPaymentMethods = []
      this.$refs.selectList.selectItems(this.selectedPaymentMethods)
    }
  }
}
</script>