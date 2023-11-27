import type { GitContributor, GitData } from "@vuepress/plugin-git";
import type { PageData, PageFrontmatter } from "vuepress";

// 添加插件后类型对应的类型应该扩展

/**
 * 用法
 * const frontmatter = usePageFrontmatter() as Ref<MyPageFrontmatter>;
 */
export interface MyPageFrontmatter extends PageFrontmatter {
    blog?: {
        /** 当前页面的类型 */
        type: "category" | "type";
        /** 在当前分类或类别下全局唯一的 key */
        key: string;
        /**
         * 当前的分类名称
         *
         * @description 仅在分类子项目页面中可用
         */
        name?: string;
    };
    /** 是否启用评论  */
    comment?: boolean;
    tag?: string[];
    star?: boolean;
}
/**
 * 用法
 * const pageData = usePageData() as Ref<MyPageData>;
 */
export interface MyPageData extends PageData {
    git?: GitData;
}

/**
 * 用法
 * const time = useBlogType("star").value.items[0] as MyBlogInfo;
 */
export interface MyBlogInfo {
    git?: {
        commitMaxPerson: GitContributor | undefined;
        createdTime: number | undefined;
        updatedTime: number | undefined;
    };
    title: string,
    key: string,
    // path:string,
    description?: string
}


