// 处理文章信息的函数集合

import { MyPageData } from "../types";
import { usePageData } from "@vuepress/client"
import { type Ref, computed } from "vue";

export function useGitArticleInformations() {
    const pageData = usePageData() as Ref<MyPageData>;
    const commitMaxPerson = computed(() => {
        const git = pageData.value.git;
        if (git && git.contributors && git.contributors.length > 0) {
            return git.contributors.sort((a, b) => b.commits - a.commits)[0];
        } else {
            return undefined;
        }
    });
    const createdTime = computed(()=>{
        const git = pageData.value.git;
        if(!git){
            return undefined;
        }
        return git.createdTime;
    });
    const updatedTime = computed(()=>{
        const git = pageData.value.git;
        if(!git){
            return undefined;
        }
        return git.updatedTime;
    })
    return {
        commitMaxPerson,//获取git提交最多的人
        createdTime,//文章的创建时间
        updatedTime,//文章的更新时间
    }
}

