export default class LocationService {
  static async detectUserCountry() {
    let getUserCountryCodeRequest = fetch('http://ip-api.com/json/?fields=countryCode')
    let getCountriesRequest = this.getCountries()
    let responses = await Promise.all([getUserCountryCodeRequest, getCountriesRequest])
    let { userCountryCode } = await responses[0].json()
    return responses[1].find(c => c.code == userCountryCode)
  }
  
  static async getCountries() {
    let response = await fetch('https://raw.githubusercontent.com/umpirsky/country-list/master/data/en/country.json')
    let data = await response.json()
    return Object.entries(data).map(([k, v]) => ({ name: v, code: k }))
  }

  static async getCountryName(code) {
    return (await this.getCountries()).find(c => c.code == code)?.name
  }
}