import Offer from '@/offer/offer'
import getHttpClient from '@/http-client'
import PaymentMethodService from '@/offer/payment-method-service'

export default class BinanceExchange {
  static name = 'Binance'
  static http = getHttpClient(5 * 60)
  static corsProxy = '/.netlify/functions/proxy-fetch/'
  static baseApiUrl = this.corsProxy + 'https://p2p.binance.com/'
  
  static async loadOffers(query) {
    let { tradeType, coin, paymentMethods, countryCode, 
          tradingAmount, hideNewTraders } = query

    const availableCryptos = ['BTC', 'ETH', 'DAI', 'USDT', 'BUSD', 'BNB']

    if (!availableCryptos.includes(coin)) return []
    
    if (paymentMethods?.length) {
      var exchangePaymentMethods = PaymentMethodService
        .mapPaymentMethodsToExchangeOnes(paymentMethods, 'binance')
      if (!exchangePaymentMethods?.length) return []
    }

    let offerType = tradeType == 'Buy' ? 'sell' : 'buy'
   
    let requestUrl = this.baseApiUrl + 'gateway-api/v2/public/c2c/adv/search'// + 
      // `trading_type=${offerType}&` + 
      // `coin_currency=${coin}&` +
      // `hide_new=${hideNewTraders ? 1 : 0}&` +
      // 'limit=50&' +
      // `ordering=${countryCode ? 'country_first,' : ''}current_price_usd&` +
      // (countryCode ? `country_code=${countryCode}&` : '')

    let requestUrls = Array(exchangePaymentMethods?.length || 1)
      .fill(requestUrl)

    // Append payment method to each request if needed
    exchangePaymentMethods?.forEach((method, i) => 
      requestUrls[i] += `payment_method=${method}`)
    
    let pendingResponses = requestUrls.map(url => this.http.post(url, { 
      page:1, rows:10, asset:'BTC', tradeType:'BUY', fiat:'EUR' 
    }))
    const responses = await Promise.all(pendingResponses)
    let data = responses.map(r => r.data.results).flat()
    
    // filter out offers with wrong countries since API doesn't trully filter by country
    if (countryCode) data = data.filter(x => x.country_code == countryCode)

    const offers = []
    for (const item of data) {
        const offer = new Offer()
        offer.exchange.name = 'Binance'
        offer.tradeType = query.tradeType == 'Buy' ? 'Sell' : 'Buy'
        offer.coin = coin
        offer.price.value = item.advDetail.price
        offer.price.currency = item.advDetail.fiatUnit
        offer.tradingAmount.min = item.advDetail.minOrderPrice
        offer.tradingAmount.max = item.advDetail.maxOrderPrice
        
        let mappedPaymentMethod = PaymentMethodService
          .mapExchangePaymentMethodToBaseOne(item.payment_method.slug, 'binance')
        
        offer.paymentMethods.push(mappedPaymentMethod)
        offer.trader.name = item.merchant.nickName
        offer.trader.tradeCount = item.merchant.completedOrderNumOfLatest30day
        offer.trader.rating = item.merchant.monthFinishRate
        offer.trader.country = undefined
        offer.trader.city = undefined
        offer.url = `https://p2p.binance.com/merchantDetail/` + item.merchant.merchantNo
        offer.trader.profileUrl = `https://p2p.binance.com/merchantDetail/` + item.merchant.merchantNo
        offer.trader.isNew = !item.created_by.completed_trades
        offer.paymentInfo = item.headline 
        offer.trader.lastSeen = item.created_by.last_seen * 1000
        offers.push(offer)
    }

    return offers
  }
}