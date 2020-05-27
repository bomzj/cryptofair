var ratesToUSD = {
  USD: 1,
  EUR: 1.09,
  GBP: 1.22,
  RUB: 0.014
}

class CurrencyConverter {
  static convertCurrency(amountFrom, currencyFrom, currencyTo) {
    let from = 1 / ratesToUSD[currencyFrom];
    let to = 1 / ratesToUSD[currencyTo];
    return amountFrom * to / from ;
  }

  static getCurrencySymbol(currency) {
    let formatter = new Intl.NumberFormat(undefined, { style: 'currency', currency });
    return formatter.formatToParts().find(i => i.type == 'currency').value;
  }

  static formatPrice(value, currency) {
    let formatter = new Intl.NumberFormat(undefined, { style: 'currency', currency });
    return formatter.format(value);
  }
}

export default CurrencyConverter;