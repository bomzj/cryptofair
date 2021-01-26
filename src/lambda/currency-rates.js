import getHttpClient from '../http-client.js'
const cacheTtlInSeconds = 8 * 60 * 60
const http = getHttpClient(cacheTtlInSeconds)

import faunadb from 'faunadb' /* Import faunaDB sdk */

/* configure faunaDB Client with our secret */
const q = faunadb.query
const client = new faunadb.Client({
  secret: 'fnAEAZxfaoACB6MWUnKJi9M1Ibyiw_5bd6t5dPD_'
})

let cachedRatesInMemory = undefined

exports.handler = async function handler(event, context, callback) {
  const baseCurrency = event.queryStringParameters.base || "USD"
  
  const sendResponse = rates => callback(null, {
    statusCode: 200,
    body: JSON.stringify(rates)
  })
  
  let rates = await getCurrencyRatesFromCache(baseCurrency)
  
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

async function getCurrencyRatesFromCache(baseCurrency) {
  // Try to get cached rates from the memory cache
  if (cachedRatesInMemory) return cachedRatesInMemory

  // Then get cached currency rates from the cloud cache
  console.log('Getting currency rates from the cloud cache...')
  let cachedRatesInCloud = await client.query(
    q.Get(q.Ref(q.Collection('Cache'), '288683618880979463')))
    
  let cloudCacheUpdateDate = new Date(cachedRatesInCloud.ts / 1000)
  let cacheLifeInSeconds = (+(new Date()) - cloudCacheUpdateDate) / 1000
  console.log('Currency rates cloud cache life is ' + cacheLifeInSeconds + ' seconds')
  if (cacheLifeInSeconds > cacheTtlInSeconds) console.log('Cloud cache is expired and will be updated')
  return cacheLifeInSeconds > cacheTtlInSeconds ?  undefined : cachedRatesInCloud.data
}

async function cacheCurrencyRates(rates, baseCurrency) {
  // Update cloud cache
  console.log('Updating the cloud cache with new currency rates...')
  client.query(q.Replace(
    q.Ref(q.Collection('Cache'), '288683618880979463'), { data: rates }))
    .then((ret) => console.log('Currency rates cloud cache update completed'))

  // Update in memory cache
  return cachedRatesInMemory = rates
}