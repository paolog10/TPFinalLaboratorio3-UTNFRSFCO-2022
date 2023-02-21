<template>
  <section id="pagina-principal">
    <div
      class="flex justify-center items-center w-screen h-screen bg-[#EFEFEF]"
    >
      <div
        class="flex flex-col justify-center items-center w-[800px] h-[500px] bg-[#5D3891] p-2 rounded-xl border border-black gap-3 shadow-lg shadow-gray-900"
      >
        <img src="../images/wallet.png" alt="wallet logo" class="w-20 h-20" />
        <h1 class="text-[50px] font-bold">@MyBitWallet</h1>

        <form
          class="flex w-full flex-col justify-center items-center gap-3"
          @submit="(e) => handledSubmit(e)"
        >
          <input
            id="id"
            class="w-full h-[50px] text-center text-3xl font-bold uppercase rounded-l"
            type="text"
            placeholder="INGRESE ID ALFANÚMERICO"
          />

          <button
            id="idButton"
            class="h-[50px] bg-[#F99417] hover:bg-orange-300 text-xl font-bold w-[120px] rounded-xl"
            type="submit"
          >
            INGRESAR
          </button>
        </form>

        <div
          class="flex justify-center items-center w-full h-[40px] bg-yellow-300/50"
          v-if="$store.state.errorAlert"
        >
          <p class="text-[30px] font-bold">El ID es incorrecto</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import Joi from "joi";
import store from "../store/index";
import router from "../router/index";
import UserService from "../services/user.service";

//objeto id alfanumerico
const schema = Joi.object({
  userId: Joi.string().alphanum().min(10).max(10).required(),
});

const flag = false;

async function handledSubmit(e) {
  e.preventDefault(); //previene el comportamiento predeterminado del formulario
  const userId = document.getElementById("id").value; //asigno a la variable userId el valor del elemento input alfanumérico

  const { error, value } = schema.validate({ userId: userId }); //igualar para validar el valor de userId

  //si el valor no es error
  if (!error) {
    store.commit("changeUserId", value.userId); //cambio el valor de id de usuario
    store.commit("changeErrorAlert", false); // desactiva la alerta de error

    const history = await UserService.getHistory(store.state.userId); // creo una variable, funcíon asíncrona getHistory obtengo el historial de usuario
    store.commit("changeUserHistory", history); //cambiar el historial de usuario
    router.push("/panel"); //me lleva al panel de la billetera

    return;
  }

  store.commit("changeErrorAlert", true); //si el valor de id no es correcto...
}
</script>
