<template>
  
  <header id="header" class="sticky top-0 px-2 bg-[#EFEFEF]">
    <ul class="flex">
      <li class="mx-4 my-2 font-bold"><a href="#nueva-compra">Nueva compra</a></li>
      <li class="mx-4 my-2 font-bold"><a href="#nueva-venta">Nueva venta</a></li>
      <li class="mx-4 my-2 font-bold"><a href="#movimientos">Movimientos</a></li>
      <li class="mx-4 my-2 font-bold"><a href="#analisis">Análisis</a></li>
    </ul>  
  </header>

  <section>
    <div class="flex justify-center items-center w-full h-[80vh] bg-gradient-to-r from-[#f76a1a] to-[#ffa639]">
      <div class="grid grid-cols-5 grid-rows-2 bg-[#ffa639] h-[65%] w-[70%] gap-1">
        <div class="flex flex-col justify-center items-center gap-1 bg-[#5D3891]"
          v-for="elem in $store.state.topCryptos">
            <h1 class="font-bold text-xl">{{ elem.name }}</h1>
            <img :src="elem.image" alt="imageMoney" class="h-[30%] w-[30%]">
            <p class="text-xl">U$D {{ elem.current_price }}</p>
            <p>{{ elem.price_change_percentage_24h }} %</p>
        </div>
      </div>
    </div>

    <div id="nueva-compra" class="flex justify-center items-center flex-col w-full h-[50vh] bg-gradient-to-r from-[#f76a1a] to-[#ffa639]">
      <div class="flex flex-col justify-center items-center w-[70%] h-[30%]"> 
        <h1 class="font-bold text-[40px]"><a href="https://www.sanfrancisco.utn.edu.ar/">Bitcoin con tarjeta de crédito</a></h1>
        <p class="font-bold text-m">Ahora puede comprar cualquier criptomoneda al instante con tarjeta de crédito</p>
      </div>
      <div class="flex justify-center items-center w-[70%] h-[35%] gap-[40px]"> 
        <div class="w-[20%] h-[45%] bg-white">
          <div class="text-sm pl-2">Cryptomoneda a comprar</div>
          <form class="outline-none pl-2">
            <select>
              <option v-for="elem in $store.state.topCryptos">{{ elem.symbol }}</option>
            </select>
          </form>
        </div>
        
        <div class="w-[20%] h-[45%] bg-white">
          <div class="text-sm pl-2">tu pagas</div>
          <input class="pl-2 outline-none" placeholder="$ 100">
        </div>

        <div class="w-[20%] h-[45%] bg-white">
          <div class="text-sm pl-2">Día de compra</div>
          <input type="date" class="pl-2 outline-none" placeholder="$ 100">
        </div>

        <div class="flex justify-center items-center w-[20%] h-[45%] bg-white rounded-xl">
          <button>Comprar Ahora</button>
        </div>
      </div>
    </div>
  </section>
  
</template>

<script setup>
  import CryptoService from "../services/Crypto.service"
  import store from "../store/index"

  
  CryptoService.getCrypto();
  function storeValue() {
    console.log(store.state.topCryptos);
  }


</script>