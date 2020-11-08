import Offer from './offer'
import store from '@/store'
import CurrencyService from '@/currency/currency-service'
import CryptocurrencyService from '@/cryptocurrency/cryptocurrency-service'
import PaymentMethodService from './payment-method-service'

export default class OfferService {
  static offerProviders = [this.getLocalBitcoinsOffers]
  
  static async getOffers(tradeType, coin, paymentMethods, userCurrency) {
    const requests = this.offerProviders.map(i => 
                                             i(tradeType, coin, paymentMethods))
    
    let offers = await Promise.all(requests)
    offers = offers.flat()
    
    let marketPrice = await CryptocurrencyService.getCryptocurrencyPriceByCode(coin, userCurrency)

    // Extend offers with additional information
    for (const offer of offers) {
      offer.priceInUserCurrency = await CurrencyService.convertCurrency(
        offer.price.value, 
        offer.price.currency, 
        store.state.userCurrency)

      offer.tradingAmount.min = await CurrencyService.convertCurrency(
        offer.tradingAmount.min, 
        offer.price.currency, 
        store.state.userCurrency)

      offer.tradingAmount.max = await CurrencyService.convertCurrency(
        offer.tradingAmount.max, 
        offer.price.currency, 
        store.state.userCurrency)

      offer.priceChangeToMarket = (offer.priceInUserCurrency - marketPrice) * 100 / marketPrice
    }

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

    return offers
  }
  
  static async getLocalBitcoinsOffers(tradeType, coin, paymentMethods) {
    if (coin != 'BTC') return []
        
    // LocalBitcoins API doesn't enable CORS to use their API publicly for some stupid reason
    // so we need to use proxy which adds CORS headers to allow our site fetch data from LocalBitcoins
    const corsProxy = '/.netlify/functions/proxy-fetch/'
    let baseUrl = corsProxy + 'https://localbitcoins.com/'
    baseUrl += tradeType == 'Buy' ? 'buy-bitcoins-online' : 'sell-bitcoins-online'

    let localBitcoinsPaymentMethods = paymentMethods ? await PaymentMethodService
      .translatePaymentMethodsToExchangeKnownIds(paymentMethods, 'localbitcoins') :
      []

    // LocalBitcoins API supports only single payment method per request,
    // that's why we have to send multiple requests based on count of payment methods
    let requestUrls = Array(localBitcoinsPaymentMethods.length || 1).fill(baseUrl)
    localBitcoinsPaymentMethods.forEach((method, i) => requestUrls[i] += `/${method}`)
    
    requestUrls.forEach((value, i) => requestUrls[i] += `/.json`)
    
    let pendingResponses = requestUrls.map(url => fetch(url))

    const responses = await Promise.all(pendingResponses)
    let dataList = await Promise.all(responses.map(r => r.json()))

    const offers = []
    for (const data of dataList) {
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
        offer.trader.tradeCount = parseInt(item.data.profile.trade_count)
        offer.trader.rating = item.data.profile.feedback_score
        offer.trader.country = item.data.countrycode
        offer.trader.city = item.data.city
        offer.url = item.actions.public_view
        offers.push(offer)
      }
    }

    return offers
  }
}