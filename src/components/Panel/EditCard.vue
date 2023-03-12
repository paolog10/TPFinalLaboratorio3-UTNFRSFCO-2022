<template>
  <section>
    <div
      class="flex justify-center items-center flex-col w-full h-[100vh] gap-3 bg-gradient-to-r from-[#f76a1a] to-[#ffa639]"
    >
      <h2 class="font-bold text-[50px]">Editar Cartera</h2>
      <div class="flex justify-start items-center flex-col overflow-y-scroll">
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
              <th scope="col" class="px-6 py-3">Acciones</th>
            </tr>
          </thead>
          <tbody class="">
            <tr
              class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 text-center"
              v-for="elem in store.state.userHistory"
            >
              <td class="px-6 py-4">{{ elem.datetime }}</td>
              <td class="px-6 py-4">{{ elem.money }}</td>
              <td class="px-6 py-4">
                {{ elem.action == "purchase" ? "Compra" : "Venta" }}
              </td>
              <td class="px-6 py-4">{{ elem.crypto_amount }}</td>
              <td class="px-6 py-4">{{ elem.crypto_code.toUpperCase() }}</td>
              <td class="grid grid-cols-2 px-6 py-4 gap-2">
                <button class="flex justify-center items-center bg-green-500">
                  <p
                    class="hover:bg-black-500 text-black font-semibold hover:text-white py-2 px-6 border border-[#5D3891] hover:border-transparent rounded"
                    @click="(e) => handlerChangeEditID(elem._id)"
                  >
                    Editar
                  </p>
                </button>
                <button
                  class="flex justify-center items-center bg-red-500"
                  @click="(e) => handlerDelete(elem._id)"
                >
                  <p
                    class="hover:bg-black-500 text-black font-semibold hover:text-white py-2 px-4 border border-[#5D3891] hover:border-transparent rounded"
                  >
                    Eliminar
                  </p>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div
        v-if="store.state.editID"
        class="w-[40%] h-[260px] bg-white rounded-xl"
      >
        <p class="flex justify-center items-center text-black font-semibold">
          Usted está editando el registro {{ store.state.editID }}
        </p>
        <div class="flex justify-center items-center">
          <form @submit="(e) => handlerEdit(e)">
            <input
              type="text"
              id="mount"
              placeholder="Cantidad de Criptomonedas"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 m-2"
            />
            <input
              type="text"
              id="money"
              placeholder="Cantidad de $ARS"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 m-2"
            />
            <select
              id="type"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 m-2"
            >
              <option value="">Selecciona una cripto</option>
              <option
                v-for="elem in store.state.topCryptos"
                :value="elem.symbol"
              >
                <p>{{ elem.name }}</p>
              </option>
            </select>
            <div class="flex justify-center items-center">
              <button
                class="flex justify-center items-center bg-green-500 hover:bg-black-500 text-black font-semibold hover:text-white py-2 px-4 border border-[#5D3891] hover:border-transparent rounded m-2"
              >
                Editar
              </button>
              <button
                class="flex justify-center items-center bg-none hover:bg-black-500 text-black font-semibold py-2 px-4 border border-[#5D3891] rounded m-2" @click="() => Cancel()"
              >
                Cancelar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import userService from "../../services/user.service";
import store from "../../store";

const handlerDelete = (id) => {
  const flag = confirm(
    `¿Esta seguro que quiere eliminar el registro id: ${id}?`
  );

  if (flag) {
    userService.deleteHistory(id).then(() => {
      userService.getHistory(store.state.userId).then((history) => {
        store.commit("changeUserHistory", history);
      });
    });
    alert(`¡Registro id: ${id} borrado correctamente!`);
  }
};

const handlerEdit = (e) => {
  e.preventDefault();
  const payload = {
    money: e.target.money.value ? e.target.money.value : undefined,
    crypto_amount: e.target.mount.value ? e.target.mount.value : undefined,
    crypto_code: e.target.type.value ? e.target.type.value : undefined,
  };
  const id = store.state.editID;
  userService.editHistory(id, payload).then(() => {
    store.commit("changeEditID", "");
    userService.getHistory(store.state.userId).then((history) => {
      store.commit("changeUserHistory", history);
    });
  });
};

const handlerChangeEditID = (id) => {
  const flag = confirm(`¿Esta seguro que quiere editar el pedido id: ${id}?`);
  if (flag) store.commit("changeEditID", id);
};

function Cancel()
{
  confirm("Cancelar la edición?");
}
</script>
