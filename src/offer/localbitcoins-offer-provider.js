import Offer from './offer'

export default class LocalBitcoinsOfferProvider {
  // LocalBitcoins API doesn't enable CORS to use their API publicly for some stupid reason
  // so we need to use proxy which adds CORS headers to allow our site fetch data from LocalBitcoins
  static corsProxy = 'https://cors-anywhere.herokuapp.com/'
  static baseUrl = 'https://localbitcoins.com/'
  
  static async getOffers(tradeType, coin, paymentMethods) {
    if (coin != 'BTC') return []
    
    let url = this.corsProxy + this.baseUrl
    url += tradeType == 'Buy' ? 'buy-bitcoins-online' : 'sell-bitcoins-online'
    url += paymentMethods ? '' : ''
    url += '/.json'

    const response = await fetch(url)
    console.log(response)
    const data = await response.json()
    
    const offers = []
    for (const item of data.data.ad_list) {
      const offer = new Offer()
      offer.exchange.name = 'Local Bitcoins'
      offer.tradeType = 'Buy'  
      offer.coin = 'BTC'
      offer.price.value = item.data.temp_price
      offer.price.currency = item.data.currency
      offer.tradingAmount.min = item.data.min_amount
      offer.tradingAmount.max = item.data.max_amount_available
      offer.paymentMethods.push(item.data.online_provider)
      offer.trader.name = item.data.profile.username
      offer.trader.totalTrades = item.data.profile.trade_count
      offer.trader.rating = item.data.profile.feedback_score
      offer.trader.country = item.data.countrycode
      offer.trader.city = item.data.city
      offer.url = item.actions.public_view
      offers.push(offer)
    }

    return offers
  }

}