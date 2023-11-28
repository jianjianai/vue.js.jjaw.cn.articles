<!-- 用于显示文章的组件 -->
<script lang="ts" setup>
import 'github-markdown-css'
import { usePageFrontmatter } from "@vuepress/client"
import { type Ref, ref, onMounted, toRefs } from "vue";
import { dateFormat } from '../composables/Time';
import { useGitArticleInformations } from '../composables/ArticleInformations';
import Comment from './Comment.vue';

const props = defineProps<{
  topHeight?: number,//导航栏高度，用于文章内容导航浮动高度
}>();

const frontmatter = usePageFrontmatter();

//-------------------------------------------------------------------------------
//文章信息
const tiemF = (tiem: number) => dateFormat(new Date(tiem), (Y, M, D, h, m) => `${Y}-${M}-${D} ${h}:${m}`);
const { commitMaxPerson, createdTime, updatedTime } = useGitArticleInformations();



//-------------------------------------------------------------------------------
//目录和描点偏移
const navFilter: Ref<{ h: string, id: string,name:string }[]> = ref([]);
onMounted(() => {
  const rs: { h: string, id: string ,name:string }[] = [];
  const els = document.querySelectorAll("h1>a.header-anchor,h2>a.header-anchor,h3>a.header-anchor,h4>a.header-anchor,h5>a.header-anchor,h6>a.header-anchor");
  for (const el of els) {
    if (!el.parentElement) {
      continue;
    }
    const tagName = el.parentElement.tagName;
    const id = el.parentElement.id;
    if (!tagName || !id) {
      continue;
    }
    const newId= id+"#";
    el.id = newId;
    rs.push({ h: tagName.toLowerCase(), id: newId , name:id });
  }
  navFilter.value = rs;
});


</script>

<template>
  <div class="page">
    <div class="arite">
      <!-- 标题简介 -->
      <div class="heard" v-if="frontmatter.title || frontmatter.description">
        <div class="title" v-if="frontmatter.title">{{ frontmatter.title }}</div>
        <div class="description" v-if="frontmatter.description">{{ frontmatter.description }}</div>
      </div>
      <div class="article">
        <!-- 文章信息 -->
        <div class="article-title">
          <!-- 最多提交者和发布日期 -->
          <div>
            <span class="article-author" v-if="commitMaxPerson">{{ commitMaxPerson.name }}</span>
            <span class="article-create" v-if="createdTime">{{ tiemF(createdTime) }}</span>
          </div>
          <!-- 最后更新时间 -->
          <div>
            <span v-if="updatedTime">最后更新 {{ tiemF(updatedTime) }}</span>
          </div>
        </div>
        <!-- 文章 -->
        <article>
          <Content class="markdown-body" />
        </article>
      </div>

      <!-- 评论区 -->
      <Comment></Comment>
    </div>
    <div class="nav-div">
      <!-- 目录 -->
      <div class="nav-body">
        <div class="nav-title">目录</div>
        <nav>
          <ul>
            <li v-for="{ id, h, name } of navFilter" :class="h">
              <RouterLink :to="`#${id}`">{{ name }}</RouterLink>
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

.nav-body ul li {
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  margin-bottom: 0.5rem;
}

li.h1 {
  font-size: 1rem;
  font-weight: bolder;
  margin-left: 0rem;
  border-bottom: 0.1rem solid var(--border-color);
  list-style: none;
  padding-bottom: 0.5rem;
}

li.h2 {
  font-size: 1rem;
  font-weight: bolder;
  margin-left: 1rem;
}

li.h3 {
  font-size: 1rem;
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

.article-author {
  font-weight: bolder;
  padding-right: 0.5rem;
}

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

.article-title {
  height: 3rem;
  background-color: var(--background-color1);
  padding-left: 1rem;
  padding-right: 1rem;
  display: flex;
  flex-wrap: nowrap;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}

.heard,
.article{
  /* background-color: var(--background-color); */
  margin-top: 1rem;
  overflow: hidden;
  border: 0.1rem solid var(--border-color);
}

.heard,
.article,
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
    width: 23%;
  }

  .arite {
    width: 100%;
    flex: 1;
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

@media (max-width: 600px) {
  .article-create {
    display: none;
  }
}
</style>
<style>
.markdown-body {
  margin: 1.5rem;
  width: calc(100% - 3rem);
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

/* 代码高亮 */

.markdown-body {
  --color-pre: black;
  --color-pre-background: white;
  --color-code-background: #b3d4fc;
  --color-pre-language-background: #f5f2f0;
  --color-token-cdata: slategray;
  --color-token-punctuation: #999;
  --color-token-deleted: #905;
  --color-token-inserted: #690;
  --color-token-url: #9a6e3a;
  --color-token-keyword: #07a;
  --color-token-function: #DD4A68;
  --color-token-variable: #e90;
}

@media (prefers-color-scheme: dark) {
  .markdown-body {
    --color-pre: rgb(255, 255, 255);
    --color-pre-background: rgb(0, 0, 0);
    --color-code-background: #3c5068;
    --color-pre-language-background: #1f1f1f;
    --color-token-cdata: rgb(18, 92, 166);
    --color-token-punctuation: #b2b2b2;
    --color-token-deleted: rgb(197, 104, 155);
    --color-token-inserted: rgb(178, 212, 104);
    --color-token-url: #deb481;
    --color-token-keyword: rgb(53, 157, 202);
    --color-token-function: #eb5f7b;
    --color-token-variable: rgb(239, 176, 57);
  }
}

/**
 * prism.js default theme for JavaScript, CSS and HTML
 * Based on dabblet (http://dabblet.com)
 * @author Lea Verou
 */

code[class*="language-"],
pre[class*="language-"] {
  color: var(--color-pre);
  background: none;
  text-shadow: 0 1px var(--color-pre-background);
  text-align: left;
  word-spacing: normal;
  -moz-tab-size: 4;
  -o-tab-size: 4;
  tab-size: 4;
  -webkit-hyphens: none;
  -moz-hyphens: none;
  -ms-hyphens: none;
  hyphens: none;
}

pre[class*="language-"]::-moz-selection,
pre[class*="language-"] ::-moz-selection,
code[class*="language-"]::-moz-selection,
code[class*="language-"] ::-moz-selection {
  text-shadow: none;
  background: var(--color-code-background);
}

pre[class*="language-"]::selection,
pre[class*="language-"] ::selection,
code[class*="language-"]::selection,
code[class*="language-"] ::selection {
  text-shadow: none;
  background: var(--color-code-background);
}

@media print {

  code[class*="language-"],
  pre[class*="language-"] {
    text-shadow: none;
  }
}

/* Code blocks */
pre[class*="language-"] {
  padding: 1em;
  margin: .5em 0;
  overflow: auto;
}

:not(pre)>code[class*="language-"],
pre[class*="language-"] {
  background: var(--color-pre-language-background);
}

/* Inline code */
:not(pre)>code[class*="language-"] {
  padding: .1em;
  border-radius: .3em;
  white-space: normal;
}

.token.comment,
.token.prolog,
.token.doctype,
.token.cdata {
  color: var(--color-token-cdata);
}

.token.punctuation {
  color: var(--color-token-punctuation);
}

.token.namespace {
  opacity: .7;
}

.token.property,
.token.tag,
.token.boolean,
.token.number,
.token.constant,
.token.symbol,
.token.deleted {
  color: var(--color-token-deleted);
}

.token.selector,
.token.attr-name,
.token.string,
.token.char,
.token.builtin,
.token.inserted {
  color: var(--color-token-inserted);
}

.token.operator,
.token.entity,
.token.url,
.language-css .token.string,
.style .token.string {
  color: var(--color-token-url);
  /* This background color was intended by the author of this theme. */
  /* background: hsla(0, 0%, 100%, .5); */
}

.token.atrule,
.token.attr-value,
.token.keyword {
  color: var(--color-token-keyword);
}

.token.function,
.token.class-name {
  color: var(--color-token-function);
}

.token.regex,
.token.important,
.token.variable {
  color: var(--color-token-variable);
}

.token.important,
.token.bold {
  font-weight: bold;
}

.token.italic {
  font-style: italic;
}

.token.entity {
  cursor: help;
}
</style>