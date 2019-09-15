const latestExchangeRate = {
    "base": "USD",
    "date": "2018-02-13",
    "rates": {
        "AUD": 1.2742,
        "BGN": 1.5858,
        "BRL": 3.2954,
        "CAD": 1.2604,
        "CHF": 0.93424,
        "CNY": 6.3443,
        "CZK": 20.584,
        "DKK": 6.0397,
        "EUR": 0.81083,
        "GBP": 0.72111,
        "HKD": 7.8219,
        "HRK": 6.0291,
        "HUF": 253.11,
        "IDR": 13640,
        "ILS": 3.533,
        "INR": 64.277,
        "ISK": 101.68,
        "JPY": 107.69,
        "KRW": 1085.1,
        "MXN": 18.631,
        "MYR": 3.947,
        "NOK": 7.899,
        "NZD": 1.3736,
        "PHP": 52.124,
        "PLN": 3.3877,
        "RON": 3.7773,
        "RUB": 57.777,
        "SEK": 8.0587,
        "SGD": 1.3228,
        "THB": 31.51,
        "TRY": 3.8,
        "ZAR": 11.982
    },
    multiplyByTen: (num) => num * 10
}

const getDateAndBase = () => {
  console.log(latestExchangeRate.base);
  console.log(latestExchangeRate.date);
}
getDateAndBase();


const getAvailableCurrencies = () => {
  console.log(Object.keys(latestExchangeRate.rates));
}
getAvailableCurrencies();


const currencyAndRate = (obj) => {
  for (let x in obj) {
    console.log(`${x} is at a ${obj[x]} conversion rate`);
  }
}

currencyAndRate(latestExchangeRate.rates);


const multiplyByTen = (obj) => {
  let arr = [];
  for (let x in obj) {
    arr.push(obj[x]);
  }
  arr.forEach((num) => {console.log(latestExchangeRate.multiplyByTen(num))});
}
multiplyByTen(latestExchangeRate.rates);