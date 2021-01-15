import countries from '@/countries.json'
import getHttpClient from '@/http-client'
const http = getHttpClient(60 * 60)

export default class LocationService {
  static corsProxy = '/.netlify/functions/proxy-fetch/'
  
  static async detectUserCountry() {
    let getUserCountryCodeRequest = http(this.corsProxy + 'http://ip-api.com/json/?fields=countryCode')
    let getCountriesRequest = this.getCountries()
    let responses = await Promise.all([getUserCountryCodeRequest, getCountriesRequest])
    // Get user country code
    let { countryCode } = responses[0].data
    return responses[1].find(c => c.code == countryCode)
  }
  
  static async detectUserCurrency() {
    let response = await http(this.corsProxy + 'http://ip-api.com/json/?fields=currency')
    let { currency } = response.data
    // I found that Belarussian currency has wrong code, maybe there can others who knows
    if (currency == 'BYR') currency = 'BYN'
    return currency
  }

  static async getCountryCurrency(countryCode) {
    let response = await http(this.corsProxy + 'http://country.io/currency.json')
    let currency = response.data[countryCode]
    // I found that Belarussian currency has wrong code, maybe there can others who knows
    if (currency == 'BYR') currency = 'BYN'
    return currency
  }

  static getCountries() {
    //https://raw.githubusercontent.com/umpirsky/country-list/master/data/en/country.json
    return Object.entries(countries).map(([k, v]) => ({ name: v, code: k }))
  }

  static getCountryName(code) {
    return this.getCountries().find(c => c.code == code)?.name
  }
}