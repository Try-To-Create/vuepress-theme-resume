<script setup lang="ts">
import { getLang, getFrontmatter, type Diff } from '../scripts/page'

interface Color {
    red: number
    green: number
    blue: number
    alpha: number
}

function parseColor(color: string): Color {
    // HEX to RGBA
    const hexRegExp = /^#([a-fA-F\d]{3,4}|[a-fA-F\d]{6}|[a-fA-F\d]{8})$/
    const hexMatched = color.match(hexRegExp)
    if (hexMatched) {
        let hex = hexMatched[1]
        if (hex.length <= 4) {
            hex = hex.split('').map(char => char + char).join('')
        }
        color = hex.match(/.{2}/g)!.map((value, index, { length }) => {
            value = parseInt(value, 16).toString()
            if (index == 0) {
                value = 'rgba(' + value
            }
            if (index < length - 1) {
                value += ','
            } else {
                if (index < 3) {
                    value += ',1'
                } else {
                    value = (+value / 255).toString()
                }
                value += ')'
            } 
            return value
        }).join('')
    }
    const rgbaRegExp = /^rgba?\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*(?:,\s*([.\d]{1,3})\s*)?\)$/
    const rgbaMatched = color.match(rgbaRegExp)
    if (rgbaMatched) {
        const [, red, green, blue, alpha] = rgbaMatched
        return { 
            red: +red,
            green: +green,
            blue: +blue,
            alpha: alpha? Math.floor((+ alpha) * 255) : 255
        }
    }
    return {
        red: 255,
        green: 255,
        blue: 255,
        alpha: 255
    }
}

function getBackgroundColor(content: CanvasRenderingContext2D) {
    const canvas = content.canvas
    const width = Math.ceil(canvas.width / 50)
    const height = Math.ceil(canvas.height / 50)
    const { data } = content.getImageData(0, 0, width, height)
    const color = {
        red: 0,
        green: 0,
        blue: 0,
        alpha: 0
    }
    for (let i = 0; i < data.length; i += 4) {
        color.red += data[i]
        color.green += data[i + 1]
        color.blue += data[i + 2]
        color.alpha += data[i + 3]
    }
    const number = width * height
    color.red = Math.floor(color.red / number)
    color.green = Math.floor(color.green / number)
    color.blue = Math.floor(color.blue / number)
    color.alpha = Math.floor(color.alpha / number)
    return color
}

type Config = Color & {
    diff: Diff
}

function changeBackground(src: string, config: Config) {
    return new Promise<string>((resolve, reject) => {
        const image = document.createElement('img')
        function changeBackground() {
            const canvas = document.createElement('canvas')
            const content = canvas.getContext('2d', {
                willReadFrequently: true
            })
            const width = image.naturalWidth
            const height = image.naturalHeight
            canvas.width = width
            canvas.height = height
            if (content) {
                content.drawImage(image, 0, 0)
                const imageData = content.getImageData(0, 0, width, height)
                const data = imageData.data
                const color = getBackgroundColor(content)
                for (let i = 0; i < data.length; i += 4) {
                    const redDiff = Math.abs(data[i] - color.red)
                    const greenDiff = Math.abs(data[i + 1] - color.green)
                    const blueDiff = Math.abs(data[i + 2] - color.blue)
                    const alphaDiff = Math.abs(data[i + 3] - color.alpha)
                    const { diff } = config
                    if (redDiff <= diff.red && greenDiff <= diff.green && blueDiff <= diff.blue && alphaDiff <= diff.alpha) {
                        data[i] = config.red
                        data[i + 1] = config.green
                        data[i + 2] = config.blue
                        data[i + 3] = config.alpha
                    }
                }
                content.putImageData(imageData, 0, 0)
                image.removeEventListener('load', changeBackground)
                canvas.toBlob((blob) => {
                    if (blob) {
                        resolve(URL.createObjectURL(blob))
                    } else {
                        reject()
                    }
                })
            } else {
                reject()
            }
        }
        image.addEventListener('load', changeBackground)
        image.src = src
    })
}

const photo = await (async () => {
    const { photo } = getFrontmatter()
    if (!photo) {
        return ''
    }
    if (typeof photo == 'string') {
        return photo
    }
    const diff: Diff = {
        red: 10,
        green: 10,
        blue: 10,
        alpha: 10
    }
    if (typeof photo.diff == 'number') {
        diff.red = diff.green = diff.blue = diff.alpha = photo.diff
    } else if (typeof photo.diff == 'object') {
        Object.assign(diff, photo.diff)
    }
    if (photo.backColor) {
        const color = parseColor(photo.backColor)
        return await changeBackground(photo.src, Object.assign({ diff }, color))
    } else {
        return photo.src
    }
})()

const alt = (() => {
    const lang = getLang()
    switch (lang) {
        case 'Simplified Chinese':
        case 'Traditional Chinese':
            return '照片'
        case 'English':
            return 'photo'
    }
})()
</script>

<template>
    <img v-if="photo" class="photo" :src="photo" :alt="alt">
</template>

<style>
.photo {
    margin-left: auto;
    height: 24vw;
}
</style>
