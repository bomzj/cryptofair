<template>
  <div class="flex border border-gray-600 text-lg xl:text-2xl 2xl:text-3xl text-gray-700 font-semibold p-2">
    <span class="inline-block">{{cryptoName}} </span>
    <img v-show="isLoading" src="@/ui/spinner.svg" class="w-6 mx-8"/>
    <span v-show="!isLoading" class="inline-block ml-2 font-semibold ">{{cryptoPrice}}</span>
  </div>
</template>

<script>
import store from '@/store'
import CryptocurrencyService from '@/cryptocurrency/cryptocurrency-service'
import CurrencyService from '@/currency/currency-service'

export default {
  name: 'CryptoMarketPrice',
  data() {
    return {
      state: store.state,
      cryptoPrice: null,
      isLoading: true
    }
  },
  watch: {
		'state.coin': {
			handler() {
				this.updatePrice()
			}
    },
    'state.userCurrency': {
			handler() {
				this.updatePrice()
			}
    }
  },
  created() {
    this.updatePrice()
  },
  computed: {
    cryptoName() {
      return CryptocurrencyService.getCryptocurrencyNameBy(this.state.coin)
    },
   
  },
  methods: {
    async updatePrice() {
      this.isLoading = true
      let price = await CryptocurrencyService.getCryptocurrencyPriceByCode(this.state.coin, this.state.userCurrency)
      // TODO: Create global price vue filter or mixin
      this.cryptoPrice = CurrencyService.formatPrice(price, this.state.userCurrency)
      this.isLoading = false
    }
  }
}
</script>

<style>

</style>
