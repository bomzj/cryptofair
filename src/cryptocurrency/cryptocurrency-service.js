import cryptocurrencies from './cryptocurrencies.json'
import getHttpClient from '@/http-client'
const http = getHttpClient(10)

export default class CryptocurrencyService {
  static getCryptocurrencies() {
    return cryptocurrencies
  }

  static getCryptocurrencyNameBy(code) {
    return cryptocurrencies.find(i => i.symbol == code)?.name
  }

  static async getCryptocurrencyPriceByName(cryptocurrencyName, currencyCode) {
    let requestUrl = 'https://api.coingecko.com/api/v3/simple/price?' +
                      `ids=${cryptocurrencyName}&` +
                      `vs_currencies=${currencyCode}`
    
    let response = await http(requestUrl)
    let price = response.data[cryptocurrencyName.toLowerCase()][currencyCode.toLowerCase()]
    
    return price
  }

  static async getCryptocurrencyPriceByCode(cryptocurrencyCode, currencyCode) {
    let name = this.getCryptocurrencyNameBy(cryptocurrencyCode)
    return this.getCryptocurrencyPriceByName(name, currencyCode)
  }
}