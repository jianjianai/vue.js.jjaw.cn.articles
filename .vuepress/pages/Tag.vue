<script setup lang="ts">
import Header from './components/Header.vue';
import { usePageFrontmatter } from "@vuepress/client";
import { useBlogCategory } from "vuepress-plugin-blog2/client";
import type { MyPageFrontmatter, MyBlogInfo } from "./types";
import { type Ref, computed } from "vue";
import { dateFormat } from "./composables/Time";
const categoryMap = useBlogCategory()

const frontmatter = usePageFrontmatter() as Ref<MyPageFrontmatter>;
const tiemF = (tiem: number) => dateFormat(new Date(tiem), (Y, M, D, h, m) => `${Y}-${M}-${D} ${h}:${m}`);
const tagName = computed(() => {
    if (!frontmatter.value.blog || !frontmatter.value.blog.name) {
        return undefined;
    }
    return frontmatter.value.blog.name;
})
const tagsMap = computed(() => {
    if (!tagName.value) {
        if (!categoryMap.value.map) {
            return {};
        }
        return categoryMap.value.map;
    }
    let obj = {};
    obj[tagName.value] = categoryMap.value.map[tagName.value];
    return obj;
}) as Ref<{ [key: string]: { path: string, items: { info: MyBlogInfo, path: string }[] } }>;


</script>

<template>
    <Header :is-auto-hide="true"></Header>
    <div>
        <div v-for="{ path, items }, key of tagsMap" class="tags">
            <RouterLink :to="path" v-if="key != tagName" class="tag-title">{{ key }}</RouterLink>
            <div v-for="{ info } of items" class="time">
                <RouterLink :to="{ name: info.key }">
                    <h4>{{ info.title }}</h4>
                    <div v-if="info.git && (info.git.updatedTime || info.git.commitMaxPerson)" class="tiem-person">
                        <span v-if="info.git.commitMaxPerson" class="person">{{ info.git.commitMaxPerson.name }}</span>
                        <span v-if="info.git.updatedTime">{{ tiemF(info.git.updatedTime) }}</span>
                    </div>
                    <p v-if="info.description">{{ info.description }}</p>
                </RouterLink>
            </div>
        </div>
    </div>
</template>
<style scoped>
.tag-title {
    text-align: center;
    width: 100%;
    font-size: 2rem;
    color: var(--color);
    text-decoration: none;
    font-weight: bolder;
}
.tag-title:hover{
    color: var(--color-link);
}

.tiem-person {
    margin-bottom: 0.4rem;
    font-size: 0.9rem;
}

.person {
    font-weight: bolder;
    margin-right: 0.5rem;
}

.time h4 {
    font-size: 1.5rem;
    margin-bottom: 0.5rem;
}

.time>a:hover {
    color: var(--color-link);
}

.time>a {
    color: var(--color);
    text-decoration: none;
}

.time p {
    font-size: 1.2rem;
    opacity: 0.8;
}

.time {
    padding: 0rem 1rem 1rem 1rem;
    border-bottom: 0.1rem solid var(--border-color);
    width: 20rem;
    margin: 2rem;
}

.title {
    text-align: center;
    width: 100%;
    font-size: 2rem;
}

.tags {
    padding-top: 2rem;
    padding-bottom: 2rem;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-evenly;
    align-content: flex-start;
    align-items: stretch;
}

@media(max-width: 790px) {
    .tags {
        display: flex;
        flex-direction: column;
        flex-wrap: nowrap;
        justify-content: flex-start;
        align-items: stretch;
    }

    .time {
        width: auto;
        margin: 2rem;
    }
}</style>