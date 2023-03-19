<template>
  <section>
    <div
      class="flex justify-start items-center flex-col w-full h-[50vh] bg-gradient-to-r from-[#f76a1a] to-[#ffa639]"
    >
      <h2 class="font-bold text-[50px] select-none text-black">Venta</h2>
      <div class="flex justify-center items-center w-[70%] h-[35%] gap-[40px]">
        <div
          class="flex flex-col justify-center items-center w-[30%] h-[45%] bg-white rounded-lg shadow-sm shadow-gray-500"
        >
          <div class="w-full text-sm pl-2">Cryptomoneda a vender</div>
          <form class="flex outline-none pl-2">
            <input
              id="criptoMoneySale"
              type="number"
              class="w-[60%] text-center outline-none"
              placeholder="Cantidad a vender"
              @change="(e) => handlerChangeCryptoCountSale(e)"
            />

            <select
              class="w-[40%] text-center"
              @change="(e) => handlerChangeSelectCriptoSale(e)"
            >
              <option value="">-</option>
              <option
                v-for="elem in store.state.topCryptos"
                :value="elem.symbol"
              >
                <p>{{ elem.name }}</p>
              </option>
            </select>
          </form>
        </div>

        <div
          class="flex flex-col justify-center items-center w-[20%] h-[45%] bg-white rounded-lg shadow-sm shadow-gray-500"
        >
          <div class="w-full text-sm pl-2">En la billetera tienes</div>
          <p>{{ store.state.criptoSaved }}</p>
        </div>

        <div
          class="flex flex-col w-[20%] h-[45%] bg-white rounded-lg shadow-sm shadow-gray-500"
        >
          <div class="text-sm pl-2">Tú vendes</div>
          <div class="flex justify-center items-center w-full h-full">
            <p>
              {{ store.state.convertedMoneySale }}
            </p>
          </div>
        </div>

        <div
          class="flex flex-col justify-center items-center w-[20%] h-[45%] bg-white rounded-lg shadow-sm shadow-gray-500"
        >
          <div class="w-full text-sm pl-2">Día de venta</div>
          <input id="diaVenta" type="date" class="pl-2" required />
        </div>

        <div
          class="flex justify-center items-center w-[20%] h-[45%] bg-white rounded-xl rounded-lg shadow-sm shadow-gray-500"
        >
          <button @click="($event) => handlerSubmitSale()">Vender Ahora</button>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import Joi from "joi";
import userService from "../../services/user.service";
import store from "../../store";

function handlerSubmitSale() {
  let daySale = document.getElementById("diaVenta").value;
  daySale = {
    day: new Date(daySale).getDate(),
    month: new Date(daySale).getMonth(),
    year: new Date(daySale).getFullYear(),
    hour: new Date(daySale).getHours(),
    minute: new Date(daySale).getMinutes(),
  };
  const criptoMoneyCount = store.state.criptoCountSale;
  const criptoMoneyType = store.state.criptoSelectedSale;
  const criptoMoneyToPay = store.state.convertedMoneySale
    .replace("$ ", "")
    .trim();

  const validObject = Joi.object({
    type: Joi.string().required(),
    amount: Joi.number().min(0).max(Number.MAX_VALUE).required(), //cantidad de monedas que hay de esa cripto en la billetera
    date: Joi.object({
      day: Joi.number().min(0).max(31).required(),
      month: Joi.number().min(0).max(12).required(),
      year: Joi.number().min(2023).max(2023).required(),
      hour: Joi.number().min(0).max(23).required(),
      minute: Joi.number().min(0).max(59).required(),
    }),
    money: Joi.number().min(0).max(Number.MAX_VALUE).required(),
  });

  const { error, value } = validObject.validate({
    type: criptoMoneyType,
    amount: criptoMoneyCount,
    date: daySale,
    money: criptoMoneyToPay,
  });

  if (error) {
    let keyError = error.message.match(/"(\\.|[^"\\])*"/g);
    const errorsToRender = {
      amount: "La cantidad de criptomonedas ingresadas no son válidas",
      date: "El dia ingresado es inválido o nulo.",
      type: "Se debe seleccionar un tipo de criptomoneda a vender",
      money: "La cantidad de dinero a pagar es inválida",
      default: "Ah ocurrido un error, intentelo mas tarde",
    }; // Objecto-lista de todos los errores admitidos

    if (keyError) {
      keyError = keyError.toString().replace(/"/g, "").split(".")[0]; // Separo la key del error de todo el mensaje.
      alert(errorsToRender[keyError] || errorsToRender["default"]);
      return;
    }
    alert(errorsToRender["default"]); // error default por si todo falla
    return;
  } else if (value.amount > store.state.criptoSaved) {
    alert("No se puede vender mas de lo que hay en la billetera");
    return;
  } else if (value.amount === 0) {
    alert("La cantidad de criptomonedas ingresadas no son validas.");
    return;
  }

  userService
    .createSale({
      user_id: store.state.userId,
      action: "sale",
      crypto_code: criptoMoneyType,
      crypto_amount: criptoMoneyCount,
      money: criptoMoneyToPay,
      datetime: `${daySale.day}-${daySale.month + 1}-${daySale.year} ${
        daySale.hour
      }:${daySale.minute}`,
    })
    .then(() => {
      userService.getHistory(store.state.userId).then((history) => {
        store.commit("changeUserHistory", history);
      });
      alert("Venta de criptomoneda correcta");
    });
}

function handlerChangeCryptoCountSale(event) {
  store.commit("changeCriptoCountSale", event.target.value);
}

function handlerChangeSelectCriptoSale(event) {
  store.commit("changeCriptoSelectedSale", event.target.value);
  store.commit("changeCriptoSaved", event.target.value);
}
</script>
