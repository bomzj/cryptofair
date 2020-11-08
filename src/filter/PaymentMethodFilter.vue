<template>
  <div>
    <button @click="$refs.modal.show()" class="filter" :class="{'filter-active' : hasSelection}">
      {{ title }}
    </button>
    <Modal ref="modal" 
           :id="$options.name" 
           :title="`Select payment methods you want to ${state.tradeType.toLowerCase()} crypto with`" 
           @apply-changes="onApplyChanges">
      
      <template v-if="paymentMethods">
        <SearchBox placeholder="Search payment methods" 
                  @change="onSearchQueryChange" />
        
        <div class="flex">
          
        </div>

        <MultiSelectList v-slot="{ item }"
                        ref="selectList"
                        :items="paymentMethods"
                        :item-id-prop="null"
                        :selected-item-ids="state.paymentMethods" 
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
      selectedPaymentMethods: store.state.paymentMethods,
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
    onSearchQueryChange(searchQuery) {
      searchQuery = searchQuery?.toLowerCase()
      let items = this.paymentMethods.filter(i => i.toLowerCase().includes(searchQuery))
      this.$refs.selectList.setItems(items)
    },
    onApplyChanges() {
      store.state.paymentMethods = this.selectedPaymentMethods
    }
  }
}
</script>