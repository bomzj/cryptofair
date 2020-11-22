import getHttpClient from '../http-client.js'
const http = getHttpClient(8 * 60 * 60)

// TODO: Implement real cloud distributed cache
let cachedRates = undefined

exports.handler = async function handler(event, context, callback) {
  const baseCurrency = event.queryStringParameters.base || "USD"
  
  const sendResponse = rates => callback(null, {
    statusCode: 200,
    body: JSON.stringify(rates)
  })
  
  let rates = getCurrencyRatesFromCache(baseCurrency)
  
  if (!rates) {
    let rates = await fetchCurrencyRates(baseCurrency)
    cacheCurrencyRates(rates, baseCurrency)
    sendResponse(rates)
  }
  else {
    console.log('sending currency rates from cache')
    sendResponse(rates)
  }
}

async function fetchCurrencyRates(baseCurrency) {
  const openexchangeratesApiKey = 'a02cec6678c64f06a76ed159855a03ef'
  
  try {
    // This api allows 1k calls per month
    var response = await http('https://openexchangerates.org/api/latest.json?' +
                              'app_id=' + openexchangeratesApiKey + 
                              '&base=' + baseCurrency)
  } catch (error) {
    console.error(error)
    console.log('using fallback endpoint to get currency rates')
    // Fallback, this is free api limitted to all major currencies
    response = await http('https://api.exchangeratesapi.io/latest?base=' + baseCurrency)
  }
 
  return response.data.rates
}

function getCurrencyRatesFromCache(baseCurrency) {
  return cachedRates
}

function cacheCurrencyRates(rates, baseCurrency) {
  return cachedRates = rates
}