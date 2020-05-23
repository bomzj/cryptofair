<template>
  <div>
    <button @click="$modal.show($options.name)" class="payment-method-filter">
      More...
    </button>
    <v-modal :name="$options.name"  classes="modal" height="400px">
      <div class="flex flex-col h-full px-8 py-5">
        <header class="mb-10">
          <h2 class="text-lg text-center font-semibold">Other Filters</h2>
          <button class="float-right -mt-8 rounded-full hover:bg-gray-200" @click="closeModal">
            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 18 18"><path d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z"/></svg>
          </button>
        </header>
        <!-- <hr> -->
        <div class="flex-grow mb-0">
          <h1>To be done</h1>
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
  name: 'MoreFilter',
  data() {
    return {
      paymentMethods: [
        { name: 'Bank Transfer' },
        { name: 'SEPA Transfer' },
        { name: 'Credit Card' },
        { name: 'Skrill' },
        { name: 'PayPal' },
        { name: 'TransferWise' },
      ],
      selectedPaymentMethods: store.state.paymentMethods,
      searchQuery: '',
      state: store.state
    }
  },
  filters: {
    formatPaymentMethod: function (array) {
      if (!array || !array.length) return 'Payment Methods'
      if (array.length == 1) return array[0]
      if (array.length > 1) return 'Payment Methods - ' + array.length
    },
  },
  created() {
    //this.populatePaymentMethodList();
    //console.log('after populatePaymentMethodList()');
  },
  methods: {
    async populatePaymentMethodList() {
      const response = await fetch('https://api.coingecko.com/api/v3/coins/list');
      const list = await response.json();
      if (list) {
      //  this.PaymentMethods = list;
      }
      //console.log('populate finished')
    },
    getFilteredPaymentMethodList() {
      return this.paymentMethods.filter(c => c.name.toLowerCase().includes(this.searchQuery));
    },
    clearInput() {
      this.searchQuery = '';
    },
    onSave() {
      //store.state.paymentMethods = this.selectedPaymentMethods;
      this.closeModal();
    },
    closeModal() {
      //this.selectedPaymentMethods = store.state.paymentMethods;
      this.$modal.hide(this.$options.name);
    }
  }
}
</script>

<style>
@import '../offers-page.css';

.payment-method-filter {
  @apply button-filter;
  min-width: 62px;
}
</style>
