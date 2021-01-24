import Offer from '@/offer/offer'
import LocationService from '@/location-service'
import getHttpClient from '@/http-client'
import Fuse from 'fuse.js'
import PaymentMethodService from '@/offer/payment-method-service'

export default class PaxfulExchange {
  static name = 'Paxful'
  static http = getHttpClient(5 * 60)
  static corsProxy = '/.netlify/functions/proxy-fetch/'
  static baseApiUrl = this.corsProxy + 'https://paxful.com/rest/v1/'
  
  static async loadOffers(query) {
    let { tradeType, coin, paymentMethods, countryCode, currency } = query
  
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

    if (paymentMethods.includes('Cash in Person')) {
      //this.http('https://paxful.com/location/search?camelCase=1&q=' + )
      let countryName = LocationService.getCountryName(countryCode)
      let geonameResponse = await this.http(this.corsProxy + 
                                          'http://api.geonames.org/searchJSON?' +
                                          'username=keke1234&maxRows=20&q=' + countryName)
      var geonameId = geonameResponse.data.geonames
                      .find(x => x.countryCode == countryCode)?.geonameId
    }

    let requestUrl = this.baseApiUrl + 
                    `offers?camelCase=1&` +
                    `crypto_currency_id=${cryptoCodeToId[coin]}&` +
                    `visitor_country_iso=${countryCode}&` +
                    `type=${tradeType.toLowerCase()}&` +
                    `currency=${currency ?? ''}&` +
                    (paxfulPaymentMethodsQueryString ? paxfulPaymentMethodsQueryString + '&' : '') +
                    (geonameId ? 'location_id=' + geonameId : '')
    
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

    let allPaymentMethods = PaymentMethodService.getPaymentMethods()
    
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
        let paymentMethod = allPaymentMethods
          .find(x => x.mapping?.paxful == item.paymentMethodSlug)?.name
        offer.paymentMethods.push(paymentMethod || 'Other')
        offer.trader.name = item.username
        offer.trader.tradeCount = // Need separate api call to get trade count!
        offer.trader.rating = item.score
        offer.trader.country = item.locationCountryIsoCode // often null, maybe we need to parse timezone field instead
        offer.trader.city = item.cityName // often empty
        offer.url = 'https://paxful.com/offer/' + item.idHashed
        offer.trader.profileUrl = 'https://paxful.com/user/' + item.username
        offer.trader.isNew = !parseInt(item.feedbackPositive)
        offer.paymentInfo = item.paymentMethodLabel
        offer.trader.lastSeen = item.lastSeen * 1000
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
      case 'Efecty': return []
      case 'Paxum': return []
      case 'PayNow': return []
      case 'SEPA Transfer': return ['sepa']
      case 'WorldRemit': return []
    }
  }
}