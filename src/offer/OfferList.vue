<template>
<div>
  <img v-show="isLoading" src="@/ui/spinner.svg" class="w-24 mx-auto"/>
  <div v-for="(offer, index) in offers" :key="index" class="flex flex-wrap md:justify-between">
    <div class="px-6 py-4 whitespace-no-wrap">
      <a :href="offer.trader.profileUrl" target="_blank" class="block text-xl lg:text-2xl 2xl:text-3xl leading-5 text-blue-500 mb-2">{{ offer.trader.name }}</a>
      <p class="hint">Total Trades <span class="data">{{ offer.trader.tradeCount }}</span></p>
      <p class="hint">Exchange <span class="data">{{ offer.exchange.name }}</span></p>
    </div>
    <div class="px-6 py-4 whitespace-no-wrap">
      <div class="flex flex-row items-center mb-1">
        <span class="hint mr-1">Pay by</span>
        <!-- <span v-for="method in offer.paymentMethods" :key="method" class="data p-1 rounded text-white bg-gray-600 font-medium mr-1">{{method}}</span> -->
        <span v-for="method in offer.paymentMethods" :key="method" class="data mr-1">{{method}}</span>
      </div>
      <p class="data"><span class="hint">Limit</span> {{ formatTradingAmount(offer) }}</p>
    </div>
    <div class="px-6 py-4 whitespace-no-wrap leading-5">
      <div class="flex flex-col font-medium">
        <p v-if="!isNaN(offer.priceInUserCurrency)" class="text-2xl lg:text-3xl 2xl:text-4xl">{{  offer.priceInUserCurrency | currency(state.userCurrency, offer.priceInUserCurrency > 100) }} <span class="hint font-normal">per coin</span></p> 
        <p v-if="!isNaN(offer.priceInUserCurrency)" class="hint font-medium my-1 lg:my-2 2xl:my-3">
          <span v-if="state.tradeType == 'Buy'" :class="[offer.priceChangeToMarket >= 0 ? 'text-red-500' : 'text-green-500']">{{ Math.abs(offer.priceChangeToMarket).toFixed(1) }}% </span> 
          <span v-else :class="[offer.priceChangeToMarket >= 0 ? 'text-green-500' : 'text-red-500']">{{ Math.abs(offer.priceChangeToMarket).toFixed(1) }}% </span> 
          <span v-if="offer.priceChangeToMarket >= 0">above market</span>
          <span v-else>below market</span>
        </p>
        <p v-if="state.userCurrency != offer.price.currency" class="hint font-normal">Original Price <span class="data">{{ offer.price.value | currency(offer.price.currency, offer.price.value > 100) }}</span></p>
      </div>
    </div>
    <div class="px-6 py-4 leading-5 font-medium">
      <a :href="offer.url" target="_blank" class="button button-outline-primary">Go to Offer</a>
    </div>
    <hr class="w-full border-gray-400 my-5" v-show="offerCount - 1 != index"/>  
  </div>
  <p v-show="!isLoading && !offers.length" class="text-xl lg:text-2xl 2xl:text-3xl text-center text-gray-600 my-8">No offers found. Try to change filters.</p>
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
      state: store.state,
      isLoading: true
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
  created() {
    this.previousGetOffersPromise
    this.updateOffers()
  },
  computed: {
    offerCount() {
      return this.offers.length
    }
  },
  methods: {
    async updateOffers() {
      this.offers = []
      this.isLoading = true

      let getOffersPromise = this.previousGetOffersPromise = 
        OfferService.getOffers(store.state.tradeType, 
                               store.state.coin, 
                               store.state.paymentMethods,
                               store.state.countryCode,
                               store.state.userCurrency,
                               store.state.tradeAmount,
                               store.state.hideNewTraders)
      
      let result = await this.previousGetOffersPromise
      
      // Skip this request result if new request was initiated
      if (getOffersPromise == this.previousGetOffersPromise) {
        this.offers = result
        this.isLoading = false
      }
    },
    formatTradingAmount(offer) {
      let currency = this.$options.filters.currency
      let from = currency(offer.tradingAmount.min, store.state.userCurrency, true)
      let to = currency(offer.tradingAmount.min, store.state.userCurrency, true)

      if (from.includes('NaN')) return 'no data'
      else if (from == 0) return 'up to ' + to
      else if (from == to) return from
      else return `from ${from} to ${to}`
    },
    getPaymentLogoUrl(paymentMethodName) {
      let method = paymentMethodName.toLowerCase().replace(' ', '-')
      return method
    },
  }
}
</script>

<style>
  .hint {
    @apply text-base text-gray-500  font-normal	;
  }
    
  .data {
    @apply text-lg text-gray-600  font-normal;
  }

  @screen lg {
    .hint {
      @apply text-base;
    }

    .data {
      @apply text-lg;
    }
  }

  @screen 2xl {
    .hint {
      @apply text-lg;
    }

    .data {
      @apply text-xl;
    }
  }
</style>
