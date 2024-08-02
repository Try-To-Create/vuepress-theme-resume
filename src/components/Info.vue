<script setup lang="ts">
import { getLang, getFrontmatter } from '../scripts/page'
import Line from './Line.vue'
import Photo from './Photo.vue'

const lang = getLang()
const frontmatter = getFrontmatter()
const { name, birthday, phone, email, github, gitee, introduce } = frontmatter
const gender = (() => {
    const { gender } = getFrontmatter()
    switch (gender) {
        case 'M':
        case 'Male':
        case 'Man':
        case '男':
        default:
            return 'male'
        case 'F':
        case 'Female':
        case 'Woman':
        case '女':
            return 'female'
    }
})()
const genderText : string = (() => {
    switch (lang) {
        case 'Simplified Chinese':
        case 'Traditional Chinese':
            return gender == 'male' ? '男' : '女'
        case 'English':
            return gender
    }
})()
function mergeTexts(texts: (string | number | undefined)[], delimiter = ' / ') {
    let result = ''
    for (const text of texts) {
        if (text) {
            if (result) {
                result += delimiter
            }
            result += text
        }
    } 
    return result
}
const people = mergeTexts([name, genderText, birthday])
const school: string = (() => {
    const { school } = frontmatter
    if (school) {
        const time = mergeTexts([school.start, school.end], ' - ')
        return mergeTexts([school.name, school.major, time])
    }
    return ''
})()
</script>

<template>
    <div class="info">
        <div class="text">
            <Line :class-name="'people ' + gender" :text="people"/>
            <Line class-name="school" :text="school"/>
            <Line class-name="phone" :href="'tel:' + phone" :text="phone"/>
            <Line class-name="email" :href="'mailto:' + email" :text="email"/>
            <Line class-name="github" :href="github" :text="github"/>
            <Line class-name="gitee" :href="gitee" :text="gitee"/>
            <div v-if="introduce" class="introduce">{{ introduce }}</div>
        </div>
        <ClientOnly>
            <Suspense>
                <Photo/>
            </Suspense>
        </ClientOnly>
    </div>
</template>

<style scoped>
.info {
    display: flex;
}
</style>
