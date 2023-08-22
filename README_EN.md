<p align="center">
  <a title="Hexo Version" target="_blank" href="https://hexo.io/zh-cn/"><img alt="Hexo Version" src="https://img.shields.io/badge/Hexo-%3E%3D%205.0-orange?style=flat"></a>
  <a title="Node Version" target="_blank" href="https://nodejs.org/zh-cn/"><img alt="Node Version" src="https://img.shields.io/badge/Node-%3E%3D%2010.13.0-yellowgreen?style=flat"></a>
  <a title="License" target="_blank" href="https://github.com/anzhiyu-c/hexo-theme-anzhiyu/blob/master/LICENSE"><img alt="License" src="https://img.shields.io/github/license/anzhiyu-c/hexo-theme-anzhiyu.svg?style=flat"></a>
  <br>
  <a title="GitHub Release" target="_blank" href="https://github.com/anzhiyu-c/hexo-theme-anzhiyu/releases"><img alt="GitHub Release" src="https://img.shields.io/github/v/release/anzhiyu-c/hexo-theme-anzhiyu?style=flat"></a>
  <a title="Npm Downloads" target="_blank" href="https://www.npmjs.com/package/hexo-theme-anzhiyu"><img alt="Npm Downloads" src="https://img.shields.io/npm/dt/hexo-theme-anzhiyu?color=red&label=npm"></a>
  <a title="GitHub Commits" target="_blank" href="https://github.com/anzhiyu-c/hexo-theme-anzhiyu/commits/master"><img alt="GitHub Commits" src="https://img.shields.io/github/commit-activity/m/anzhiyu-c/hexo-theme-anzhiyu.svg?style=flat&color=brightgreen&label=commits"></a>
  <br><br>
  <a title="GitHub Watchers" target="_blank" href="https://github.com/anzhiyu-c/hexo-theme-anzhiyu/watchers"><img alt="GitHub Watchers" src="https://img.shields.io/github/watchers/anzhiyu-c/hexo-theme-anzhiyu.svg?label=Watchers&style=social"></a>  
  <a title="GitHub Stars" target="_blank" href="https://github.com/anzhiyu-c/hexo-theme-anzhiyu/stargazers"><img alt="GitHub Stars" src="https://img.shields.io/github/stars/anzhiyu-c/hexo-theme-anzhiyu.svg?label=Stars&style=social"></a>  
  <a title="GitHub Forks" target="_blank" href="https://github.com/anzhiyu-c/hexo-theme-anzhiyu/network/members"><img alt="GitHub Forks" src="https://img.shields.io/github/forks/anzhiyu-c/hexo-theme-anzhiyu.svg?label=Forks&style=social"></a>  
</p>

<p align="center"><a title="中文" href="/README.md">🇨🇳 中文简体</a> | 🇬🇧 English</p>

Preview: 👍 [AnZhiYu](https://blog.anheyu.com/) || 🤞 [AnZhiYu](https://index.anheyu.com/)

Document: 📖 [anzhiyu Docs](https://docs.anheyu.com/)

A theme based on [hexo-theme-butterfly](https://github.com/jerryc127/hexo-theme-butterfly) modification

# hexo-theme-anzhiyu

![](https://bu.dusays.com/2023/07/24/64bdcbfe96762.webp)

## 💻 安裝

### Git 安裝

Install the latest version in the root directory of the blog [recommended]

```powershell
git clone -b main https://github.com/anzhiyu-c/hexo-theme-anzhiyu.git themes/anzhiyu
```

## ⚙ 应用主题

Modify the hexo configuration file `_ config.yml` and change the theme to `anzhiyu`

```
theme: anzhiyu
```

> If you do not have a renderer for pug and stylus, please download and install： `npm install hexo-renderer-pug hexo-renderer-stylus --save`

## Override configuration

Override configuration allows the `theme configuration `to be placed outside the anzhiyu directory to avoid losing custom configurations when updating the theme.

Users who install the theme through Npm can ignore it, and other users are recommended to learn to use it.

- macos/linux
  Run in the blog root directory
  ```bash
  cp -rf ./themes/anzhiyu/_config.yml ./_config.anzhiyu.yml
  ```

- windows
  Copy the file `/ themes/anzhiyu/_ config.yml` to the hexo root directory and rename it to` _ config.anzhiyu.yml`

If you modify any theme configuration in the future, you only need to modify the configuration of_config.anzhiyu.yml.

Note:
  - as long as the configurations that exist in `_ config.anzhiyu.yml` are of high priority, it is invalid to modify the original` _ config.yml`.
  - there may be configuration changes each time the topic is updated. Please pay attention to the update instructions. You may need to manually modify `_ config.anzhiyu.yml`.
  - to check whether the override configuration has taken effect, you can check the command line output via `override g-- debug`.
  - if you want to overwrite some configurations to empty, be careful not to delete the primary key, otherwise it cannot be overwritten

## Functional characteristics

-[x] extremely detailed [user documentation] (https://docs.anheyu.com/)
-[x] Page components load lazily (pjax scheme)
-[x] the picture is loaded lazily
-[x] multiple code highlighting schemes
-[x] multilingual configuration
-[x] built-in multiple comment plug-ins
-[x] built-in web page access statistics
-[x] supports dark mode
-[x] supports footnote syntax
-[x] support custom CDN static resources
-[x] A rich variety of tag options to quickly build the features you want
-[x] supports customized right-click menus
-[x] support customized dominant tone to vary with the color of the cover image
-[x] support for immersive status bar
-[x] support article word statistics
-[x] support chat system
-[x] support Google Analytics, Baidu Analytics, Microsoft Analytics, cloudflare Analytics, cnzz Analytics
-[x] Advertising is supported
-[x] large picture view is supported
-[x] support waterfall flow and talk about it right away
-[x] supports waterfall stream album
-[x] supports Ali icon and fontawesome
-[x] supports cached swpp,pwa features
-[x] excellent privacy protocol support
-[x] AI abstract support for articles
-[x] support music ball
-[x] supports the global center console
-[x] supports shortcut key options
-[x] support local search / algolia search 🔍 / Docsearch
-[x] supports LaTeX mathematical formula
-[x] support mermaid flow chart

## Contributors

[![contributors](https://opencollective.com/hexo-theme-anzhiyu/contributors.svg?width=890&button=false)](https://github.com/anzhiyu-c/hexo-theme-anzhiyu/)

Theme Design：[@张洪 Heo](https://github.com/zhheo)

Document writing：[@xiaoran](https://github.com/xiaoran)

## Warehouse Statistics

![Warehouse Statistics](https://repobeats.axiom.co/api/embed/60fcf455cd02123aebe6249deabf8d48e3debcae.svg "Repobeats analytics image")
