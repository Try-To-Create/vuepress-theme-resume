import { fileURLToPath } from 'url'
import { dirname } from 'path'
import type { Theme } from 'vuepress/core'
import { path } from 'vuepress/utils'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

export const resumeTheme = (): Theme => {
    return {
        name: 'vuepress-theme-resume',
        clientConfigFile: path.resolve(__dirname, 'client.js'),
        templateDev: path.resolve(__dirname, 'templates/dev.html'),
        templateBuild: path.resolve(__dirname, 'templates/build.html'),
        extendsMarkdownOptions(markdownOptions) {
            // Do not display anchor and title.
            markdownOptions.anchor = false
            markdownOptions.title = false
        }
    }
}
