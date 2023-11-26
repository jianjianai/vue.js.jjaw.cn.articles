<!-- 评论区组件 -->
<script setup lang="ts">
import { usePageFrontmatter } from '@vuepress/client';
import { Ref } from 'vue';
import { MyPageFrontmatter } from '../types';
import Giscus from '@giscus/vue';

const frontmatter = usePageFrontmatter() as Ref<MyPageFrontmatter>;
</script>
<template>
    <template v-if="frontmatter.comment">
        <div class="comment-body">
            <div class="title">评论区</div>
            <Giscus class="comment" repo="jianjianai/vue.js.jjaw.cn.articles" repo-id="R_kgDOKsd6yQ"
                data-category="vue.js.jjaw.cn.articles" category-id="DIC_kwDOKsd6yc4CbRMH" mapping="pathname" strict="0"
                reactions-enabled="1" emit-metadata="1" input-position="bottom" theme="preferred_color_scheme" lang="zh-CN"
                loading="eager" crossorigin="anonymous" />
        </div>
    </template>
</template>
<style scoped>
.comment {
    display: inline-block;
    margin: auto;
    width: calc(100% - 2rem);
    padding: 1rem;
    padding-top: 2rem;
}
.comment-body{
    /* background-color: var(--background-color); */
    margin-top: 1rem;
    overflow: hidden;
    border: 0.1rem solid var(--border-color);
    border-radius: 0.5rem;
}

.title {
    padding: 0.5rem 0.8rem;
    font-size: 1rem;
    font-weight: bold;
    background-color: var(--background-color1);
}
</style>