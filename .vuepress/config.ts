import { type ThemeObject, defineUserConfig, type App, createPage } from 'vuepress'

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
  async onInitialized(app:App){
    app.pages.push(await createPage(app,{path:"/",frontmatter:{layout:"HomePage"}}));
  }
})