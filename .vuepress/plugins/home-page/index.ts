import { App, PageOptions, Plugin, createPage } from "vuepress";



export function homePagePlugin(PageOptions:PageOptions):Plugin{
    return {
        name:"home-page",
        async onInitialized(app: App) {
            app.pages.push(await createPage(app, PageOptions));
        }
    }
}