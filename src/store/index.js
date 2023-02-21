import { createStore } from "vuex";

//creamos la store
const store = createStore({
  //variables
  state() {
    return {
      userId: "",
      errorAlert: false,
      userHistory: [],
      topCryptos: [],
    };
  },

  mutations: {
    //metodos
    changeUserId(state, value) {
      state.userId = value;
    },
    changeErrorAlert(state, value) {
      state.errorAlert = value;
    },
    changeUserHistory(state, value) {
      state.userHistory = value;
    },
    changeTopCrypto(state, value) {
      state.topCryptos = value;
    },
  },
});

export default store;
