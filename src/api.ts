const Base_URL = "https://api.coinpaprika.com/v1";

export function fetchCoins() {
  return fetch(`${Base_URL}/coins`).then((response) => response.json());
}

export function fetchCoinInfo(coin: string) {
  return fetch(`${Base_URL}/coins/${coin}`).then((response) => response.json());
}
export function fetchCoinTickers(coin: string) {
  return fetch(`${Base_URL}/tickers/${coin}`).then((response) =>
    response.json()
  );
}
export function fetchCoinHistory(coin: string) {
  const endDate = Math.floor(Date.now() / 1000);
  const startDate = endDate - 60 * 60 * 24 * 7 * 2;
  return fetch(
    `${Base_URL}/coins/${coin}/ohlcv/historical?start=${startDate}&end=${endDate}`
  ).then((response) => response.json());
}
