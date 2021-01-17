import _currencies from './currencies.json'
import getHttpClient from '@/http-client'
import LocationService from '@/location-service'
const http = getHttpClient(12 * 60 * 60)

export default class CurrencyService {
  static currencies = undefined
  static corsProxy = '/.netlify/functions/proxy-fetch/'

  static async detectUserCurrency() {
    let currency = await LocationService.detectUserCurrency()
    return this.getCurrencies().find(i => i.code == currency.code)
  }

  static getCurrencies() {
    if (this.currencies) return this.currencies
    
    //let currencyNames = new Intl.DisplayNames(['en'], {type: 'currency'});
    let currencyCodes = Object.entries(_currencies)
    let currencies = currencyCodes.map(([k, v]) =>({name: v, code: k}))
    
    // sort alphabetically by currency name
    this.currencies = currencies.sort((a, b) => a.name.localeCompare(b.name)) 
    
    return this.currencies
  }

  static getCurrency(code) {
    return this.currencies.find(c => c.code == code)
  }

  static async getConvertibleCurrencies() {
    // Filter all available currencies by currency rates data to get convertibles ones
    let [currencies, currencyRates] = await Promise.all([this.getCurrencies(), this.getCurrencyRates('USD')])
    return currencies.filter(c => currencyRates.hasOwnProperty(c.code))
  }

  static async getCurrencyRates(baseCurrency) {
    let response = await http('/.netlify/functions/currency-rates?base=' + baseCurrency)
    return response.data
  }

  static async convertCurrency(amountFrom, currencyFrom, currencyTo) {
    let rates = await this.getCurrencyRates('USD')
    let from = rates[currencyFrom]
    let to = rates[currencyTo]
    return amountFrom / from * to
  }

  static getCurrencySymbol(currency) {
    let formatter = new Intl.NumberFormat(undefined, { style: 'currency', currency });
    return formatter.formatToParts().find(i => i.type == 'currency').value;
  }

  static formatPrice(value, currency, hideFractionDigits) {
    try {
      let formatter = new Intl.NumberFormat(undefined, 
        { style: 'currency', 
          currency,
          minimumFractionDigits: hideFractionDigits ? 0 : undefined,
          maximumFractionDigits: hideFractionDigits ? 0 : undefined,
          notation: value > 1000000 ? 'compact' : 'standard',
          maximumSignificantDigits: value > 1000000 ? 3 : undefined
        })
      
      return formatter.format(value);
    } catch (error) {
      console.log('Error occured while currency code is ' + currency)
    }
  }
}