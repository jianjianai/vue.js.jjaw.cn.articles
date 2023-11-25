<template>
    <div class="page2">
        <h3 class="page2-title">猜你想看</h3>
        <div class="page2-time">
            <a href="/2023/11/25/csswriting/">
                <h4>首页同款 纯css拼音打字效果</h4>
                <p>
                    纯css实现拼音打字效果详解。
                    全网最简单,10分钟不到秒懂!
                    任意字符排列排列组合。
                </p>
            </a>
        </div>
        <div class="page2-time">
            <a href="./editor.html">
                <h4>小破站makerdown编辑器</h4>
                <p>
                    基于Editor.md的Makerdown编辑器，
                    可以随时随地，方便地在本站编辑和预览文章。
                </p>
            </a>
        </div>
    </div>
</template>
<style scoped>
.page2-time h4 {
    font-size: 1.5rem;
    margin-bottom: 0.5rem;
}

.page2-time>a:hover {
    color: var(--color-link);
}

.page2-time>a {
    color: var(--color);
    text-decoration: none;
}

.page2-time p {
    font-size: 1.2rem;
    opacity: 0.8;
}

.page2-time {
    padding-bottom: 1rem;
    border-bottom: 0.1rem solid var(--border-color);
    width: 20rem;
    margin: 2rem;
}

.page2-title {
    text-align: center;
    width: 100%;
    font-size: 2rem;
}

.page2 {
    padding-top: 2rem;
    padding-bottom: 2rem;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-evenly;
    align-content: flex-start;
    align-items: stretch;
    border-bottom: 0.1rem solid var(--border-color);
}

@media(max-width: 790px) {
    .page2 {
        display: flex;
        flex-direction: column;
        flex-wrap: nowrap;
        justify-content: flex-start;
        align-items: stretch;
    }

    .page2-time {
        width: auto;
        margin: 2rem;
    }
}
</style>