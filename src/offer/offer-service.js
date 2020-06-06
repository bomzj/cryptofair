import LocalBitcoinsOfferProvider from './localbitcoins-offer-provider'

export default class OfferService {
  static #providers = [LocalBitcoinsOfferProvider]
  
  static async getOffers(tradeType, coin, paymentMethods) {
    const requests = this.#providers.map(p => p.getOffers(tradeType, coin, paymentMethods))
    let offers = await Promise.all(requests)
    offers = offers.flat()
    return offers
  }
}