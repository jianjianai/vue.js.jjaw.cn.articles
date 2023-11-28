<script setup lang="ts">
const props = defineProps<{
    title?:String
}>();

</script>
<template>
    <div class="tips">
        <p v-if="props.title" class="title">{{ props.title }}</p>
        <div class="tips-body">
            <slot></slot>
        </div>
    </div>
</template>
<style scoped>
.title{
    font-weight: bolder;
    color: green;
}
.tips{
    background-color: rgba(0, 128, 0, 0.075);
    border-radius: 0.5rem;
    padding: 1rem;
    margin-bottom: 1.2rem;
}
</style>