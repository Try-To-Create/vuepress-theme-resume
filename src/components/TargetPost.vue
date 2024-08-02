<script setup lang="ts">
import { getLang, getFrontmatter } from '../scripts/page'

const lang = getLang()
const defaultPrefix = (() => {
    switch (lang) {
        case 'Simplified Chinese':
            return '求职岗位'
        case 'Traditional Chinese':
            return '求職職務'
        case 'English':
            return 'Target Post'
    }
})()
const defaultDelimiter = (() => {
    switch (lang) {
        case 'Simplified Chinese':
        case 'Traditional Chinese':
            return ' —— '
        case 'English':
            return ' — '
    }
})()
const targetPost: string = (() => {
    const { targetPost } = getFrontmatter()
    // If not set, it will be empty string.
    if (!targetPost) {
        return ''
    }
    if (typeof targetPost == 'string') {
        return defaultPrefix + defaultDelimiter + targetPost
    } else {
        // If set to false, both the prefix and delimiter will be empty string.
        if (targetPost.prefix == false) {
            return targetPost.text
        }
        return (targetPost.prefix || defaultPrefix) + (targetPost.delimiter || defaultDelimiter) + (targetPost.text || '')
    }
})()
</script>

<template>
    <div v-if="targetPost" class="target-post">{{ targetPost }}</div>
</template>

<style scoped>
.target-post {
    margin-block: unset;
    margin-inline: unset;
    unicode-bidi: unset;
    font-size: 3.3vw;
    font-weight: bold;
}
</style>
