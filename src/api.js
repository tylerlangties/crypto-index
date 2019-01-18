export const api = (currency, ts) =>
  `https://poloniex.com/public?command=returnChartData&currencyPair=USDT_${currency}&start=${ts}&end=9999999999&period=14400`;
