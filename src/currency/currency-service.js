import _currencies from './currencies.json'
import Cache from '@/cache'

export default class CurrencyService {
  /** Is used to prevent multiple fetch requests if a resource is already being fetched */
  static pendingRequests = new Map()
  static currencyList = null
  static currencyRates = null
  
  static CurrencyRatesCacheKey = 'CurrencyRates'

  static async getUserCurrencyByGeolocation() {
    let response = await fetch('http://ip-api.com/json/?fields=country,currency')
    let { currency } = await response.json()
    return this.getCurrencies().find(i => i.code == currency)
  }

  static getCurrencies() {
    let currencyNames = new Intl.DisplayNames(['en'], {type: 'currency'});
    let currencyCodes = Object.keys(_currencies)
    let currencies = currencyCodes.map(i =>({name: currencyNames.of(i), code: i}))
    
    // sort alphabetically by currency name
    return currencies.sort((a, b) => a.name.localeCompare(b.name)) 
  }

  static async getConvertibleCurrencies() {
    // Filter all available currencies by currency rates data to get convertibles ones
    let [currencies, currencyRates] = await Promise.all([this.getCurrencies(), this.getCurrencyRates()])
    return currencies.filter(c => currencyRates.hasOwnProperty(c.code))
  }

  static async getCurrencyRates(baseCurrency) {
    let requestName = this.CurrencyRatesCacheKey
    
    let currencyRates = Cache.get(requestName)
    if (currencyRates) return currencyRates

    // Avoid multiple fetch requests to API
    let pendingRequest = this.pendingRequests.get(requestName)
    if (!pendingRequest) {
      pendingRequest = fetch('/.netlify/functions/currency-rates?base=' + baseCurrency)
        .then(response => response.json())
      
      this.pendingRequests.set(requestName, pendingRequest)
      
      console.log('fetching currency rates...')
    }  
    
    currencyRates = await pendingRequest
    
    // Update cache once in case if multiple calls have been made to the method
    if (!Cache.has(requestName)) {
      Cache.set(requestName, currencyRates)
      console.log('currency rates loaded.')
    }
    
    // Remove this pending request once it's fulfilled
    this.pendingRequests.delete(requestName)

    return currencyRates
  }

  static async convertCurrency(amountFrom, currencyFrom, currencyTo) {
    let rates = Cache.get(this.CurrencyRatesCacheKey) || await this.getCurrencyRates('USD')
    let from = rates[currencyFrom]
    let to = rates[currencyTo]
    return amountFrom / from * to
  }

  static getCurrencySymbol(currency) {
    let formatter = new Intl.NumberFormat(undefined, { style: 'currency', currency });
    return formatter.formatToParts().find(i => i.type == 'currency').value;
  }

  static formatPrice(value, currency) {
    try {
      let formatter = new Intl.NumberFormat(undefined, { style: 'currency', currency });
      return formatter.format(value);
    } catch (error) {
      console.log('Error occured while currency code is ' + currency)
    }
  }
}