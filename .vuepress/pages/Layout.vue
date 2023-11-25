<script setup lang="ts">
import "../assets/main.css"
import { ref } from "vue";
import Article from './components/Article.vue';
import Header from './components/Header.vue';

const topHeight = ref();
</script>
<template>
    <Header :is-auto-hide="true" :is-top-ppacity="true" @top-height-change="topHeight=$event"></Header>
    <Article :top-height="topHeight"></Article>
</template>