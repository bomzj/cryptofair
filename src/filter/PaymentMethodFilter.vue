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
        
        <TagList ref="tagList" 
                 :items="selectedPaymentMethods" 
                 @update:items="onTagListUpdate" />
        
        <MultiSelectList v-slot="{ item }"
                        ref="selectList"
                        :items="paymentMethods"
                        :selected-items="selectedPaymentMethods" 
                        @change="onSelectListUpdate">
          <SimpleListItem :item="item" />
        </MultiSelectList>
      </template>
      <img v-else src="@/ui/spinner.svg" class="w-24 mx-auto"/>
    </Modal>
  </div>
</template>

<script>
import store from '@/store'
import Modal from '@/ui/Modal.vue'
import SearchBox from '@/ui/SearchBox.vue'
import MultiSelectList from '@/ui/MultiSelectList.vue'
import SimpleListItem from '@/ui/SimpleListItem.vue'
import TagList from '@/ui/TagList.vue'
import PaymentMethodService from '@/offer/payment-method-service'

export default {
  name: 'PaymentMethodFilter',
  components: { Modal, SearchBox, MultiSelectList, SimpleListItem, TagList },
  data() {
    return {
      state: store.state,
      paymentMethods: null, // to be loaded dynamically
      selectedPaymentMethods: [],
    }
  },
  async created() {
    let paymentMethods = PaymentMethodService.getPaymentMethods()
    this.paymentMethods = paymentMethods.map(i => i.name)
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
    onTagListUpdate(selectedItemIds) {
      this.selectedPaymentMethods = selectedItemIds
      this.$refs.selectList.selectItems(this.selectedPaymentMethods)
    },
    onSelectListUpdate(selectedItemIds) {
      this.selectedPaymentMethods = selectedItemIds
      this.$refs.tagList.setItems(this.selectedPaymentMethods)
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