import UtnInstance from "./Utn.connection.service";

export default new (class UserService {
  async getHistory(userId) {
    const response = await UtnInstance.get(
      `transactions?q={"user_id": "${userId}"}`
    );
    return response.data;
  }
})();
