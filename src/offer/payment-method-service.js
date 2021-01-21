import paymentMethods from './payment-methods.json'
import getHttpClient from '@/http-client'
const http = getHttpClient(24 * 60 * 60)

export default class PaymentMethodService {
  static getPaymentMethods() {
    return paymentMethods
  }

  static mapPaymentMethodsToExchangeOnes(paymentMethods, exchangeName) {
    let exchangePaymentMethods = []
    let allPaymentMethods = PaymentMethodService.getPaymentMethods()

    for (const paymentMethod of paymentMethods) {
      let mapping = allPaymentMethods.find(x => x.name == paymentMethod)
        .mapping[exchangeName] 
      
      // Some payment method mappings can be 1 to many instead of 1:1
      if (Array.isArray(mapping)) exchangePaymentMethods.push(...mapping)
      else exchangePaymentMethods.push(mapping)
    }

    return exchangePaymentMethods
  }

  static mapExchangePaymentMethodToBaseOne(exchangePaymentMethod, exchangeName) {
    let paymentMethod = this.getPaymentMethods()
      .find(x => { 
        let mapping = x.mapping ? x.mapping[exchangeName] : undefined
        let hasMapping = false
        if (Array.isArray(mapping)) hasMapping = mapping.includes(exchangePaymentMethod)
        else hasMapping = mapping == exchangePaymentMethod
        return hasMapping
      })

    return paymentMethod?.name ?? 'Other'
  }
}