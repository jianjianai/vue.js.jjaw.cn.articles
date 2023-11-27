import { defineUserConfig, Page } from 'vuepress'
import { prismjsPlugin } from '@vuepress/plugin-prismjs'
import { sitemapPlugin } from "vuepress-plugin-sitemap2";
import { GitContributor, GitData, gitPlugin } from '@vuepress/plugin-git'
import { seoPlugin } from "vuepress-plugin-seo2";
import { blogPlugin } from "vuepress-plugin-blog2";
import { homePagePlugin } from './plugins/home-page'



//网站域名
const hostname = 'jjaw.cn'

//代码高亮
//https://v2.vuepress.vuejs.org/zh/reference/plugin/prismjs.html
const usePrismjsPlugin = prismjsPlugin();

//站点地图
//https://plugin-sitemap2.vuejs.press/zh/config.html
const useSitemapPlugin = sitemapPlugin({
  hostname,
  changefreq: "monthly"
});

//git信息
//https://v2.vuepress.vuejs.org/zh/reference/plugin/git.html
const useGitPlugin = gitPlugin();

//搜索优化
//https://plugin-seo2.vuejs.press/zh/config.html
const useSeoPlugin = seoPlugin({
  hostname,
  autoDescription: true,
  author: {
    name: "jjaw",
    url: "https://jjaw.cn/",
    email: "jjaw@jjaw.cn"
  },
  isArticle: (page: Page) => {
    if (!page.pathInferred) {
      return false;
    }
    return page.pathInferred.startsWith("/articles");
  }
});

//主页面插件
//自己瞎写的 ./plugins/home-page
const useHomePagePlugin = homePagePlugin({
  path: "/",
  frontmatter: {
    layout: "HomePage",
    description:"分享有意思的东西！java web 前端 网络 vue JavaScript JS TS TypeScript css H5"
  }
});

//文章分类和标签
//https://plugin-blog2.vuejs.press/zh/config.html
const useBlogPlugin = blogPlugin({
  getInfo(page) {
    const getGitInfo = () => {
      const git = page.data.git as GitData | undefined;
      if (!git) {
        return undefined;
      }
      let commitMaxPerson: GitContributor | undefined = undefined;
      if (git.contributors && git.contributors.length > 0) {
        commitMaxPerson = git.contributors.sort((a, b) => b.commits - a.commits)[0];
      }
      let createdTime = git.createdTime;
      let updatedTime = git.updatedTime;
      return {
        commitMaxPerson,//获取git提交最多的人
        createdTime,//文章的创建时间
        updatedTime,//文章的更新时间
      }
    }
    let title = page.frontmatter.title
    if (!title) {
      title = page.title;
    }
    return {
      git: getGitInfo(),
      title,
      key: page.key,
      path: page.path,
      description: page.frontmatter.description
    }
  },
  category: [
    {
      key: "tag",
      getter: ({ frontmatter }) => frontmatter.tag as string[] || [],
      path: "/tag/",
      layout: "Tag",
      frontmatter: () => ({ title: "标签页" }),
      itemPath: "/tag/:name/",
      itemLayout: "Tag",
      itemFrontmatter: (name) => ({ title: `${name}标签` }),
    }
  ],
  type: [
    {
      key: "star",
      filter: ({ frontmatter }) => frontmatter.star ? true : false,
      path: "/star/",
      layout: "Star",
      frontmatter: () => ({ title: "收藏页" }),
    }
  ]
});


export default defineUserConfig({
  lang: 'zh-CN',
  title: '神奇小破站',
  description: '分享有意思的东西！java web 前端 网络 vue JavaScript JS TS TypeScript css H5',
  theme: { name: 'jjaw-cn-page-theme', },
  public: "./public",
  dest: "./dist",
  pagePatterns: [
    "./articles/**/*.md"
  ],
  plugins: [
    usePrismjsPlugin,
    useSitemapPlugin,
    useGitPlugin,
    useSeoPlugin,
    useBlogPlugin,
    useHomePagePlugin
  ]
})