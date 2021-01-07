import Offer from '@/offer/offer'
import LocationService from '@/location-service'
import getHttpClient from '@/http-client'
import Fuse from 'fuse.js'

export default class PaxfulExchange {
  static http = getHttpClient(1)
  static corsProxy = '/.netlify/functions/proxy-fetch/'
  static baseApiUrl = this.corsProxy + 'https://paxful.com/rest/v1/'
  
  static async loadOffers(query) {
    let { tradeType, coin, paymentMethods, countryCode } = query
  
    const cryptoCodeToId = { 'BTC': 1, 'USDT': 4 }

    if (!cryptoCodeToId[coin]) return []

    if (paymentMethods?.length) {
      var paxfulPaymentMethods = await this.getPaxfulPaymentMethodsFrom(paymentMethods)
      // if paxful doesn't have mappings to payment methods then quit
      if (!paxfulPaymentMethods?.length) return []
    }

    let paxfulPaymentMethodsQueryString = paxfulPaymentMethods
      ?.map((x, i) => `payment-method[${i}]=${x}`) 
      .join('&')

    let requestUrl = this.baseApiUrl + 
                    `offers?camelCase=1&` +
                    `crypto_currency_id=${cryptoCodeToId[coin]}&` +
                    `visitor_country_iso=${countryCode}&` +
                    `type=${query.tradeType.toLowerCase()}&` +
                    paxfulPaymentMethodsQueryString
    
    // Paxful always returns 500 offers!
    let response = await this.http(requestUrl)
    let data = response.data.data
    
    // Paxful API doesn't support country filter, 
    // filtering is based on currency code derived from country
    // Maybe we can filter by currency meaning country filtering?
    if (countryCode) {
      let countryCurrency = await LocationService.getCountryCurrency(countryCode)
      data = data.filter(o => o.fiatCurrencyCode == countryCurrency)
    }
    
    const offers = []
    for (const item of data) {
        const offer = new Offer()
        offer.exchange.name = 'Paxful'
        offer.tradeType = query.tradeType == 'Buy' ? 'Sell' : 'Buy'
        offer.coin = coin
        offer.price.value = item.fiatPricePerBtc
        offer.price.currency = item.fiatCurrencyCode
        offer.tradingAmount.min = item.fiatAmountRangeMin
        offer.tradingAmount.max = item.fiatAmountRangeMax
        offer.paymentMethods.push(item.paymentMethodName)
        offer.trader.name = item.username
        offer.trader.tradeCount = // Need separate api call to get trade count!
        offer.trader.rating = item.score
        offer.trader.country = item.locationCountryIsoCode // often null, maybe we need to parse timezone field instead
        offer.trader.city = item.cityName // often empty
        offer.url = 'https://paxful.com/offer/' + item.idHashed
        offer.trader.profileUrl = 'https://paxful.com/user/' + item.username
        offers.push(offer)
    }

    return offers
  }

  static async getPaxfulPaymentMethodsFrom(paymentMethods) {
    let response = await this.http(this.baseApiUrl + 'payment-methods/')
    let exchangePaymentMethods = response.data.data

    const fuse = new Fuse(exchangePaymentMethods, { keys: ['name'] })

    let mappedPaymentMethods = []
    
    for (const paymentMethod of paymentMethods) {
      let fixedPaymentMethods = this.fixWrongAutoMappingForPaymentMethod(paymentMethod)
      // Check if can use automapping
      if (!fixedPaymentMethods) {
        let id = fuse.search(paymentMethod)[0]?.item?.slug
        mappedPaymentMethods.push(id)
      } // Otherwise add patched values
      else mappedPaymentMethods.push(...fixedPaymentMethods)
    }

    return mappedPaymentMethods
  }

  static fixWrongAutoMappingForPaymentMethod(paymentMethod) {
    switch (paymentMethod) {
      case 'Alipay': return []
      case 'Efectry': return []
      case 'Paxum': return []
      case 'PayNow': return []
      case 'SEPA Transfer': return ['sepa']
      case 'WorldRemit': return []
    }
  }
}