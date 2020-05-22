<template>
<div>
  <button @click="$modal.show($options.name)" class="select-currency-button">{{ selectedCurrency }}</button>
 
  <v-modal :name="$options.name" width="400px" classes="modal">
    <div>
      <div class="px-4 py-5">
        <h2 class="text-lg text-center font-semibold">Select Currency</h2>
        <button class="float-right -mt-8 rounded-full hover:bg-gray-200" @click="$modal.hide($options.name)">
          <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 18 18"><path d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z"/></svg>
        </button>
      </div>
      <hr />
      <div class="px-6 py-5 text-center">
         <label v-for="(currency, index) in currencies" :key="currency" class="inline-flex items-center" :class="{'ml-6': index > 0}">
          <input type="radio" class="form-radio" v-model="selectedCurrency" :value="currency">
          <span class="ml-2">{{ currency }}</span>
        </label>
      </div>
    </div>
  </v-modal> 
   <!-- <Modal title="Select Currency" name="test">  
    <label v-for="(currency, index) in currencies" :key="currency" class="inline-flex items-center" :class="{'ml-6': index > 0}">
      <input type="radio" class="form-radio" v-model="selectedCurrency" :value="currency">
      <span class="ml-2">{{ currency }}</span>
    </label>
  </Modal> -->
</div>
</template>

<script>
//import Modal from './Modal.vue'

export default {
  name: 'SelectCurrencyButton',
  components: {
  //  Modal
  },
  data() {
    return {
      currencies: ['USD', 'EUR', 'GBP', 'RUB'],
      selectedCurrency: 'USD'
    }
  },
  methods: {
    
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .select-currency-button {
    @apply inline-block text-sm px-4 py-2 leading-none border rounded-full text-blue-200 border-blue-500;
    min-width: 62px;
  }
  
  .select-currency-button:hover {
    @apply border-white text-white;
  }
  
  .form-radio {
    @apply form-radio w-6 h-6;
  }
</style>


