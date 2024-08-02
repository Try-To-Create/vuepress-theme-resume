import { fileURLToPath } from 'url'
import path, { dirname } from 'path'
import fs from 'fs'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const src = path.resolve(__dirname, '../src')
const dist = path.resolve(__dirname, '../dist')
const options = {
    filter(src) {
        if (src.endsWith('.ts') || src.endsWith('\\scripts')) {
            return false
        }
        return true
    },
    recursive: true
}
if (fs.existsSync(dist) && fs.statSync(dist).isDirectory()) {
    fs.rmSync(dist, { recursive: true })
}
fs.cpSync(src, dist, options, (error) => {
    console.log(error)
})
