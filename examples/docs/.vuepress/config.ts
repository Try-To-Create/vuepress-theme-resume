import { viteBundler } from '@vuepress/bundler-vite'
import { resumeTheme } from '@trytocreate/vuepress-theme-resume'
import { defineUserConfig } from 'vuepress'

export default defineUserConfig({
    // Default to 'en-US'.
    lang: 'en-US',
    title: 'An example resume',
    head: [['link', { rel: 'shortcut icon', href: '/logo.svg', type: 'image/x-icon' }]],
    locales: {
        '/zh-CN': {
            lang: 'zh-CN',
            title: '一份示例简历'
        },
        '/zh-TW': {
            lang: 'zh-TW',
            title: '一份履歷表範本'
        }
    },
    bundler: viteBundler(),
    theme: resumeTheme()
})
