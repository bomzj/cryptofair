import Offer from '@/offer/offer'
import LocationService from '@/location-service'
import getHttpClient from '@/http-client'
import Fuse from 'fuse.js'

export default class LocalBitcoinsExchange {
  static siteUrl = 'https://localbitcoins.com/'
  // LocalBitcoins API doesn't enable CORS to use their API publicly for some stupid reason
  // so we need to use proxy which adds CORS headers to allow our site fetch data from LocalBitcoins
  static baseApiUrl = '/.netlify/functions/proxy-fetch/' + this.siteUrl
  static http = getHttpClient(5 * 60)
  
  static async loadOffers(query) {
    let { tradeType, coin, paymentMethods, countryCode } = query
    
    if (coin != 'BTC') return []
    
    if (paymentMethods?.length) {
      var localBitcoinsPaymentMethods = 
        await this.getLocalBitcoinsPaymentMethodsFrom(paymentMethods, countryCode)
      // if localbitcoins doesn't have mappings to payment methods then quit
      if (!localBitcoinsPaymentMethods?.length) return []
    }
    
    let requestUrl = this.baseApiUrl
    requestUrl += tradeType == 'Buy' ? 'buy-bitcoins-online' : 'sell-bitcoins-online'

    // LocalBitcoins API supports only single payment method per request,
    // that's why we have to send multiple requests based on count of payment methods
    let requestUrls = Array(localBitcoinsPaymentMethods?.length || 1).fill(requestUrl)

    // Append country filter if needed
    if (countryCode) {
      let countryName = await LocationService.getCountryName(countryCode)
      requestUrls.forEach((url, i) => 
                          requestUrls[i] += `/${countryCode}/${countryName}`)
    }

    // Append payment method if needed
    localBitcoinsPaymentMethods?.forEach((method, i) => requestUrls[i] += `/${method}`)
    
    requestUrls.forEach((value, i) => requestUrls[i] += `/.json`)

    // Send requests sequentally one by one, 
    // since LocalBitcoins can not handle normally paralleled requests
    let localBitcoinsOffers = []
    for (let requestUrl of requestUrls) {
      let offers = (await this.http(requestUrl)).data.data.ad_list
        .map(x => ({ ...x.data, ...x.actions }))
      localBitcoinsOffers.push(...offers)
    }

    const offers = []
  
    for (const item of localBitcoinsOffers) {
      const offer = new Offer()
      offer.exchange.name = 'LocalBitcoins'
      offer.tradeType = 'Buy'  
      offer.coin = 'BTC'
      offer.price.value = +item.temp_price
      offer.price.currency = item.currency
      offer.tradingAmount.min = item.min_amount
      offer.tradingAmount.max = item.max_amount_available
      offer.paymentMethods.push(item.online_provider)
      offer.trader.name = item.profile.username
      offer.trader.tradeCount = parseInt(item.profile.trade_count?.replace(' ', ''))
      offer.trader.rating = item.profile.feedback_score
      offer.trader.country = item.countrycode
      offer.trader.city = item.city
      offer.url = item.public_view
      offer.trader.profileUrl = this.siteUrl + 'accounts/profile/' + item.profile.username
      offers.push(offer)
    }

    return offers
  }

  static async getLocalBitcoinsPaymentMethodsFrom(paymentMethods, countryCode) {
    let response = await this.http(this.baseApiUrl + 'api/payment_methods/')
   
    let localBitcoinsMethods = Object.entries(response.data.data.methods)
                                .map(([prop, method]) => { 
                                  method.id = prop
                                  return method
                                })

    const fuse = new Fuse(localBitcoinsMethods, { 
                                                  includeScore: true,
                                                  keys: ['name']
                                                })

    let localBitcoinsMethodCodes = []
    
    for (const paymentMethod of paymentMethods) {
      let fixedCodes = this.fixWrongAutoMappingForPaymentMethod(paymentMethod, countryCode)
      // Check if can use automapping
      if (!fixedCodes) {
        let code = fuse.search(paymentMethod)[0]?.item?.id
        localBitcoinsMethodCodes.push(code)
      } // Otherwise add patched values
      else localBitcoinsMethodCodes.push(...fixedCodes)
    }

    return localBitcoinsMethodCodes
  }

  static fixWrongAutoMappingForPaymentMethod(paymentMethod, countryCode) {
    switch (paymentMethod) {
      case 'Airtel': return []
      case 'Bank Transfer': 
        switch (countryCode) {
          case 'RU': return ['national-bank-transfer', 'sbp-fast-bank-transfer', 'transfers-with-specific-bank', 'sberbank', 'tinkoff', 'alfa-bank', 'vtb-bank-vtb']
          default: return ['national-bank-transfer', 'transfers-with-specific-bank']
        }
      case 'Cardless Cash': return []
      case 'Cash in Person': return []
      case 'Efectry ': return []
      case 'Gift Card': return []
      case 'IMPS Transfer': return ['imps-bank-transfer-india']
      case 'M-Pesa': return ['m-pesa-kenya-safaricom', 'm-pesa-tanzania-vodacom']
      case 'MTN Mobile Money': return []
      case 'PayNow': return []
      case 'SEPA Transfer': return ['sepa-eu-bank-transfer']
      case 'Other': return ['other-remittance', 'other-online-wallet-global', 'other-online-payment']
    }
  }
}