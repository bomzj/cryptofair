import axios from 'axios'
import { cacheAdapterEnhancer, Cache } from 'axios-extensions'

function getHttpClient(cacheMaxAgeInSeconds) {
  const cache = new Cache({ maxAge: cacheMaxAgeInSeconds * 1000 })
  
  const http = axios.create({
    baseURL: '/',
    headers: { 'Cache-Control': 'no-cache' },
    timeout: 10 * 1000, // request timeout is 10 seconds
    // cache will be enabled by default
    adapter: cacheAdapterEnhancer(axios.defaults.adapter, { defaultCache: cache })
  })

  return http
}

export default getHttpClient