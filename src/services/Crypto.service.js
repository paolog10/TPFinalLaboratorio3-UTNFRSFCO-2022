import CryptoInstance from "./Crypto.connection.service";
import store from "../store/index"

export default new class CryptoService {
  async getCrypto() {
    const response = await CryptoInstance.get();
    store.commit("changeTopCrypto", response.data);
  }
}
