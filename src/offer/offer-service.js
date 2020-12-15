import Offer from './offer'
import store from '@/store'
import CurrencyService from '@/currency/currency-service'
import CryptocurrencyService from '@/cryptocurrency/cryptocurrency-service'
import PaymentMethodService from './payment-method-service'
import LocationService from '../location-service'
import getHttpClient from '@/http-client'
const http = getHttpClient(5 * 60)

export default class OfferService {
  static offerProviders = [this.getLocalBitcoinsOffers]
  
  static async getOffers(tradeType, 
                         coin, 
                         paymentMethods, 
                         countryCode, 
                         userCurrency, 
                         tradeAmount, 
                         hideNewTraders) {
    const requests = this.offerProviders.map(i => 
      i(tradeType, coin, paymentMethods, countryCode, tradeAmount, hideNewTraders))
    
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

    // Apply some filters that can not be done via API
    let tempOffers = [...offers]
    offers = []
    for (let offer of tempOffers) {
      if (tradeAmount && 
          (tradeAmount < offer.tradingAmount.min ||
          tradeAmount > offer.tradingAmount.max)) continue

      if (hideNewTraders && !offer.trader.tradeCount) continue

      offers.push(offer)
    }

    // Get all offers that match filters criteria
    
    // if we buy then sort prices from the lowest to highest
    let sort = (isAsc, a, b) => {
      let direction = isAsc ? 1 : -1
      let diff = direction * (a.priceInUserCurrency - b.priceInUserCurrency)
      if (isFinite(diff)) return diff 
      else return isFinite(a.price.value) ? -1 : 1 // push offers in crypto currency at the bottom
    }
            
    return offers.sort(sort.bind(this, store.state.tradeType == 'Buy'));
  }
  
  static async getLocalBitcoinsOffers(tradeType, 
                                      coin, 
                                      paymentMethods, 
                                      countryCode, 
                                      tradeAmount, 
                                      hideNewTraders) {
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

    // Append country filter if needed
    if (countryCode) {
      let countryName = await LocationService.getCountryName(countryCode)
      requestUrls.forEach((url, i) => 
                          requestUrls[i] += `/${countryCode}/${countryName}`)
    }

    // Append payment method if needed
    localBitcoinsPaymentMethods.forEach((method, i) => requestUrls[i] += `/${method}`)
    
    requestUrls.forEach((value, i) => requestUrls[i] += `/.json`)
    
    let pendingResponses = requestUrls.map(url => http(url))
    const responses = await Promise.all(pendingResponses)
    let dataList = responses.map(r => r.data)

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