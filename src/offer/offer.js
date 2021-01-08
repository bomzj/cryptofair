export default class Offer { 
  // maybe to rename to just 'type'
  tradeType = null
  coin = null
  url = null
  
  price = { 
    value: null,
    currency: null
  }

  priceInUserCurrency = null

  paymentMethods = []
  
  tradingAmount = {
    min: null,
    max: null
  }

  exchange = { 
    name: null 
  }
  
  trader = { 
    name: null, 
    rating: null,
    tradeCount: null,
    country: null,
    city: null,
    profileUrl: null
  }
}