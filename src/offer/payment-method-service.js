import getHttpClient from '@/http-client'
const http = getHttpClient(24 * 60 * 60)

export default class PaymentMethodService {
  static paymentMethodProviders = [this.getLocalBitcoinsPaymentMethods]
  static paymentMethodMapping = new Map()

  static async getPaymentMethods() {
    const requests = this.paymentMethodProviders.map(fn => fn.bind(this)())
    
    let paymentMethods = await Promise.all(requests)
    paymentMethods = paymentMethods.flat()

    // Get all offers that match filters criteria
    // let offers = this.offers.filter(
    //   o => o.tradeType !=  store.state.tradeType &&
    //   o.crypto == store.state.crypto &&
    //   (!store.state.paymentMethods.length || 
    //     (store.state.paymentMethods.length > 0 && 
    //     o.paymentMethods.some(p => store.state.paymentMethods.includes(p)))
    //   ));

    // if we buy then sort prices from the lowest to highest
      // let ascSorting = (a, b) => a.priceInUserCurrency - b.priceInUserCurrency;
      // let descSorting = (a, b) => b.priceInUserCurrency - a.priceInUserCurrency;
            
      // return offers.sort(store.state.tradeType == 'Buy'? ascSorting : descSorting);

    return paymentMethods
  }
  
  static async translatePaymentMethodsToExchangeKnownIds(paymentMethods, exchangeName) {
    // Ensure that mapping is preloaded in order to be able to translate
    await this.getPaymentMethods()

    return paymentMethods.map(pm => this.paymentMethodMapping.get(pm)[exchangeName])
  }

  static async getLocalBitcoinsPaymentMethods() {
    // LocalBitcoins API doesn't enable CORS to use their API publicly for some stupid reason
    // so we need to use proxy which adds CORS headers to allow our site fetch data from LocalBitcoins
    const corsProxy = '/.netlify/functions/proxy-fetch/'
    const apiUrl = 'https://localbitcoins.com/api/payment_methods/'
    let url = corsProxy + apiUrl
    
    let response = await http(url)
        
    for (const [key, value] of Object.entries(response.data.data.methods)) {
      this.paymentMethodMapping.set(value.name, { localbitcoins: key })
    }

    return [...this.paymentMethodMapping.keys()]
  }

}