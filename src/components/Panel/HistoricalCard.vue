<template>
  <section id="movimientos" class="flex flex-col">
    <div
      class="h-[50px] grid grid-cols-5 text-center font-bold border-b bg-gray-100"
    >
      <h2 class="flex justify-center items-center">Fecha alta</h2>
      <h2 class="flex justify-center items-center">Monto $ARS</h2>
      <h2 class="flex justify-center items-center">Compra/Venta</h2>
      <h2 class="flex justify-center items-center">Cantidad monedas</h2>
      <h2 class="flex justify-center items-center">Tipo criptomoneda</h2>
    </div>
    <div
      class="flex flex-col overflow-y-scroll"
      v-if="store.state.userHistory.length >= 1"
    >
      <div
        class="grid grid-cols-5 text-center min-h-[60px] border-b bg-white"
        v-for="elem in store.state.userHistory"
      >
        <p class="flex justify-center items-center border-r">
          {{ elem.datetime }}
        </p>
        <p class="flex justify-center items-center border-r">
          $ {{ elem.money }}
        </p>
        <p class="flex justify-center items-center border-r">
          {{ elem.action == "purchase" ? "Compra" : "Venta" }}
        </p>
        <p class="flex justify-center items-center border-r">
          {{ elem.crypto_amount }}
        </p>
        <p class="flex justify-center items-center">
          {{ elem.crypto_code.toUpperCase() }}
        </p>
      </div>
    </div>
    <div v-if="store.state.userHistory.length == 0">
      <div
        v-for="elem in [1, 2, 3, 4, 5]"
        class="grid grid-cols-2 text-center min-h-[50px] border-b bg-white"
      >
        <div class="bg-gray-200 mx-3 my-4 animate-pulse" />
        <div class="bg-gray-200 mx-3 my-4 animate-pulse" />
      </div>
    </div>
  </section>
</template>

<script setup>
import store from "../../store";
</script>
