<script setup lang="ts">
import { getLang, getFrontmatter, type Diff } from '../scripts/page'

interface Color {
    red: number
    green: number
    blue: number
    alpha: number
}

function parseColor(colorString: string): Color {
    const color: Color = {
        red: 255,
        green: 255,
        blue: 255,
        alpha: 255
    }
    // HEX
    const hexRegExp = /^#([A-F\d]{3,4}|[A-F\d]{6}|[A-F\d]{8})$/i
    const hexMatched = colorString.match(hexRegExp)
    if (hexMatched) {
        let hex = hexMatched[1]
        if (hex.length <= 4) {
            hex = hex.split('').map(char => char + char).join('')
        }
        hex.match(/.{2}/g)!.map((value, index) => {
            const number = parseInt(value, 16)
            const channels: (keyof Color)[] = ['red', 'green', 'blue', 'alpha']
            color[channels[index]] = number
        })
    }
    // HSL / HSLA
    const hslaRegExp = /^hsla?\(\s*(\d{1,3})\s*,\s*([.\d]+)%\s*,\s*([.\d]+)%\s*(?:,\s*([.\d]+)\s*)?\)$/i
    const hslaMatched = colorString.match(hslaRegExp)
    if (hslaMatched) {
        let [, hue, saturation, lightness, alpha] = hslaMatched
        const h = +hue / 360
        const s = +saturation / 100
        const l = +lightness / 100
        if (!s) {
            color.red = color.green = color.blue = Math.round(l * 255)
        } else {
            function getChannel(p: number, q: number, t: number) {
                let channel: number
                if (t < 0) {
                    t += 1
                } else if (t > 1) {
                    t -= 1
                }
                if (t < 1 / 6) {
                    channel = p + (q - p) * 6 * t
                } else if (t < 1 / 2) {
                    channel = q
                } else if (t < 2 / 3) {
                    channel = p + (q - p) * 6 * (2 / 3 - t)
                } else {
                    channel = p
                }
                return Math.round(channel * 255)
            }
            const q = l < 0.5 ? l * (1 + s) : l + s - (l * s)
            const p = 2 * l - q
            const tR = h + 1 / 3
            const tG = h
            const tB = h - 1 / 3
            color.red = getChannel(p, q, tR)
            color.green = getChannel(p, q, tG)
            color.blue = getChannel(p, q, tB)
        }
        color.alpha = alpha ? Math.floor(+alpha * 255) : 255
    }
    // RGB / RGBA
    const rgbaRegExp = /^rgba?\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*(?:,\s*([.\d]+)\s*)?\)$/i
    const rgbaMatched = colorString.match(rgbaRegExp)
    if (rgbaMatched) {
        const [, red, green, blue, alpha] = rgbaMatched
        color.red = +red
        color.green = +green
        color.blue = +blue
        color.alpha = alpha ? Math.floor(+alpha * 255) : 255
    }
    return color
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
