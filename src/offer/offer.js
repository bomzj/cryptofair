export default class Offer { 
  tradeType = null
  coin = null
  
  price = { 
    value: null,
    currency: null
  }

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
    totalTrades: null,
    country: null,
    city: null
  }
}