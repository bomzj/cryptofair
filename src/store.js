import Vue from 'vue'
import CurrencyService from '@/currency/currency-service'
import LocationService from '@/location-service'

// ES6 module is singleton by its nature 
// since it evaluates/runs code inside only one time on first import
// Create Vue instance just for managing State object changes
var store = new Vue({
  data() {
    return {
      // TODO: refactor names for user filters appropriately
      state: {
        // this is not a filter it's just a way to see offer price in user local currency for conveniece
        userCurrency: 'USD', 
        tradeType: 'Buy',
        coin: 'BTC',
        currency: undefined,
        paymentMethods: [],
        countryCode: '',
        tradeAmount: undefined,
        hideNewTraders: false,
        exchanges: []
      },
      isStateReady: false
    }
  },
  created() {
    this.loadState()
  },
  // Track all state changes and save to local storage
	watch: {
		state: {
			handler() {
				this.saveState()
			},
			deep: true
    }
  },
  methods: {
    saveState() {
			var json = JSON.stringify(this.state)
			localStorage.setItem("store", json)
		},
		async loadState() {
			var json = localStorage.getItem("store")
			if (json) {
				this.state = { ...this.state, ...JSON.parse(json) }
      }
      
      // Skip loading of country/currency filters if user already visited the site
      if (this.isStateSaved()) {
        this.isStateReady = true 
        return
      }
      
      // Load country/currency filters only on first visit
      try {
        this.isStateReady = false
        let responses = await Promise.all([LocationService.detectUserCountry(),]) 
                                          // CurrencyService.detectUserCurrency()])
        store.state.countryCode = responses[0].code
        //store.state.userCurrency = store.state.currency = responses[1].code
      } catch (error) {
        console.error(error)
      }
      finally {
        this.isStateReady = true
      }
    },
    isStateSaved() {
      return !!localStorage.getItem("store")
    }
  }
})

export default store