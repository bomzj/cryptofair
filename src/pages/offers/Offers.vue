<template>
<div>
  <div v-for="(offer, index) in offers" :key="index" class="flex flex-wrap justify-around">
    <div class="flex flex-col flex-wrap px-6 py-4 whitespace-no-wrap">
      <a href="#" class="block text-lg leading-5 text-blue-500 text-3xl mr-4 mb-4">{{ offer.trader.name }}</a>
      <p class="info-hint">Rating <span class="info-value">4.5</span>, Trades <span class="info-value">156</span></p>
      <p class="info-hint">Exchange <span class="info-value">{{ offer.exchange.name }}</span></p>
    </div>
    <div class="px-6 py-4 whitespace-no-wrap">
      <p class="info-hint">Trading Amount <span class="inline-block info-value ml-1">{{ offer.price.currency | currencySign }}{{ offer.tradingAmount.min }} - {{ offer.price.currency | currencySign }}{{ offer.tradingAmount.max }}</span></p>
      <div class="flex flex-row items-center" >
        <div class="info-hint mr-2">Pay by</div><img v-for="method in offer.paymentMethods" :key="method" width="36" height="36" class="mr-1" :src="getPaymentLogoUrl(method)"/>
      </div>
    </div>
    <div class="px-6 py-4 whitespace-no-wrap leading-5 font-medium">
      <div class="flex flex-col justify-center items-center">
        <a href="#" class="block mr-4 mb-4  text-3xl">{{ offer.price.currency | currencySign }}{{ offer.price.value }}</a>  
        <p class="block info-hint m-2"><span class="text-green-500">4.2%</span> more than market</p>
        <a href="#" class="border-2 border-solid border-blue-500 hover:border-blue-600 text-blue-500 text-2xl hover:text-blue-600 font-normal py-4 px-8 m-2 rounded-full">
          Go to Offer
        </a>
      </div>
    </div>
    <hr class="w-full border-gray-400 my-10"/>
  </div>
</div>
</template>

<script>
import offers from './offers.json'

export default {
  name: 'Offers',
  components: {
    
  },
  data() {
    return { 
      offers 
    }
  },
  filters: {
    currencySign: function (value) {
      if (!value) return ''
      switch (value) {
        case "USD": return '$';
        case 'EUR': return '€';
      }
      return value;
    },
  },
  methods: {
    getPaymentLogoUrl(paymentMethodName) {
      let method = paymentMethodName.toLowerCase().replace(' ', '-');
      return require('./images/payments/' + method + '.svg');
    }
  }
}
</script>

<style>
.info-hint {
  @apply .text-base .text-gray-500  text-xl;
}
.info-value {
  @apply .text-base .text-gray-700  text-xl;
}
</style>
