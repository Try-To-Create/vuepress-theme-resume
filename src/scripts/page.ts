import { usePageLang, PageFrontmatter, usePageFrontmatter } from 'vuepress/client'

export type Icon = 'colour' | 'black and white'

export type Male = 'M' | 'Male' | 'Man' | '男'
export type Female = 'F' | 'Female' | 'Woman' | '女'

export interface Diff {
    red: number
    green: number
    blue: number
    alpha: number
}

export interface Photo {
    src: string
    backColor?: string
    diff?: number | Partial<Diff>
}

export interface RusumeFrontmatter {
    icon: Icon
    targetPost: string | {
        prefix?: false | string
        delimiter?: string
        text: string
    }
    name: string
    gender?: Male | Female
    birthday?: string
    school?: {
        name?: string
        major?: string
        start?: number
        end?: number
    }
    phone?: string
    email?: string
    github?: string
    gitee?: string
    introduce?: string
    photo?: string | Photo
}

export function getLang() {
    const lang = usePageLang().value
    switch (lang) {
        case 'zh':
        case 'zh-CN':
            return 'Simplified Chinese'
        case 'zh-TW':
            return 'Traditional Chinese'
        case 'en':
        case 'en-US':
            return 'English'
    }
    return 'English'
}

export function getFrontmatter(): PageFrontmatter<RusumeFrontmatter> {
    return usePageFrontmatter<RusumeFrontmatter>().value
}
