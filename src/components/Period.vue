<script setup lang="ts">
import { getLang } from '../scripts/page'
import Right from './Right.vue'

interface TimeProps {
    start?: string
    delimiter?: string
    end?: string
}

const lang = getLang()
const defaultDelimiter = (() => {
    switch (lang) {
        case 'Simplified Chinese':
        case 'Traditional Chinese':
            return ' —— '
        case 'English':
            return ' — '
    }
})()
const defaultEnd = (() => {
    switch (lang) {
        case 'Simplified Chinese':
        case 'Traditional Chinese':
            return '目前'
        case 'English':
            return 'Present'
    }
})()
const { start = '', delimiter = defaultDelimiter, end = defaultEnd } = defineProps<TimeProps>()
const period = start + delimiter + end
</script>

<template>
    <Right>{{ period }}</Right>
</template>
