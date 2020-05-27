<template>
  <div>
    <button @click="$modal.show($options.name)" class="filter" :class="{ 'filter-active': isActive }">
      {{ state.paymentMethods | formatPaymentMethod }}
    </button>
    <v-modal :name="$options.name"  classes="modal" height="400px">
      <div class="flex flex-col h-full px-8 py-5">
        <header class="mb-10">
          <h2 class="text-lg text-center font-semibold">Select Payment Methods</h2>
          <button class="float-right -mt-8 rounded-full hover:bg-gray-200" @click="closeModal">
            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 18 18"><path d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z"/></svg>
          </button>
        </header>
        <!-- <hr> -->
        <div class="flex-grow mb-0">
          <div class="flex items-center mb-8">
            <input class="form-input block w-full search-input outline-none" v-model="searchQuery" placeholder="Search Payment Methods">
            <button class="-ml-8" @click="clearInput">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 18 18"><path fill="#a0aec0" d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z"/></svg>
            </button>
          </div>
          <div class="flex flex-wrap overflow-auto">
            <label v-for="paymentMethod in getFilteredPaymentMethodList()" :key="paymentMethod.name" class="inline-flex items-center w-1/3 mb-6">
              <input type="checkbox" class="form-checkbox" v-model="selectedPaymentMethods" :value="paymentMethod.name">
              <span class="ml-2">{{ paymentMethod.name }}</span>
            </label> 
          </div>
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
  name: 'PaymentMethodFilter',
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
  computed: {
    isActive: () => !!store.state.paymentMethods.length
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
      store.state.paymentMethods = this.selectedPaymentMethods;
      this.closeModal();
    },
    closeModal() {
      this.selectedPaymentMethods = store.state.paymentMethods;
      this.$modal.hide(this.$options.name);
    }
  }
}
</script>