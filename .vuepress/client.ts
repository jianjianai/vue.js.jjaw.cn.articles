import { defineClientConfig } from '@vuepress/client'
import Layout from "./pages/Layout.vue"
import NotFound from "./pages/NotFound.vue"
import HomePage from "./pages/HomePage.vue"
import Demo from './mdtag/Demo.vue'

export default defineClientConfig({
  enhance({ app, router, siteData }) {
    app.component("Demo",Demo);
  },
  setup() {},
  rootComponents: [],
  layouts:{
    Layout,NotFound,
    HomePage,
  }
})