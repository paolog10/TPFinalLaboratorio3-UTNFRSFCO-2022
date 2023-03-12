<template>
  <section id="estadoActual" class="flex flex-col">
    <div
      class="h-[50px] grid grid-cols-3 text-center font-bold border-b bg-gray-100"
    >
      <h2 class="flex justify-center items-center">Criptomoneda</h2>
      <h2 class="flex justify-center items-center">Cantidad</h2>
      <h2 class="flex justify-center items-center">Total $ARS</h2>
    </div>
    <div
      class="flex flex-col overflow-y-scroll"
      :class="Object.keys(store.state.actualState).length >= 1"
    >
      <div
        class="grid grid-cols-3 text-center min-h-[50px] border-b bg-white"
        v-for="elem in store.state.actualState"
      >
        <p class="flex justify-center items-center border-r">
          {{ elem.name.toUpperCase() }}
        </p>
        <p class="flex justify-center items-center border-r">
          {{ elem.amount }}
        </p>
        <p class="flex justify-center items-center">
          $
          {{
            elem.amount *
            store.state.topCryptos.find((v) => v.symbol == elem.name)
              .current_price_ars[0].bid
          }}
        </p>
      </div>
    </div>
    <div v-if="Object.keys(store.state.actualState).length == 0">
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
