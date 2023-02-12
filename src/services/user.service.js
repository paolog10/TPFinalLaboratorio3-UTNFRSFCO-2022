import axiosInstance from "./axios.connection.service";

export default new class UserService {
  async getHistory(userId){
    const request = await axiosInstance.get(`transactions?q={"user_id": "${userId}"}`);
    return request.data;
  }
}