import axios from "axios";

const criptoYaInstance = axios.create({
  baseURL: "https://criptoya.com/api",
  timeout: 5000,
});

export default criptoYaInstance;
