<template>
  <section id="nueva-compra">
    <div
      class="flex justify-end items-center flex-col w-full h-[50vh] bg-gradient-to-r from-[#f76a1a] to-[#ffa639]"
    >
      <div class="flex flex-col justify-center items-center w-[70%] h-[30%]">
        <h1 class="font-bold text-[50px] select-none text-black">Compra</h1>
      </div>
      <div class="flex justify-center items-center w-[70%] h-[35%] gap-[40px]">
        <div
          class="flex flex-col justify-center items-center w-[30%] h-[45%] bg-white rounded-lg shadow-sm shadow-gray-500"
        >
          <div class="w-full text-sm pl-2">Cryptomoneda a comprar</div>
          <form class="flex outline-none pl-2">
            <input
              id="criptoMoney"
              type="string"
              class="w-[60%] text-center outline-none"
              placeholder="Cantidad a comprar"
              @change="(e) => handlerChangeCryptoCount(e)"
            />
            <select
              class="w-[40%] text-center"
              @change="(e) => handlerChangeSelectCripto(e)"
            >
              <option value="">-</option>
              <option
                v-for="elem in $store.state.topCryptos"
                :value="elem.symbol"
              >
                <p>{{ elem.name }}</p>
              </option>
            </select>
          </form>
        </div>

        <div
          class="flex flex-col w-[20%] h-[45%] bg-white rounded-lg shadow-sm shadow-gray-500"
        >
          <div class="text-sm pl-2">Tú pagas</div>
          <div class="flex justify-center items-center w-full h-full">
            <p>
              {{ store.state.convertedMoney }}
            </p>
          </div>
        </div>

        <div
          class="flex flex-col justify-center items-center w-[20%] h-[45%] bg-white rounded-lg shadow-sm shadow-gray-500"
        >
          <div class="w-full text-sm pl-2">Día de compra</div>
          <input id="diaCompra" type="date" class="pl-2" required />
        </div>

        <div
          class="flex justify-center items-center w-[20%] h-[45%] bg-white rounded-xl rounded-lg shadow-sm shadow-gray-500"
        >
          <button @click="($event) => handlerSubmit()">Comprar Ahora</button>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import Joi, { date } from "joi";
import userService from "../../services/user.service";
import store from "../../store";

function handlerSubmit() {
  //agarramos los valores de los inputs
  let dayPurchase = document.getElementById("diaCompra").value;
  dayPurchase = {
    day: new Date(dayPurchase).getDate(),
    month: new Date(dayPurchase).getMonth(),
    year: new Date(dayPurchase).getFullYear(),
    hour: new Date(dayPurchase).getHours(),
    minute: new Date(dayPurchase).getMinutes(),
  };
  const criptoMoneyCount = store.state.criptoCount;
  const criptoMoneyType = store.state.criptoSelected;
  const criptoMoneyToPay = store.state.convertedMoney.replace("$ ", "").trim();

  const validObject = Joi.object({
    type: Joi.string().required(),
    amount: Joi.number().min(0).max(Number.MAX_VALUE).required(),
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
    date: dayPurchase,
    money: criptoMoneyToPay,
  });
  if (error) {
    let keyError = error.message.match(/"(\\.|[^"\\])*"/g);
    const errorsToRender = {
      amount: "La cantidad de criptomonedas ingresadas no son válidas",
      date: "El dia ingresado es inválido o nulo.",
      type: "Se debe seleccionar un tipo de criptomoneda a comprar",
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
  } else if (value.amount === 0) {
    alert("La cantidad de criptomonedas ingresadas no son validas.");
    return;
  }

  userService
    .createPurchase({
      user_id: store.state.userId,
      action: "purchase",
      crypto_code: value.type,
      crypto_amount: value.amount,
      money: value.money,
      datetime: `${value.date.day}-${value.date.month + 1}-${value.date.year} ${
        value.date.hour
      }:${value.date.minute}`,
    })
    .then(() => {
      userService.getHistory(store.state.userId).then((history) => {
        store.commit("changeUserHistory", history);
      });
    }); //se cumple promesa

  alert("Compra de criptomoneda correcta");
}

function handlerChangeCryptoCount(event) {
  store.commit("changeCriptoCount", event.target.value);
}

function handlerChangeSelectCripto(event) {
  store.commit("changeCriptoSelected", event.target.value);
}
</script>
