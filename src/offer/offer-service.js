import CurrencyService from '@/currency/currency-service'
import CryptocurrencyService from '@/cryptocurrency/cryptocurrency-service'
import LocalBitcoinsExchange from '@/exchange/localbitcoins-exchange'
import PaxfulExchange from '@/exchange/paxful-exchange'
import LocalCryptosExchange from '@/exchange/localcryptos-exchange'
import HodlHodlExchange from '@/exchange/hodlhodl-exchange'
import LocalCoinSwapExchange from '@/exchange/localcoinswap-exchange'
import BinanceExchange from '@/exchange/binance-exchange'

export default class OfferService {
  static exchanges = [LocalBitcoinsExchange, PaxfulExchange, LocalCryptosExchange, 
                      HodlHodlExchange, LocalCoinSwapExchange, /*BinanceExchange*/]
  
  static async loadOffers(query) {
    var exchanges = query.exchanges.length ? 
      this.exchanges.filter(e => query.exchanges.some(name => e.name.includes(name))) :
      this.exchanges
    
    const requests = exchanges.map(e => e.loadOffers(query))
    
    let offers = (await Promise.allSettled(requests))
                               .filter(x => {
                                  // log all errors
                                  if (x.reason) console.error(x.reason) 
                                  return x.value
                                })
                               .map(x => x.value)
                               .flat()

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
    let { tradeAmount, hideNewTraders, currency } = query
    
    return offers.filter(o => !((tradeAmount && 
                                (tradeAmount < o.tradingAmount.min ||
                                 tradeAmount > o.tradingAmount.max)) || 
                               (hideNewTraders && o.trader.isNew) ||
                               (currency && o.price.currency != currency) ))
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