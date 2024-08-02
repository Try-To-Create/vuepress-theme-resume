# vuepress-theme-resume

A resume theme for VuePress 2.

[查看简体中文版本的 README.md](https://github.com/Try-To-Create/vuepress-theme-resume/blob/main/README-zh-CN.md)

## Effect

### Online Preview

[https://vuepress-theme-resume.djweb.site](https://vuepress-theme-resume.djweb.site)

### Images

![resume image](https://github.com/Try-To-Create/vuepress-theme-resume/raw/main/examples/images/An%20example%20resume.png)

See [images](https://github.com/Try-To-Create/vuepress-theme-resume/tree/main/examples/images) for more.

### PDF

The results are shown in [pdfs](https://github.com/Try-To-Create/vuepress-theme-resume/tree/main/examples/pdfs/).

## Usage

Create and change into a new directory.

```bash
mkdir vuepress-resume
cd vuepress-resume
```

Initialize your project.

```bash
git init
pnpm init
```

Install VuePress and theme.

```bash
# install vuepress and vue
pnpm add -D vuepress@next vue
# install bundler
pnpm add -D @vuepress/bundler-vite@next
# install theme
pnpm add -D @trytocreate/vuepress-theme-resume
```

Create ```docs``` directory and ```docs/.vuepress``` directory.

```bash
mkdir docs
mkdir docs/.vuepress
```

Create the VuePress config file ```docs/.vuepress/config.js```.

```js
import { viteBundler } from '@vuepress/bundler-vite'
import { resumeTheme } from '@trytocreate/vuepress-theme-resume'
import { defineUserConfig } from 'vuepress'

export default defineUserConfig({
    bundler: viteBundler(),
    theme: resumeTheme()
})
```

See [examples](https://github.com/Try-To-Create/vuepress-theme-resume/tree/main/examples) for more.

## Save as PDF

### Recommended steps for Chrome / Edge / Firefox

Right click or press Ctrl + P.

Set the Destination as ```Save as PDF``` / ```Save to PDF```.

Set the Pages as ```All```.

Set the Layout as ```Portrait```.

Click on ```More settings```.

Set the Paper size as ```A4```.

Set the Paper per sheet as ```1```.

Set the Margins as ```None```.

Set the Scale as ```100```.

Check the ```Background graphics``` / ```Print backgrounds``` option.
