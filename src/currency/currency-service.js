import _currencies from './currencies.json'
import getHttpClient from '@/http-client'
const http = getHttpClient(12 * 60 * 60)

export default class CurrencyService {
  static async getUserCurrencyByGeolocation() {
    let response = await http('http://ip-api.com/json/?fields=country,currency')
    let { currency } = response.data
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

  static formatPrice(value, currency) {
    try {
      let formatter = new Intl.NumberFormat(undefined, { style: 'currency', currency });
      return formatter.format(value);
    } catch (error) {
      console.log('Error occured while currency code is ' + currency)
    }
  }
}