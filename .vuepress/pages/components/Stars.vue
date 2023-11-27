<script setup lang="ts">
// import { useBlogType } from "vuepress-plugin-blog2/lib/client";
import { computed } from "@vue/reactivity";
import { useBlogType } from "vuepress-plugin-blog2/client";
import { type MyBlogInfo } from "../types"
import { dateFormat } from "../composables/Time";

const tiemF = (tiem: number) => dateFormat(new Date(tiem), (Y, M, D, h, m) => `${Y}-${M}-${D} ${h}:${m}`);
const stars = useBlogType("star");
const times = computed(() => {
    if (!stars.value || !stars.value.items) {
        return undefined;
    }
    return stars.value.items.map((t) => t.info) as MyBlogInfo[];
})

</script>
<template>
    <div v-if="times" class="stars">
        <div v-for="{ git, title, key, description } in times" class="time">
            <RouterLink :to="{name:key}">
                <h4>{{ title }}</h4>
                <div v-if="git && (git.updatedTime || git.commitMaxPerson)" class="tiem-person">
                    <span v-if="git.commitMaxPerson" class="person">{{ git.commitMaxPerson.name }}</span>
                    <span v-if="git.updatedTime">{{ tiemF(git.updatedTime) }}</span>
                </div>
                <p v-if="description">{{ description }}</p>
            </RouterLink>
        </div>
    </div>
    <div v-else>
        没有任何收藏页
    </div>
</template>
<style scoped>
.tiem-person{
    margin-bottom: 0.4rem;
    font-size: 0.9rem;
}
.person{
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

.stars {
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
    .stars {
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
}
</style>
  