<template>
<div>
  <p class="text-base text-gray-600 ml-6">{{ formatResultFound }}</p>
  <div v-for="(offer, index) in offers" :key="index" class="flex flex-wrap">
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
        <p class="mb-2 text-2xl font-medium">{{ formatPriceInUserCurrency(offer) }} <span class="info-hint font-normal">per coin</span></p> 
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
import OfferService from './offer-service'
import store from '@/store'
import CurrencyService from '@/currency/currency-service'

export default {
  name: 'OfferList',
  data() {
    return { 
      offers: [],
      state: store.state
    }
  },
	watch: {
		state: {
			async handler() {//(newValue, oldValue) {
        this.updateOffers()
			},
			deep: true
    }
  },
  filters: {
    // price: function (offer) {
      
    // },

  },
  created() {
    this.updateOffers()
  },
  computed: {
    offerCount() {
      return this.offers.length
    },
    formatResultFound() {
      let found = this.offerCount
      return found ? `${found} results found` : 'No results found'
   } 
  },
  methods: {
    async updateOffers() {
      this.offers = await OfferService.getOffers(
        store.state.tradeType, 
        store.state.coin, 
        store.state.paymentMethods,
        store.state.userCurrency)
    },
    formatPriceInUserCurrency(offer) {
      return CurrencyService.formatPrice(offer.priceInUserCurrency, store.state.userCurrency)
    },
    formatOriginalPrice(offer) {
      return CurrencyService.formatPrice(offer.price.value, offer.price.currency)
    },
    formatTradingAmount(offer) {
      return `${CurrencyService.formatPrice(offer.tradingAmount.min, store.state.userCurrency)} - ${CurrencyService.formatPrice(offer.tradingAmount.max, store.state.userCurrency)}`
    },
    getPaymentLogoUrl(paymentMethodName) {
      let method = paymentMethodName.toLowerCase().replace(' ', '-')
      return method
      //return require('./payment-methods/' + method + '.svg');
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
