import axios from "axios";

const CryptoInstance = axios.create({ //API - datos para obtener las principales monedas virtuales
  baseURL: 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false', 
  timeout: 3000
});

export default CryptoInstance;

