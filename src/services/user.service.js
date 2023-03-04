import UtnInstance from "./Utn.connection.service";

export default new (class UserService {
  //historial de movimientos
  async getHistory(userId) {
    const response = await UtnInstance.get(
      `transactions?q={"user_id":"${userId}"}`
    );
    return response.data;
  }

  //compra
  async createPurchase(data) {
    const response = await UtnInstance.post("transactions", data, {});
  }

  //venta
  async createSale(data) {
    const response = await UtnInstance.post("transactions", data, {});
    return response.data;
  }

  //Eliminar registro
  async deleteHistory(id) {
    const response = await UtnInstance.delete(`transactions/${id}`);
    return response.data;
  }

  async editHistory(id, payload) {
    const response = await UtnInstance.patch(`transactions/${id}`, payload);
    return response.data;
  }
})();
