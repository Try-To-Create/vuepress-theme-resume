import { defineClientConfig } from 'vuepress/client'
import ResumeLayout from './layouts/ResumeLayout.vue'
import NotFoundLayout from './layouts/NotFoundLayout.vue'
import Right from './components/Right.vue'
import Period from './components/Period.vue'

export default defineClientConfig({
    layouts: {
        Layout: ResumeLayout,
        NotFound: NotFoundLayout
    },
    enhance({ app }) {
        app.component('Right', Right)
        app.component('Period', Period)
    }
})
