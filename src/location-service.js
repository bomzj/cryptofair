import countries from '@/countries.json'
import getHttpClient from '@/http-client'
const http = getHttpClient(24 * 60 * 60)

export default class LocationService {
  static corsProxy = '/.netlify/functions/proxy-fetch/'
  // ipregistry allows 100k api calls per month
  static detectUserInfoApiUrl = 'https://api.ipregistry.co/?key=tlddnw3lxqidnc'
  
  static async detectUserCountry() {
    let getUserCountryCodeRequest = http(this.detectUserInfoApiUrl)
    let getCountriesRequest = this.getCountries()
    let responses = await Promise.all([getUserCountryCodeRequest, getCountriesRequest])
    let countryCode = responses[0].data.location.country.code
    return responses[1].find(c => c.code == countryCode)
  }
  
  static async detectUserCurrency() {
    let response = await http(this.detectUserInfoApiUrl)
    let currency = response.data.currency
    return { name: currency.name, code: currency.code }
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