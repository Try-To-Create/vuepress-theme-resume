<script setup lang="ts">
import { getFrontmatter } from '../scripts/page'

interface Line {
    className?: string
    href?: string
    text?: string
}

let { className } = defineProps<Line>()

const classes = (() => {
    const { icon } = getFrontmatter()
    if (icon != 'black and white') {
        return 'colour ' + ( className || '' )
    }
    return className
})()
</script>

<template>
    <template v-if="text">
        <a v-if="href" :href="href" rel="noopener noreferrer" target="_blank">
            <div class="line" :class="classes">{{ text }}</div>
        </a>
        <div v-else class="line" :class="classes">{{ text }}</div>
    </template>
</template>

<style scoped>
/* icon font */
@font-face {
    font-family: icon;
    src: url('../assets/icon.woff2');
}

/* info text line */
div {
    margin-top: 0.5em;
    font-size: 2vw;
}

div::before {
    --people-color: var(--color);
    --school-color: var(--color);
    --phone-color: var(--color);
    --email-color: var(--color);
    --github-color: var(--color);
    --gitee-color: var(--color);
    font-family: icon;
    margin-right: 0.5em;
}

.colour::before {
    --school-color: #252525;
    --phone-color: #42B983;
    --email-color: #FFC310;
    --github-color: #1F2328;
    --gitee-color: #C71D23;
}

.colour.male::before {
    --people-color: #6FB3EE;
}

.colour.female::before {
    --people-color: #FF54AF;
}

.people::before {
    content: '\e600';
    color: var(--people-color);
}

.school::before {
    content: '\e601';
    color: var(--school-color);
}

.phone::before {
    content: '\e602';
    color: var(--phone-color);
}

.email::before {
    content: '\e603';
    color: var(--email-color);
}

.github::before {
    content: '\e604';
    color: var(--github-color);
}

.gitee::before {
    content: '\e605';
    color: var(--gitee-color);
}
</style>
