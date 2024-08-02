<script setup lang="ts">
import TargetPost from '../components/TargetPost.vue'
import Info from '../components/Info.vue'
</script>

<template>
    <TargetPost/>
    <Info/>
    <Content/>
</template>

<style>
body {
    --color: #252525;
    --tag-background: var(--color);
    --tag-color: #FFFFFF;
    --tag-hole-color: var(--tag-color);
    --tag-line-color: var(--tag-background);
    color: var(--color);
}

/* link */
a {
    color: unset;
    text-decoration: unset;
}

/* tag (title) */
h1 {
    display: flex;
    margin-block: unset;
    margin-inline: unset;
    unicode-bidi: unset;
    margin-top: 0.5em;
    padding: 0.3em;
    padding-left: 1em;
    width: fit-content;
    font-size: 2vw;
    border-radius: 1.05em;
    background: var(--tag-background);
    color: var(--tag-color);
    align-items: center;
}

/* tag hole */
h1::after {
    content: '';
    display: inline-block;
    margin: 0 0.35em;
    width: 0.8em;
    height: 0.8em;
    border-radius: 50%;
    background: var(--tag-hole-color);
}

/* tag line */
h1::before {
    content: '';
    position: absolute;
    display: inline-block;
    margin-left: -1em;
    width: 88vw;
    height: 0.25vw;
    background: var(--tag-line-color);
    z-index: -1;
}

/* subtitle */
h2 {
    display: flex;
    flex-wrap: wrap;
    margin-block: unset;
    margin-inline: unset;
    unicode-bidi: unset;
    margin-top: 1em;
    margin-left: 1em;
    font-size: 2vw;
}

/* technology stack*/
code {
    margin-left: 1em;
    padding: 0.15em 0.5em;
    font-size: 1.6vw;
    font-family: unset;
    font-weight: normal;
    border-radius: 0.5em;
    background: #EEEEEE;
}

/* list */
ul {
    list-style-type: none;
    margin-block: unset;
    margin-inline: unset;
    padding-inline: unset;
    unicode-bidi: unset;
}

/* list item */
li {
    display: flex;
    margin-top: 0.5em;
    font-size: 2vw;
    align-items: center;
}

/* list item prefix */
li::before {
    content: '';
    display: inline-block;
    margin: 0 0.5em 0 1em;
    width: 0.5em;
    height: 0.5em;
    border-radius: 50%;
    background: var(--color);
}

/* text */
p {
    margin-block: unset;
    margin-inline: unset;
    unicode-bidi: unset;
    margin-left: 2em;
    font-size: 2vw;
}
</style>
