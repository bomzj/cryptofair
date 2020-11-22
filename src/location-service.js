import countries from '@/countries.json'
import getHttpClient from '@/http-client'
const http = getHttpClient(60 * 60)

export default class LocationService {
  static async detectUserCountry() {
    let getUserCountryCodeRequest = http('http://ip-api.com/json/?fields=countryCode')
    let getCountriesRequest = this.getCountries()
    let responses = await Promise.all([getUserCountryCodeRequest, getCountriesRequest])
    let { userCountryCode } = responses[0].data
    return responses[1].find(c => c.code == userCountryCode)
  }
  
  static async getCountries() {
    //https://raw.githubusercontent.com/umpirsky/country-list/master/data/en/country.json
    return Object.entries(countries).map(([k, v]) => ({ name: v, code: k }))
  }

  static async getCountryName(code) {
    return (await this.getCountries()).find(c => c.code == code)?.name
  }
}