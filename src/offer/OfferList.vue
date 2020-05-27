<template>
<div>
  <p class="text-base text-gray-600 ml-6">{{ formatResultFound }}</p>
  <div v-for="(offer, index) in getOffers()" :key="index" class="flex flex-wrap">
    <div class="px-6 py-4 whitespace-no-wrap w-full sm:w-1/2 md:w-1/2 lg:w-1/4 xl:w-1/6">
      <a href="#" class="block text-xl leading-5 text-blue-500 mb-2">{{ offer.trader.name }}</a>
      <p class="info-hint">Rating <span class="info-value">{{ offer.trader.rating }}</span>, Trades <span class="info-value">{{ offer.trader.trades }}</span></p>
      <p class="info-hint">Exchange <span class="info-value">{{ offer.exchange.name }}</span></p>
    </div>
    <div class="px-6 py-4 w-full sm:w-1/2 md:w-1/2 lg:w-1/4 xl:w-2/6">
      <p class="info-hint mb-2">Trading Amount <span class="info-value inline-block">{{ formatTradingAmount(offer) }}</span></p>
      <div class="flex flex-row items-center" >
        <div class="info-hint whitespace-no-wrap mr-2">Pay by</div><img v-for="method in offer.paymentMethods" :key="method" width="36" height="36" class="mr-1" :src="getPaymentLogoUrl(method)"/>
      </div>
    </div>
    <div class="px-6 py-4 whitespace-no-wrap leading-5 w-full sm:w-1/2 md:w-1/2 lg:w-1/4  xl:w-2/6">
      <div class="flex flex-col">
        <p class="mb-2 text-2xl font-medium">{{ formatConvertedPrice(offer) }} <span class="info-hint font-normal">per coin</span></p> 
        <p class="info-hint">Original Price <span class="info-value">{{ formatOriginalPrice(offer) }}</span></p>
        <p class="info-hint font-medium"><span class="text-green-500">4.2%</span> more than market</p>
      </div>
    </div>
    <div class="px-6 py-4 leading-5 font-medium">
      <a href="#" class="button button-outline-primary">Go to Offer</a>
    </div>
    <hr class="w-full border-gray-400 my-5" v-show="offerCount - 1 != index"/>
  </div>
</div>
</template>

<script>
import offers from './offers.json'
import store from '@/store.js'
import CurrencyConverter from '@/currency/currency-converter.js'

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
    // price: function (offer) {
      
    // },

  },
  computed: {
    offerCount() {
      return this.getOffers().length;
    },
    formatResultFound() {
      let found = this.offerCount;
      return found ? `${found} results found`: 'No results found';
   } 
  },
  methods: {
    getOffers() {
      // Get all offers that match filters criteria
      let offers = this.offers.filter(
        o => o.tradeType !=  store.state.tradeType &&
        o.crypto == store.state.crypto &&
        (!store.state.paymentMethods.length || 
          (store.state.paymentMethods.length > 0 && 
          o.paymentMethods.some(p => store.state.paymentMethods.includes(p)))
        ));

      // Normalize prices to selected currency
      offers.forEach(o => {
        o.convertedPrice = CurrencyConverter.convertCurrency(o.price.value, o.price.currency, store.state.currency);
      });

      // if we buy then sort prices from the lowest to highest
      let ascSorting = (a, b) => a.convertedPrice - b.convertedPrice;
      let descSorting = (a, b) => b.convertedPrice - a.convertedPrice;
            
      return offers.sort(store.state.tradeType == 'Buy'? ascSorting : descSorting);
    },
    formatConvertedPrice(offer) {
      return CurrencyConverter.formatPrice(offer.convertedPrice, store.state.currency);
    },
    formatOriginalPrice(offer) {
      return CurrencyConverter.formatPrice(offer.price.value, offer.price.currency);
    },
    formatTradingAmount(offer) {
      let convertedMin = CurrencyConverter.convertCurrency(offer.tradingAmount.min, offer.price.currency, store.state.currency);
      let convertedMax = CurrencyConverter.convertCurrency(offer.tradingAmount.max, offer.price.currency, store.state.currency);
      return `${CurrencyConverter.formatPrice(convertedMin, store.state.currency)} - ${CurrencyConverter.formatPrice(convertedMax, store.state.currency)}`;
    },
    getPaymentLogoUrl(paymentMethodName) {
      let method = paymentMethodName.toLowerCase().replace(' ', '-');
      return require('./payment-methods/' + method + '.svg');
    }
  }
}
</script>

<style>
.info-hint {
  @apply .text-base .text-gray-500  text-sm;
}
.info-value {
  @apply .text-base .text-gray-700  text-sm;
}
</style>