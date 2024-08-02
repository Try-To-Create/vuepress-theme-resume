# vuepress-theme-resume

一款 VuePress 2 的简历主题。

## 效果

### 在线预览

[https://vuepress-theme-resume.djweb.site/zh-CN/](https://vuepress-theme-resume.djweb.site/zh-CN/)

### 图片

![简历图片](https://github.com/Try-To-Create/vuepress-theme-resume/raw/main/examples/images/一份示例简历.png)

更多信息请参见[图片](https://github.com/Try-To-Create/vuepress-theme-resume/tree/main/examples/images).

### PDF 文件

结果如 [pdfs](https://github.com/Try-To-Create/vuepress-theme-resume/tree/main/examples/pdfs/) 所示。

## 使用

创建并进入一个新目录。

```bash
mkdir vuepress-resume
cd vuepress-resume
```

初始化项目。

```bash
git init
pnpm init
```

安装 VuePress 和主题。

```bash
# 安装 vuepress 和 vue
pnpm add -D vuepress@next vue
# 安装打包工具
pnpm add -D @vuepress/bundler-vite@next
# 安装主题
pnpm add -D @trytocreate/vuepress-theme-resume
```

创建 ```docs``` 目录和 ```docs/.vuepress``` 目录。

```bash
mkdir docs
mkdir docs/.vuepress
```

创建 VuePress 配置文件 ```docs/.vuepress/config.js```。

```js
import { viteBundler } from '@vuepress/bundler-vite'
import { resumeTheme } from '@trytocreate/vuepress-theme-resume'
import { defineUserConfig } from 'vuepress'

export default defineUserConfig({
    bundler: viteBundler(),
    theme: resumeTheme()
})
```

更多信息请参见[示例](https://github.com/Try-To-Create/vuepress-theme-resume/tree/main/examples)。

## 另存为 PDF

### Chrome / Edge / Firefox 的推荐步骤

单击鼠标右键或按 Ctrl + P。

将 打印机 设置为 ```另存为 PDF```。

将 页面 设置为 ```全部```。

将 布局 / 方向 设置为 ```纵向```。

点击 ```更多设置```。

将 纸张尺寸 / 纸张大小 设置为 ```A4```。

将 每个工作表的页数 / 每张纸打印的页数 设置为 ```1```。

将 边距 设置为 ```无```。

将 缩放 设置为 ```100```。

选中 ```背景图形``` / ```打印背景``` 选项。
