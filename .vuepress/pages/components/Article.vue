<!-- 用于显示文章的组件 -->
<script lang="ts" setup>
import 'github-markdown-css'
import { usePageFrontmatter } from "@vuepress/client"
import { type Ref, ref } from "vue";

const props = defineProps<{
  topHeight?: number,//导航栏高度，用于文章内容导航浮动高度
}>();

const frontmatter = usePageFrontmatter();

const navFilter: Ref<{ h: string, id: string }[]> = ref([]);


</script>

<template>
  <div class="page">
    <div class="arite">
      <div class="heard" v-if="frontmatter.title || frontmatter.description">
        <div class="title" v-if="frontmatter.title">{{ frontmatter.title }}</div>
        <div class="description" v-if="frontmatter.description">{{ frontmatter.description }}</div>
      </div>
      <article>
        <Content class="markdown-body" />
      </article>
    </div>
    <div class="nav-div">
      <div class="nav-body">
        <div class="nav-title">目录</div>
        <nav>
          <ul>
            <li v-for="{ id, h } of navFilter" :class="h">
              <NuxtLink :to="`#${id}`">{{ id }}</NuxtLink>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  </div>
</template>
<style scoped>
/* 文章内容导航 */
.nav-body nav {
  padding: 1rem;
}

.nav-body ul li a {
  color: var(--color);
  text-decoration: none;
}

.nav-body ul li a:hover {
  color: var(--color-time1);
}

li.h1 {
  font-size: 1.4rem;
  font-weight: bolder;
  margin-left: 0rem;
  border-bottom: 0.1rem solid var(--border-color);
  list-style: none;
}

li.h2 {
  font-size: 1.3rem;
  font-weight: bolder;
  margin-left: 1rem;
}

li.h3 {
  font-size: 1.2rem;
  font-weight: normal;
  margin-left: 1.5rem;
}

li.h4 {
  font-size: 1rem;
  font-weight: normal;
  margin-left: 2rem;
}

li.h5 {
  margin-left: 2.5rem;
}

li.h6 {
  margin-left: 3rem;
}



.nav-title {
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  font-size: 1.2rem;
  font-weight: bold;
  text-align: center;
  background-color: var(--background-color1);
}

.nav-div {
  width: 16rem;
  margin-right: 1rem;
}

.nav-body {
  border: 0.1rem solid var(--border-color);
  top: calc(v-bind("`${props.topHeight}px`") + 1rem);
  position: sticky;
  /* background-color: var(--background-color); */
  margin-top: 1rem;
  min-height: 15rem;
  overflow: hidden;
}

/* 文章 */
.title {
  font-size: 1.7rem;
  font-weight: bolder;
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
}

.description {
  font-size: 1rem;
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
}

.heard {
  text-align: center;
  padding: 0.5rem;
}

.heard,
article {
  /* background-color: var(--background-color); */
  margin-top: 1rem;
  overflow: hidden;
  border: 0.1rem solid var(--border-color);
}

.heard,
article,
.nav-body {
  border-radius: 0.5rem;
}

.arite {
  width: 100%;
  flex: 1;
  padding-left: 1rem;
  padding-right: 1rem;
  overflow: hidden;
  max-width: 880px;
}

.page {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: center;
  margin-bottom: 2rem;
}

@media (max-width: 1100px) {
  .nav-div {
    width: 100%;
    flex: 1;
  }

  .arite {
    width: 100%;
    flex: 3;
  }
}

@media (max-width: 880px) {
  .nav-div {
    display: none;
  }

  .arite {
    width: 100%;
    flex: 1;
  }
}

@media (max-width: 720px) {
  .arite {
    padding-left: 0;
    padding-right: 0;
  }

  .heard {
    margin-top: 0;
  }

  .heard {
    border-bottom: 0.1rem solid var(--border-color);
  }
}
</style>
<style>
.markdown-body {
  margin: 1.5rem;
  width: calc(100% - 3rem);
  overflow: hidden;
  box-sizing: border-box;
}

.markdown-body a.header-anchor {
  display: inline-block;
  width: 0;
  position: relative;
  top: calc(0px - var(--nav-height) - 1rem);
  opacity: 0;
  z-index: -99;
  height: 1em;
}

@media (prefers-color-scheme: dark) {

  .markdown-body pre code,
  .markdown-body pre tt {
    color: rgb(0, 0, 0);
    filter: invert(1) hue-rotate(180deg);
  }
}
</style>