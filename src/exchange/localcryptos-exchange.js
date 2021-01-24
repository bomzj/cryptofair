import Offer from '@/offer/offer'
import getHttpClient from '@/http-client'
import PaymentMethodService from '@/offer/payment-method-service'

export default class LocalCryptosExchange {
  static name = 'LocalCryptos'
  static http = getHttpClient(5 * 60)
  static corsProxy = '/.netlify/functions/proxy-fetch/'
  static baseApiUrl = this.corsProxy + 'https://localcryptosapi.com/v1/'
  
  static async loadOffers(query) {
    let { tradeType, coin, paymentMethods, countryCode, currency } = query
  
    const cryptoCodeToId = { 'BTC': 2, 'ETH': 1, 'DASH': 4, 'LTC': 3 }

    if (!cryptoCodeToId[coin]) return []

    let allPaymentMethods = PaymentMethodService.getPaymentMethods()
    
    if (paymentMethods?.length) {
      var localCryptosPaymentMethods = this.getLocalCryptosPaymentMethodsFrom(paymentMethods)
      if (!localCryptosPaymentMethods?.length) return []
    }

    let offerType = tradeType == 'Buy' ? 'sell' : 'buy'
    let requestUrl = this.baseApiUrl + 
                    `offers/find?sort_by=price&offer_type=${offerType}&` +
                    `market_id=${cryptoCodeToId[coin]}&` +
                    (currency ? `local_currency_code=${currency}&` : '') +
                    (countryCode ? `city_id=${countryCode}&` : '')

    let requestUrls = Array(localCryptosPaymentMethods?.length || 1).fill(requestUrl)

    // Append payment method to each request if needed
    localCryptosPaymentMethods?.forEach((method, i) => 
                                        requestUrls[i] += `payment_method_id=${method}`)
    
    let pendingResponses = requestUrls.map(url => this.http(url))
    const responses = await Promise.all(pendingResponses)
    let data = responses.map(r => r.data.offers).flat()
    
    const offers = []
    for (const item of data) {
        const offer = new Offer()
        offer.exchange.name = 'LocalCryptos'
        offer.tradeType = query.tradeType == 'Buy' ? 'Sell' : 'Buy'
        offer.coin = coin
        offer.price.value = item.price.amount_including_taker_fee
        offer.price.currency = item.local_currency_code
        offer.tradingAmount.min = item.limits_minimum
        offer.tradingAmount.max = item.limits_maximum
        let paymentMethod = allPaymentMethods
          .find(x => x.mapping?.localCryptos == item.payment_method_id)?.name
        if (paymentMethod) offer.paymentMethods.push(paymentMethod)
        offer.trader.name = item.account_username
        offer.trader.tradeCount = item.reputation.trade_count
        offer.trader.rating = item.reputation.percent_feedback_good
        offer.trader.country = item.city.country_code
        offer.trader.city = item.city.ascii_name
        offer.url = 'https://localcryptos.com/offer/' + item.id
        offer.trader.profileUrl = 'https://localcryptos.com/profile/' + item.account_username
        offer.trader.isNew = !parseInt(item.trade_count)
        offer.paymentInfo = item.headline
        offer.trader.lastSeen = Date.now() - item.reputation.last_seen_ago * 1000
        offers.push(offer)
    }

    return offers
  }

  static getLocalCryptosPaymentMethodsFrom(paymentMethods) {
    let localCryptosPaymentMethods = []
    let allPaymentMethods = PaymentMethodService.getPaymentMethods()

    for (const paymentMethod of paymentMethods) {
      let id = allPaymentMethods.find(x => x.name == paymentMethod)
        ?.mapping?.localCryptos
      
        if (id) localCryptosPaymentMethods.push(id)
    }

    return localCryptosPaymentMethods
  }
}