<template>
<section>
  <div v-show="isLoading">
    <p class="text-xl lg:text-2xl 2xl:text-3xl text-center text-gray-600 mb-1">{{ loadingTitle }}</p>
    <p class="text-base lg:text-lg 2xl:text-xl text-center text-gray-500 mb-4">Some payment methods can cause delay up to one minute!</p>
    <img src="@/ui/spinner.svg" class="w-24 mx-auto"/>
  </div>
  <p v-if="isError" class="text-xl lg:text-2xl 2xl:text-3xl text-center text-gray-600 my-8">An error ocurred. Try to reload the page.</p>
  <div v-else-if="!isLoading && !offers.length" class="my-8">
    <p class="text-xl lg:text-2xl 2xl:text-3xl text-center text-gray-600">No offers found. Try to change filters.</p>
    <p class="text-base lg:text-lg 2xl:text-xl text-center text-gray-500">Some payment methods require Country to be specified.</p>
  </div>
  <article v-for="(offer, index) in offers" :key="index" class="flex flex-wrap">
    <div class="w-full sm:w-1/2 lg:w-1/4 px-6 py-4 whitespace-no-wrap">
      <a :href="offer.trader.profileUrl" target="_blank" class="block text-xl lg:text-2xl 2xl:text-3xl leading-5 text-blue-500 mb-2">{{ offer.trader.name }}</a>
      <!-- <p class="hint">Total Trades <span class="data">{{ offer.trader.tradeCount }}</span></p> -->
      <p class="hint">Exchange <span class="data">{{ offer.exchange.name }}</span></p>
      <p class="hint">Seen <span class="data">{{ offer.trader.lastSeen | relativeTime }}</span></p>
    </div>
    <div class="w-full sm:w-1/2 lg:w-1/4 px-6 py-4">
      <div class="flex flex-col">
        <span v-for="method in offer.paymentMethods" :key="method" class="data text-gray-600 font-medium">{{method}}</span>
      </div>
      <p class="hint whitespace-normal" v-if="offer.paymentInfo">{{ offer.paymentInfo }}</p>
      <p class="data mt-1" v-if="!isNaN(offer.tradingAmount.min)"><span class="hint">Limit</span> {{ formatTradingAmount(offer) }}</p>
    </div>
    <div class="w-full sm:w-1/2 lg:w-1/4 px-6 py-4 whitespace-no-wrap leading-5">
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
    <div class="w-full sm:w-1/2 lg:w-1/4 px-6 py-4 leading-5 font-medium">
      <a :href="offer.url" target="_blank" class="button button-outline-primary">Go to Offer</a>
    </div>
    <hr class="w-full border-gray-400 my-5" v-show="offerCount - 1 != index"/>  
  </article>
  <div v-show="!isLoading && offers.length" class="mt-6">
    <p class="hint whitespace-normal">*Offers list displays the best 50 offers on the p2p market</p>
    <p class="hint whitespace-normal">**Offers price is just for reference and doesn't include exchanges' fees</p>
  </div>
</section>
</template>

<script>
import OfferService from './offer-service'
import store from '@/store'
import CurrencyService from '@/currency/currency-service'
import DateFormatter from '@/date-formatter' 

export default {
  name: 'OfferList',
  data() {
    return { 
      offers: [],
      state: store.state,
      isLoading: true,
      isError: false
    }
  },
	watch: {
		state: {
			async handler() {//(newValue, oldValue) {
        if (store.isStateReady) this.updateOffers()
			},
			deep: true
    }
  },
  filters: {
    relativeTime(date) {
      if (new Date(date) == 'Invalid Date') return date
      return DateFormatter.relativeTimeFormat(date)
    }
  },
  created() {
    if (store.isStateReady) this.updateOffers()
  },
  computed: {
    offerCount() {
      return this.offers.length
    },
    loadingTitle() {
      let loadingExchanges = store.state.exchanges.length ? 
                             store.state.exchanges :
                             OfferService.exchanges.map(x => x.name)
      
      return `Loading offers from ${loadingExchanges.join(', ')}`
    }
  },
  methods: {
    async updateOffers() {
      this.offers = []
      this.isLoading = true
      this.isError = false

      let query = { tradeType:      store.state.tradeType, 
                    coin:           store.state.coin, 
                    paymentMethods: store.state.paymentMethods,
                    countryCode:    store.state.countryCode,
                    userCurrency:   store.state.userCurrency,
                    tradeAmount:    store.state.tradeAmount,
                    hideNewTraders: store.state.hideNewTraders,
                    exchanges:      store.state.exchanges,
                    currency:       store.state.currency }
      try {
        var request = this.lastRequest = OfferService.loadOffers(query)
        var result = await request
        
        // Skip this request result if new request was initiated
        if (request == this.lastRequest) {
          this.offers = result.slice(0, 50)
          this.isLoading = false
        }
      }
      catch (error) {
        this.isError = true
        this.isLoading = false
        console.error(error)
      }
    },
    formatTradingAmount(offer) {
      let from = CurrencyService.formatPrice(Math.round(offer.tradingAmount.min), 
                                             store.state.userCurrency, true)
      let to = CurrencyService.formatPrice(Math.round(offer.tradingAmount.max), 
                                           store.state.userCurrency, true)

      if (from.includes('NaN')) return undefined
      else if (from == to) return from
      else return `${from} - ${to}`
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
    @apply text-base text-gray-500  font-normal	whitespace-no-wrap;
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
