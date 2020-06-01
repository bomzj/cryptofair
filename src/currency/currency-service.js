import currencies from './currencies.json'

export default class CurrencyService {
  static #currencyList = null;

  static async getUserCurrencyByGeolocation() {
    let response = await fetch('http://ip-api.com/json/?fields=country,currency')
    let { currency } = await response.json()
    return this.getCurrencyList().find(i => i.code == currency)
  }

  static getCurrencyList() {
    if (this.#currencyList) return this.#currencyList

    return this.#currencyList = Object.entries(currencies)
      .sort((a, b) => a[1].localeCompare(b[1])) // sort alphabetically by currency name
      .map(i => ({ name: i[1], code: i[0] }))
  }
}