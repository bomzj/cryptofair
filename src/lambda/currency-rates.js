import fetch from 'node-fetch'

// TODO: Implement real cloud distributed cache
let cachedRates = []

exports.handler = async function handler(event, context, callback) {
  const baseCurrency = event.queryStringParameters.base || "USD"
  
  const sendResponse = rates => callback(null, {
    statusCode: 200,
    body: JSON.stringify(rates)
  })
  
  let rates = getCurrencyRatesFromCache(baseCurrency)
  
  if (!rates) {
    let rates = await fetchCurrencyRates(baseCurrency)
    console.log('after await fetchCurrencyRates ' + baseCurrency)
    cacheCurrencyRates(rates, baseCurrency)
    sendResponse(rates)
    console.log('currency rates response sent')
  }
  else {
    sendResponse(rates)
    console.log('currency rates response sent from cache')
  }
}

function fetchCurrencyRates(baseCurrency) {
  const openexchangeratesApiKey = 'a02cec6678c64f06a76ed159855a03ef'
  
  // This is free api limitted to all major currencies 20-30
  console.log(baseCurrency)
  //return fetch('https://api.exchangeratesapi.io/latest?base=' + baseCurrency)

  // This api allows 1k calls per month
  return fetch('https://openexchangerates.org/api/latest.json?' +
    'app_id=' + openexchangeratesApiKey + 
    '&base=' + baseCurrency)
    .then(response => response.json())
    .then(data => data.rates)
    // .then(data => ({
    //   date: new Date(data.timestamp * 1000),
    //   base: data.base,
    //   rates: data.rates
    // }))
}

function getCurrencyRatesFromCache(baseCurrency) {
  return cachedRates.find(i => i.base == baseCurrency)
}

function cacheCurrencyRates(rates, baseCurrency) {
  const index = cachedRates.findIndex(i => i.base == baseCurrency)
  if (index > -1) cachedRates[index] = rates
  else cachedRates.push(rates)
}