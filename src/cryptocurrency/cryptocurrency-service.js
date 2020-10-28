import cryptocurrencies from './cryptocurrencies.json'
import Cache from '@/cache'

export default class CryptocurrencyService {
  /** Is used to prevent multiple fetch requests if a resource is already being fetched */
  static pendingRequests = new Map()

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
    
    // TODO: Implement caching expiration
    // let price = Cache.get(requestUrl)
    // if (price) return price
                      
    // Avoid multiple fetch requests to the same API endpoint
    let pendingRequest = this.pendingRequests.get(requestUrl)
    if (pendingRequest) return pendingRequest
    
    pendingRequest = fetch(requestUrl).then(async (response) => { 
      let data = await response.json()
      let price = data[cryptocurrencyName.toLowerCase()][currencyCode.toLowerCase()]
      
      //Cache.set(requestUrl, price)

      // Remove this pending request once it's fulfilled
      this.pendingRequests.delete(requestUrl)

      return price
    })
    
    this.pendingRequests.set(requestUrl, pendingRequest)
    
    return pendingRequest
  }

  static async getCryptocurrencyPriceByCode(cryptocurrencyCode, currencyCode) {
    let name = this.getCryptocurrencyNameBy(cryptocurrencyCode)
    return this.getCryptocurrencyPriceByName(name, currencyCode)
  }
}