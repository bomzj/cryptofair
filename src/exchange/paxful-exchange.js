import Offer from '@/offer/offer'
import CurrencyService from '@/currency/currency-service'
import CryptocurrencyService from '@/cryptocurrency/cryptocurrency-service'
import LocationService from '@/location-service'
import getHttpClient from '@/http-client'

export default class PaxfulExchange {
  static http = getHttpClient(1)
  static corsProxy = '/.netlify/functions/proxy-fetch/'
  static baseApiURL = 'https://paxful.com/rest/v1/'
  
  static async loadOffers(query) {
    let { tradeType, coin, paymentMethods, countryCode } = query
  
    const cryptoCodeToId = { 'BTC': 1, 'USDT': 4 }

    if (!cryptoCodeToId[coin]) return []

    let requestUrl = this.corsProxy + this.baseApiURL + 
                     `offers?camelCase=1&` +
                     `crypto_currency_id=${cryptoCodeToId[coin]}&` +
                     `visitor_country_iso=${countryCode}&` +
                     `type=${query.tradeType.toLowerCase()}`

    

    // let localBitcoinsPaymentMethods = paymentMethods ? await PaymentMethodService
    //   .translatePaymentMethodsToExchangeKnownIds(paymentMethods, 'localbitcoins') :
    //   []

    // LocalBitcoins API supports only single payment method per request,
    // that's why we have to send multiple requests based on count of payment methods
    //let requestUrls = Array(localBitcoinsPaymentMethods.length || 1).fill(requestUrl)

    // Append country filter if needed
    // if (countryCode) {
    //   let countryName = await LocationService.getCountryName(countryCode)
    //   requestUrls.forEach((url, i) => 
    //                       requestUrls[i] += `/${countryCode}/${countryName}`)
    // }

    // Append payment method if needed
    //localBitcoinsPaymentMethods.forEach((method, i) => requestUrls[i] += `/${method}`)
    
    //requestUrls.forEach((value, i) => requestUrls[i] += `/.json`)
    
    //let pendingResponses = requestUrls.map(url => http(url))
    //const responses = await Promise.all(pendingResponses)
    //let dataList = responses.map(r => r.data)
    
    // Paxful always returns 500 offers!
    let response = await this.http(requestUrl)
    
    let data = response.data.data
    
    // Paxful API doesn't support country filter, 
    // filtering is based on currency code derived from country
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
}