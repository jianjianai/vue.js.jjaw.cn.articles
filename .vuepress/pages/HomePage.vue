<script setup lang="ts">
import Header from './components/Header.vue';
import HomePage1 from './home-pages/HomePage1.vue';
import HomePage2 from './home-pages/HomePage2.vue';

</script>
<template>
    <Header :is-auto-hide="true" :is-top-ppacity="true" position="fixed"></Header>
    <HomePage1></HomePage1>
    <HomePage2></HomePage2>
</template>