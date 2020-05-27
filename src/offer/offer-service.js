var ratesToUSD = {
  USD: 1,
  EUR: 1.09,
  GBP: 1.22,
  RUB: 0.014
}

convertCurrency(amountFrom, currencyFrom, currencyTo) {
  let from = 1 / ratesToUSD[currencyFrom];
  let to = 1 / ratesToUSD[currencyTo];
  return amountFrom * from / to ;
}

export default convertCurrency;