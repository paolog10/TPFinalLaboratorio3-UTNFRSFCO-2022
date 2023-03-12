<template>
  <section id="analitics" class="flex flex-col">
    <div
      class="h-[50px] grid grid-cols-2 text-center font-bold border-b bg-gray-100"
    >
      <h2 class="flex justify-center items-center">Criptomoneda</h2>
      <h2 class="flex justify-center items-center">Resultados $ARS</h2>
    </div>
    <div
      class="flex flex-col overflow-y-scroll"
      v-if="Object.keys(store.state.analiticsState).length >= 1"
    >
      <div
        class="grid grid-cols-2 text-center min-h-[50px] border-b bg-white"
        v-for="elem in store.state.analiticsState"
      >
        <p class="flex justify-center items-center border-r">
          {{ elem.name.toUpperCase() }}
        </p>
        <p class="flex justify-center items-center">
          {{
            elem.value +
              elem.amount *
                store.state.topCryptos.find((v) => v.symbol == elem.name)
                  .current_price_ars[0].bid >=
            1
              ? ` + $${
                  (elem.value +
                  elem.amount *
                    store.state.topCryptos.find((v) => v.symbol == elem.name)
                      .current_price_ars[0].bid).toFixed(2)
                }`
              : ` - $${
                  (elem.value +
                    elem.amount *
                      store.state.topCryptos.find((v) => v.symbol == elem.name)
                        .current_price_ars[0].bid).toFixed(2)*-1
                }`
          }}
        </p>
      </div>
    </div>
    <div v-if="Object.keys(store.state.analiticsState).length == 0">
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
