<template>
  <header
    id="header"
    class="flex sticky top-0 px-2 bg-[#5D3891] h-[3rem] z-100"
  >
    <ul class="flex items-center w-[80%]">
      <li class="mx-4 my-2 font-bold text-white">
        <a href="#principales-cryptomonedas">Principales Criptomonedas</a>
      </li>
      <li class="mx-4 my-2 font-bold text-white">
        <a href="#compra-venta">Compra / Venta</a>
      </li>
      <li class="mx-4 my-2 font-bold text-white">
        <a href="#account">Resumen de Cuenta</a>
      </li>
      <li class="mx-4 my-2 font-bold text-white">
        <a href="#edit">Editar cartera</a>
      </li>
    </ul>
    <div class="flex justify-end items-center w-[20%] gap-3">
      <img
        src="../assets/userLog.webp"
        alt="user photo"
        class="rounded-full h-[2rem]"
      />
      <p class="font-semibold pr-3 text-white">
        {{ $store.state.userId.toUpperCase() || "- - -" }}
      </p>
    </div>
  </header>

  <section id="principales-cryptomonedas">
    <div
      class="flex flex-col justify-center items-center w-full h-[100vh] bg-gradient-to-r from-[#f76a1a] to-[#ffa639] gap-[30px]"
    >
    <h1 class="text-[50px] font-bold">Bienvenido a MyBitWallet</h1>
      <div class="grid grid-cols-5 grid-rows-2 h-[50%] w-[70%] gap-1">
        <div
          class="flex flex-col justify-center items-center gap-1 bg-[#5D3891] rounded border border-gray-700"
          v-for="elem in $store.state.topCryptos"
          v-if="$store.state.topCryptos"
        >
          <h1 class="font-bold text-xl">{{ elem.name }}</h1>
          <img :src="elem.image" alt="imageMoney" class="h-[30%] w-[30%]" />
          <!--muestra precios en $ ARS-->
          <p class="text-xl text-white">
            {{
              elem.current_price_ars[0]?.totalAsk
                ? `$ ${elem.current_price_ars[0].ask} ARS`
                : "Sin registro"
            }}
          </p>
          <p
            :class="
              elem.price_change_percentage_24h > 0
                ? 'text-green-500'
                : 'text-red-500'
            "
          >
            {{ elem.price_change_percentage_24h.toFixed(2) }} %
          </p>
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

  <div id="compra-venta">
    <BuyCard />
    <SaleCard />
  </div>

  <div id="account">
    <h2
      class="w-full text-center text-[50px] font-bold bg-gradient-to-r from-[#f76a1a] to-[#ffa639] pb-1"
    >
      Información de Cuenta
    </h2>
    <div
      class="grid grid-cols-2 grid-rows-2 w-full h-[90vh] gap-2 bg-gradient-to-r from-[#f76a1a] to-[#ffa639]"
    >
      <div class="flex p-[20px]">
        <a
          href="http://www.sanfrancisco.utn.edu.ar/"
          target="_blank"
          class="w-full h-full"
        >
          <img src="../assets/rooftop.jpg" class="w-full h-full rounded" />
        </a>
      </div>
      <HistoricalCard class="col-start-2" />
      <AnaliticCard class="row-start-2 col-start-1" />
      <StatusCard class="row-start-2 col-start-2" />
    </div>
  </div>
  <EditCard id="edit"/>
</template>

<script setup>
import router from "../router";
import CryptoService from "../services/Crypto.service";
import store from "../store/index";
import StatusCard from "../components/Panel/StatusCard.vue";
import EditCard from "../components/Panel/EditCard.vue";
import HistoricalCard from "../components/Panel/HistoricalCard.vue";
import AnaliticCard from "../components/Panel/AnaliticCard.vue";
import SaleCard from "../components/Panel/SaleCard.vue";
import BuyCard from "../components/Panel/BuyCard.vue";

CheckUser();
CryptoService.getCrypto();

function CheckUser() {
  if (!store.state.userId) {
    router.push("/");
  }
}

</script>
