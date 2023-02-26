<template>
  <header id="header" class="flex sticky top-0 px-2 bg-[#EFEFEF] h-[3rem]">
    <ul class="flex items-center w-[80%]">
      <li class="mx-4 my-2 font-bold">
        <a href="#principales-cryptomonedas">Principales Cryptomonedas</a>
      </li>
      <li class="mx-4 my-2 font-bold">
        <a href="#nueva-compra">Nueva compra</a>
      </li>
      <li class="mx-4 my-2 font-bold">
        <a href="#nueva-venta">Nueva venta</a>
      </li>
      <li class="mx-4 my-2 font-bold">
        <a href="#movimientos">Movimientos</a>
      </li>
    </ul>
    <div class="flex justify-end items-center w-[20%] gap-3">
      <!--https://www.softzone.es/app/uploads/2018/04/guest.png-->
      <img
        src="../images/userLog.webp"
        alt="user photo"
        class="rounded-full h-[2rem]"
      />
      <p class="font-semibold pr-3">
        {{ $store.state.userId.toUpperCase() || "- - -" }}
      </p>
    </div>
  </header>

  <section id="principales-cryptomonedas">
    <div
      class="flex justify-center items-center w-full h-[80vh] bg-gradient-to-r from-[#f76a1a] to-[#ffa639]"
    >
      <div class="grid grid-cols-5 grid-rows-2 h-[65%] w-[70%] gap-1">
        <div
          class="flex flex-col justify-center items-center gap-1 bg-[#5D3891] rounded border border-gray-700"
          v-for="elem in $store.state.topCryptos"
          v-if="$store.state.topCryptos"
        >
          <h1 class="font-bold text-xl">{{ elem.name }}</h1>
          <img :src="elem.image" alt="imageMoney" class="h-[30%] w-[30%]" />
          <!--muestra precios en $ ARS-->
          <p class="text-xl">
            {{
              elem.current_price_ars[0]?.totalAsk
                ? `$ ${elem.current_price_ars[0].ask} ARS`
                : "Sin registro"
            }}
          </p>
          <p>{{ elem.price_change_percentage_24h.toFixed(2) }} %</p>
        </div>
        <!-- opción mientras se espera cargar la página - skeleton-->
        <div
          class="flex flex-col items-center gap-1 bg-[#EEEEEE] rounded animate-pulse"
          v-for="_elem in [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]"
          v-if="$store.state.topCryptos.length < 1"
        >
          <div class="flex w-[80%] h-[1.8rem] mt-4 bg-gray-300" />
          <div class="flex justify-center items-center w-[80%] h-[4rem]">
            <div class="h-[3.5rem] w-[3.5rem] rounded-full bg-gray-300" />
          </div>
        </div>
      </div>
    </div>
  </section>

  <section id="nueva-compra">
    <div
      class="flex justify-center items-center flex-col w-full h-[50vh] bg-gradient-to-r from-[#f76a1a] to-[#ffa639]"
    >
      <div class="flex flex-col justify-center items-center w-[70%] h-[30%]">
        <h1 class="font-bold text-[40px] select-none">
          <a href="https://www.sanfrancisco.utn.edu.ar/"
            >Bitcoin con tarjeta de crédito</a
          >
        </h1>
        <p class="font-bold text-m">
          Ahora puede comprar cualquier criptomoneda al instante con tarjeta de
          crédito
        </p>
      </div>
      <div class="flex justify-center items-center w-[70%] h-[35%] gap-[40px]">
        <div
          class="flex flex-col justify-center items-center w-[30%] h-[45%] bg-white"
        >
          <div class="w-full text-sm pl-2">Cryptomoneda a comprar</div>
          <form class="flex outline-none pl-2">
            <input
              id="criptoMoney"
              type="number"
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

        <div class="flex flex-col w-[20%] h-[45%] bg-white">
          <div class="text-sm pl-2">Tú pagas</div>
          <div class="flex justify-center items-center w-full h-full">
            <p>
              {{ store.state.convertedMoney }}
            </p>
          </div>
        </div>

        <div
          class="flex flex-col justify-center items-center w-[20%] h-[45%] bg-white"
        >
          <div class="w-full text-sm pl-2">Día de compra</div>
          <input id="diaCompra" type="date" class="pl-2" required />
        </div>

        <div
          class="flex justify-center items-center w-[20%] h-[45%] bg-white rounded-xl"
        >
          <button @click="($event) => handlerSubmit()">Comprar Ahora</button>
        </div>
      </div>
    </div>
  </section>

  <section id="nueva-venta">
    <div
      class="flex justify-center items-center flex-col w-full h-[50vh] bg-red-500"
    >
      <h1 class="font-bold text-[40px] select-none">Venta</h1>
    </div>
  </section>

  <section id="movimientos">
    <div
      class="flex justify-center items-center flex-col w-full h-[60vh] bg-green-500 gap-3"
    >
    <h1 class="font-bold text-[40px]">Movimientos</h1>
      <div class="flex justify-start items-center h-[30rem] flex-col h-[40vh] overflow-y-scroll">
        <table
          class="w-full text-sm text-left text-gray-500 dark:text-gray-400"
        >
          <thead
            class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 sticky top-0 text-center"
          >
            <tr>
              <th scope="col" class="px-6 py-3">Fecha Alta</th>
              <th scope="col" class="px-6 py-3">Monto $ARS</th>
              <th scope="col" class="px-6 py-3">Compra/Venta</th>
              <th scope="col" class="px-6 py-3">Cantidad Monedas</th>
              <th scope="col" class="px-6 py-3">Tipo Criptomoneda</th>
            </tr>
          </thead>
          <tbody class="">
            <tr
              class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 text-center"
              v-for="elem in $store.state.userHistory"
            >
              <td class="px-6 py-4">{{ elem.datetime }}</td>
              <td class="px-6 py-4">{{ elem.money }}</td>
              <td class="px-6 py-4">{{ elem.action == "purchase"? "Compra" : "Venta" }}</td>
              <td class="px-6 py-4">{{ elem.crypto_amount }}</td>
              <td class="px-6 py-4">{{ elem.crypto_code.toUpperCase() }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </section>
</template>

<script setup>
import router from "../router";
import CryptoService from "../services/Crypto.service";
import store from "../store/index";
import userService from "../services/user.service";

CheckUser();
CryptoService.getCrypto();

function CheckUser() {
  if (!store.state.userId) {
    router.push("/");
  }
}

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

  userService
    .createPurchase({
      user_id: store.state.userId,
      action: "purchase",
      crypto_code: criptoMoneyType,
      crypto_amount: criptoMoneyCount,
      money: criptoMoneyToPay,
      datetime: `${dayPurchase.day}-${dayPurchase.month + 1}-${
        dayPurchase.year
      } ${dayPurchase.hour}:${dayPurchase.minute}`,
    })
    .then(() => {
      userService.getHistory(store.state.userId).then((history) => {
        store.commit("changeUserHistory", history);
      });
    }); //se cumple promesa
}

function handlerChangeCryptoCount(event) {
  store.commit("changeCriptoCount", event.target.value);
}

function handlerChangeSelectCripto(event) {
  store.commit("changeCriptoSelected", event.target.value);
}
</script>
