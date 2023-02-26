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
      convertedMoney: "",
      criptoSelected: "",
      criptoCount: "",
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
    changeConvertedMoney(state) {
      if (state.criptoSelected === "okb") {
        state.convertedMoney= "Fuera de servicio"
      }
      else if(state.criptoCount !== "" && state.criptoSelected !== "") {
        const valueCripto = state.topCryptos.find(function (v) {
          return v.symbol == state.criptoSelected;
        });
        state.convertedMoney = `$ ${
          Number(state.criptoCount) *
          Number(valueCripto.current_price_ars[0].ask)
        } `;
      }
    },
    changeCriptoSelected(state, value) {
      state.criptoSelected = value;
      store.commit("changeConvertedMoney");
    },
    changeCriptoCount(state, value) {
      state.criptoCount = value;
      store.commit("changeConvertedMoney");
    },
  },
});

export default store;
