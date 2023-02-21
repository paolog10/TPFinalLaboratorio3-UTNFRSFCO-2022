import CryptoInstance from "./Crypto.connection.service";
import store from "../store/index";
import criptoYaInstance from "./CriptoYa.connection.service";

export default new (class CryptoService {
  async getCrypto() {
    const response = await CryptoInstance.get();
    let data = response.data;

    for (let index = 0; index < data.length; index++) {
      try {
        const currentPrice = await this.getCriptoYa(
          data[index].symbol.toUpperCase(),
          1
        );
        let arrayCurrenPrice = Object.entries(currentPrice).map((elem) => {
          return { ...elem[1], name: elem[0] };
        });

        data[index] = { ...data[index], current_price_ars: arrayCurrenPrice };
      } catch (error) {
        data[index] = { ...data[index], current_price_ars: {} };
      }
    }
    store.commit("changeTopCrypto", data);
  }

  async getCriptoYa(coin, volumen) {
    const response = await criptoYaInstance.get(`/${coin}/ARS/${volumen}`);
    return response.data;
  }
})();
