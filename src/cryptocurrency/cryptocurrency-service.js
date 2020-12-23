import cryptocurrencies from './cryptocurrencies.json'
import CurrencyService from '@/currency/currency-service'
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
                      `vs_currencies=USD`
    
    let response = await http(requestUrl)
    
    let priceInUSD = response.data[cryptocurrencyName.toLowerCase()]['USD'.toLowerCase()]
    
    let price = await CurrencyService.convertCurrency(priceInUSD, 'USD', currencyCode)

    return price
  }

  static async getCryptocurrencyPriceByCode(cryptocurrencyCode, currencyCode) {
    let name = this.getCryptocurrencyNameBy(cryptocurrencyCode)
    return this.getCryptocurrencyPriceByName(name, currencyCode)
  }
}