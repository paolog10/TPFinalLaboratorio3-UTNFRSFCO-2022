<template>
    <div>
        <h1>Contador: {{this.$store.state.count}}</h1>
        <button @click="handleClickButtom()">CLICK PARA SUMAR</button>
    </div>
</template>

<script setup>
import store from '../store';

const handleClickButtom = () => {
    store.commit('increment')
};
</script>