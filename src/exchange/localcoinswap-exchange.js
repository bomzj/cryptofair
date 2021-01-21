import Offer from '@/offer/offer'
import getHttpClient from '@/http-client'
import PaymentMethodService from '@/offer/payment-method-service'

export default class LocalCoinSwapExchange {
  static http = getHttpClient(5 * 60)
  static corsProxy = '/.netlify/functions/proxy-fetch/'
  static baseApiUrl = this.corsProxy + 'https://localcoinswap.com/'
  
  static async loadOffers(query) {
    let { tradeType, coin, paymentMethods, countryCode, 
          tradingAmount, hideNewTraders } = query

    const availableCryptos = ['BTC', 'ETH', 'DOT', 'KSM', 'USDT', 'USDC', 
                              'DAI', 'DASH', 'LCS', 'NEXO', 'PAX']

    if (!availableCryptos.includes(coin)) return []
    
    if (paymentMethods?.length) {
      var exchangePaymentMethods = PaymentMethodService
        .mapPaymentMethodsToExchangeOnes(paymentMethods, 'localCoinSwap')
      if (!exchangePaymentMethods?.length) return []
    }

    let offerType = tradeType == 'Buy' ? 'sell' : 'buy'
   
    let requestUrl = this.baseApiUrl + 'api/v2/offers/search/?' + 
      `trading_type=${offerType}&` + 
      `coin_currency=${coin}&` +
      `hide_new=${hideNewTraders ? 1 : 0}&` +
      'limit=50&' +
      'ordering=country_first,current_price_usd&' +
      (countryCode ? `country_code=${countryCode}&` : '')

    let requestUrls = Array(exchangePaymentMethods?.length || 1)
      .fill(requestUrl)

    // Append payment method to each request if needed
    exchangePaymentMethods?.forEach((method, i) => 
      requestUrls[i] += `payment_method=${method}`)
    
    let pendingResponses = requestUrls.map(url => this.http(url))
    const responses = await Promise.all(pendingResponses)
    let data = responses.map(r => r.data.results).flat()
    
    // filter out offers with wrong countries since API doesn't trully filter by country
    if (countryCode) data = data.filter(x => x.country_code == countryCode)

    const offers = []
    for (const item of data) {
        const offer = new Offer()
        offer.exchange.name = 'LocalCoinSwap'
        offer.tradeType = query.tradeType == 'Buy' ? 'Sell' : 'Buy'
        offer.coin = coin
        offer.price.value = +item.price_formula_value
        offer.price.currency = item.fiat_currency.symbol
        offer.tradingAmount.min = item.min_trade_size
        offer.tradingAmount.max = item.max_trade_size
        
        let mappedPaymentMethod = PaymentMethodService
          .mapExchangePaymentMethodToBaseOne(item.payment_method.slug, 'localCoinSwap')
        
        offer.paymentMethods.push(mappedPaymentMethod)
        offer.trader.name = item.created_by.username
        offer.trader.tradeCount = item.created_by.completed_trades
        offer.trader.rating = item.created_by.ratings
        offer.trader.country = item.country_code
        offer.trader.city = undefined
        offer.url = `https://localcoinswap.com/trade/${item.slug}/${item.uuid}/`
        offer.trader.profileUrl = `https://localcoinswap.com/profile/${item.created_by.username}/`
        offer.trader.isNew = !item.created_by.completed_trades
        offer.paymentInfo = item.headline 
        offer.trader.lastSeen = item.created_by.last_seen * 1000
        offers.push(offer)
    }

    return offers
  }
}