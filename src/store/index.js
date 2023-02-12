import { createStore } from "vuex";

const store = createStore({
    state() {
        return {
            userId: "hola",
            errorAlert: false,
            userHistory: []
        }
    },
    mutations: {
        changeUserId(state, value){
            state.userId = value;
        },
        changeErrorAlert(state, value){
            state.errorAlert = value;
        },
        changeUserHistory (state, value) {
            state.userHistory = value;
        }
    }
});

export default store;