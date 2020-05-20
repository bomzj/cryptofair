<template>
  <div class="flex flex-wrap items-center mx-auto my-8">
    <!-- <div class="text-4xl font-semibold mr-3 mb-2">I want to</div>
    <ToggleButton 
      :value="true"
      :width="70" 
      :height="30"
      :font-size="16"
      :color="{checked: '#68d391', unchecked: ' #e53e3e'}"
      :labels="{checked: 'Buy', unchecked: 'Sell'}"/>
      
      <div class="mx-3">
        <Multiselect 
          v-model="cryptoSelect.value" 
          label="name" 
          track-by="code" 
          :options="cryptoSelect.options" 
          :allow-empty="false" 
          deselect-label="Can't remove this value"/>
      </div>

      <div class="text-4xl font-semibold mb-2">with</div>

      <div class="mx-3">
        <Multiselect 
          v-model="paymentSelect.value" 
          label="name" 
          track-by="name" 
          :options="paymentSelect.options" 
          :multiple="true"
          placeholder="Payment Method"
          />
      </div> -->

      
      <a href="#" class="border-2 border-solid border-gray-600 hover:border-gray-600 text-gray-600 font-normal py-1 px-4 rounded-full mr-3">
        Buy
      </a>
      
      <a href="#" class="border-2 border-solid border-gray-600 hover:border-gray-600 text-gray-600 font-normal py-1 px-4 rounded-full mr-3">
        Bitcoin
      </a>

      <a href="#" class="border border-solid hover:border-gray-600 text-gray-500 hover:text-gray-600 font-normal py-1 px-4 rounded-full mr-3">
        Payment Method
      </a>

      <a href="#" class="border border-solid hover:border-gray-600 text-gray-500 hover:text-gray-600 font-normal py-1 px-4 rounded-full">
        More...
      </a>

      <!-- <div class="text-4xl font-semibold mb-2 mr-3">for</div>
      <CurrencyInput 
        v-model="amount" 
        placeholder="Amount" 
        class="appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none"/> -->

  </div>
</template>

<script>
//import { ToggleButton }  from 'vue-js-toggle-button'
//import Multiselect from 'vue-multiselect'
//import { CurrencyInput } from 'vue-currency-input'

export default {
  name: 'App',
  components: {
    //ToggleButton, Multiselect, //CurrencyInput
  },
  data() {
    return {
      amount: null,
      cryptoSelect: {
        value: [
          { name: 'Bitcoin', code: 'BTC' }
        ],
        options: [
          { name: 'Bitcoin', code: 'BTC' },
          { name: 'Ethereum', code: 'ETH' },
          { name: 'Tether', code: 'USDT' }
        ]
      },
      paymentSelect: {
        value: [
          { name: 'Bank Transfer' }
        ],
        options: [
          { name: 'Bank Transfer' },
          { name: 'SEPA Transfer' },
          { name: 'Credit Card' },
          { name: 'Skrill' },
          { name: 'PayPal' },
          { name: 'TransferWise' },
        ]
      }
    }
  }
}
</script>

<style>

</style>
