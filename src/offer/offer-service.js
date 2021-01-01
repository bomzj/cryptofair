import Offer from './offer'
import CurrencyService from '@/currency/currency-service'
import CryptocurrencyService from '@/cryptocurrency/cryptocurrency-service'
import PaymentMethodService from './payment-method-service'
import LocationService from '../location-service'
import LocalBitcoinsExchange from '@/exchange/localbitcoins-exchange'
import PaxfulExchange from '@/exchange/paxful-exchange'

export default class OfferService {
  static exchanges = [PaxfulExchange]//[LocalBitcoinsExchange, PaxfulExchange]
  
  static async loadOffers(query) {
    const requests = this.exchanges.map(e => e.loadOffers(query))
    
    let offers = await Promise.all(requests)
    offers = offers.flat()

    // Extend offers with additional information
    offers = await this.convertOffersToUserCurrency(offers, query)

    // Apply some filters that can not be done via Exchange APIs
    offers = this.applyAdditionalFiltering(offers, query)
    
    // if we buy then sort prices from the lowest to highest
    return this.sortOffers(offers, query);
  }

  static sortOffers(offers, query) {
    let sort = (isAsc, a, b) => {
      let direction = isAsc ? 1 : -1
      let diff = direction * (a.priceInUserCurrency - b.priceInUserCurrency)
      if (isFinite(diff)) return diff 
      else return isFinite(a.priceInUserCurrency) ? -1 : 1 // push offers in crypto currency at the bottom
    }
    
    return offers.sort(sort.bind(this, query.tradeType == 'Buy'));
  }

  static applyAdditionalFiltering(offers, query) {
    let { tradeAmount, hideNewTraders } = query
    
    return offers.filter(o => !((tradeAmount && 
                                (tradeAmount < o.tradingAmount.min ||
                                 tradeAmount > o.tradingAmount.max)) || 
                               (hideNewTraders && !o.trader.tradeCount) ))
  }

  static async convertOffersToUserCurrency(offers, query) {
    let { coin, userCurrency } = query
    
    let marketPrice = await CryptocurrencyService.getCryptocurrencyPriceByCode(coin, userCurrency)

    for (const offer of offers) {
      offer.priceInUserCurrency = await CurrencyService.convertCurrency(
        offer.price.value, 
        offer.price.currency, 
        userCurrency)

      offer.tradingAmount.min = await CurrencyService.convertCurrency(
        offer.tradingAmount.min, 
        offer.price.currency, 
        userCurrency)

      offer.tradingAmount.max = await CurrencyService.convertCurrency(
        offer.tradingAmount.max, 
        offer.price.currency, 
        userCurrency)
              
      offer.priceChangeToMarket = (offer.priceInUserCurrency - marketPrice) * 100 / marketPrice
    }
    return offers
  }

}