import Offer from '@/offer/offer'
import getHttpClient from '@/http-client'
import PaymentMethodService from '@/offer/payment-method-service'

export default class HodlHodlExchange {
  static name = 'HodlHodl'
  static http = getHttpClient(5 * 60)
  static corsProxy = '/.netlify/functions/proxy-fetch/'
  static baseApiUrl = this.corsProxy + 'https://hodlhodl.com/'
  
  static async loadOffers(query) {
    let { tradeType, coin, paymentMethods, countryCode, tradingAmount, currency } = query

    if (coin != 'BTC') return []

    if (paymentMethods?.length) {
      var hodlHodlPaymentMethods = PaymentMethodService
        .mapPaymentMethodsToExchangeOnes(paymentMethods, 'hodlHodl')
      if (!hodlHodlPaymentMethods?.length) return []
    }

    let offerType = tradeType == 'Buy' ? 'sell' : 'buy'
   
    let requestUrl = this.baseApiUrl + 'api/v1/offers?' + 
      `filters[side]=${offerType}&` + 
      `filters[currency_code]=${currency ?? ''}&` + 
      (countryCode ? `filters[country]=${countryCode}&` : '')

    let requestUrls = Array(hodlHodlPaymentMethods?.length || 1)
      .fill(requestUrl)

    // Append payment method to each request if needed
    hodlHodlPaymentMethods?.forEach((method, i) => 
      requestUrls[i] += `filters[payment_method_id]=${method}`)
    
    let pendingResponses = requestUrls.map(url => this.http(url))
    const responses = await Promise.all(pendingResponses)
    let data = responses.map(r => r.data.offers).flat()
    
    const offers = []
    for (const item of data) {
        const offer = new Offer()
        offer.exchange.name = 'HodlHodl'
        offer.tradeType = query.tradeType == 'Buy' ? 'Sell' : 'Buy'
        offer.coin = coin
        offer.price.value = item.price
        offer.price.currency = item.currency_code
        offer.tradingAmount.min = item.min_amount
        offer.tradingAmount.max = item.max_amount
        
        if (query.tradeType == 'Buy') {
          var mappedPaymentMethods = item.payment_method_instructions?.map(x => 
            PaymentMethodService
              .mapExchangePaymentMethodToBaseOne(+x.payment_method_id, 'hodlHodl')) 
        } else {
          mappedPaymentMethods = item.payment_methods?.map(x => 
            PaymentMethodService
              .mapExchangePaymentMethodToBaseOne(+x.id, 'hodlHodl')) 
        }
        mappedPaymentMethods = mappedPaymentMethods ?? ['Other']
        // Remove duplicates
        mappedPaymentMethods = [...new Set(mappedPaymentMethods)]
        offer.paymentMethods.push(...mappedPaymentMethods)
        offer.trader.name = item.trader.login
        offer.trader.tradeCount = item.trader.trades_count
        offer.trader.rating = item.trader.rating
        offer.trader.country = item.trader.country_code
        offer.trader.city = undefined
        offer.url = 'https://hodlhodl.com/offers/' + item.id
        offer.trader.profileUrl = item.trader.url
        offer.trader.isNew = !item.trader.trades_count
        offer.paymentInfo = item.title 
        offer.trader.lastSeen = item.trader.online_status == "online" || 
                                item.trader.online_status == "recently_online" ? 
                                'online' : 
                                'offline'
        offers.push(offer)
    }

    return offers
  }
}