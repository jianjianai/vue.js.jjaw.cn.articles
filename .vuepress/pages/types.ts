import { GitContributor, GitData } from "@vuepress/plugin-git";
import { PageData, PageFrontmatter } from "vuepress";
import { BlogPluginCategoryFrontmatter, BlogPluginTypeFrontmatter } from "vuepress-plugin-blog2";

// 添加插件后类型对应的类型应该扩展

/**
 * 用法
 * const frontmatter = usePageFrontmatter() as Ref<MyPageFrontmatter>;
 */
export interface MyPageFrontmatter extends PageFrontmatter{
    blog?:BlogPluginCategoryFrontmatter | BlogPluginTypeFrontmatter;
    /** 是否启用评论  */
    comment?:boolean;
    tag?:string[];
    star?:boolean;
}
/**
 * 用法
 * const pageData = usePageData() as Ref<MyPageData>;
 */
export interface MyPageData extends PageData{
    git?:GitData;
}

/**
 * 用法
 * const time = useBlogType("star").value.items[0] as MyBlogInfo;
 */
export interface MyBlogInfo{
    git?:{
        commitMaxPerson: GitContributor | undefined;
        createdTime: number | undefined;
        updatedTime: number | undefined;
    };
    title:string,
    key:string,
    // path:string,
    description?:string
}


