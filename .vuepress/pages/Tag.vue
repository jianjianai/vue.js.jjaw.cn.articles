<script setup lang="ts">
import { usePageFrontmatter } from "@vuepress/client";
import { useBlogCategory } from "vuepress-plugin-blog2/client";
const categoryMap = useBlogCategory()
const frontmatter = usePageFrontmatter();


// console.log(categoryMap.value);
</script>

<template>
    标签
</template>