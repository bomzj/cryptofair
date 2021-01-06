import paymentMethods from './payment-methods.json'
import getHttpClient from '@/http-client'
const http = getHttpClient(24 * 60 * 60)

export default class PaymentMethodService {
  static async getPaymentMethods() {
    return paymentMethods
  }
  
  

}