import { type ThemeObject, defineUserConfig, type App, createPage } from 'vuepress'
import { prismjsPlugin as prismjsPluginSet } from '@vuepress/plugin-prismjs'
import { sitemapPlugin as sitemapPluginSet  } from "vuepress-plugin-sitemap2";
import { gitPlugin as gitPluginSet } from '@vuepress/plugin-git'

const prismjsPlugin = prismjsPluginSet();
const sitemapPlugin = sitemapPluginSet({
  hostname:"jjaw.cn",
  changefreq:"weekly"
});
const gitPlugin =  gitPluginSet();

const theme:ThemeObject = {
    name: 'jjaw-cn-page-theme',
}

export default defineUserConfig({
  lang: 'zh-CN',
  title: '神奇小破站',
  description: '分享有意思的东西！java web 前端 网络 vue JavaScript JS TS TypeScript css H5',
  theme:theme,
  public:"./public",
  dest:"./dist",
  pagePatterns:[
    "./articles/**/*.md"
  ],
  plugins:[prismjsPlugin,sitemapPlugin,gitPlugin],
  async onInitialized(app:App){
    app.pages.push(await createPage(app,{path:"/",frontmatter:{layout:"HomePage"}}));
  }
})