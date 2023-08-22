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

<p align="center">🇨🇳 中文简体  |  <a title="English" href="README_EN.md">🇬🇧 English</a></p>

预览: 👍 [AnZhiYu](https://blog.anheyu.com/) || 🤞 [AnZhiYu](https://index.anheyu.com/)

文档: 📖 [anzhiyu Docs](https://docs.anheyu.com/)

一款基于[hexo-theme-butterfly](https://github.com/jerryc127/hexo-theme-butterfly)修改的主題

# hexo-theme-anzhiyu

![](https://bu.dusays.com/2023/07/24/64bdcbfe96762.webp)

## 💻 安裝

### Git 安裝

在博客根目录里安装最新版【推荐】

```powershell
git clone -b main https://github.com/anzhiyu-c/hexo-theme-anzhiyu.git themes/anzhiyu
```

## ⚙ 应用主题

修改 hexo 配置文件`_config.yml`，把主题改为`anzhiyu`

```
theme: anzhiyu
```

> 如果你没有 pug 以及 stylus 的渲染器，请下载安装： `npm install hexo-renderer-pug hexo-renderer-stylus --save`

## 覆盖配置

覆盖配置可以使`主题配置`放置在 anzhiyu 目录之外，避免在更新主题时丢失自定义的配置。

通过 Npm 安装主题的用户可忽略，其他用户建议学习使用。

- macos/linux
  在博客根目录运行

```bash
cp -rf ./themes/anzhiyu/_config.yml ./_config.anzhiyu.yml
```

- windows
  复制`/themes/anzhiyu/_config.yml`此文件到 hexo 根目录，并重命名为`_config.anzhiyu.yml`

以后如果修改任何主题配置，都只需修改 _config.anzhiyu.yml 的配置即可。

注意：
 - 只要存在于 `_config.anzhiyu.yml` 的配置都是高优先级，修改原 `_config.yml` 是无效的。
 - 每次更新主题可能存在配置变更，请注意更新说明，可能需要手动对 `_config.anzhiyu.yml` 同步修改。
 - 想查看覆盖配置有没有生效，可以通过 `hexo g --debug` 查看命令行输出。
 - 如果想将某些配置覆盖为空，注意不要把主键删掉，不然是无法覆盖的

## 功能特性

- [x] 无比详实的[用户文档](https://docs.anheyu.com/)
- [x] 页面组件懒加载(pjax方案)
- [x] 图片懒加载
- [x] 多种代码高亮方案
- [x] 多语言配置
- [x] 内置多款评论插件
- [x] 内置网页访问统计
- [x] 支持暗色模式
- [x] 支持脚注语法
- [x] 支持自定义CDN静态资源
- [x] 丰富多样化的标签选项快速构建你想要的功能
- [x] 支持定制化的右键菜单
- [x] 支持定制化的主色调随封面图片颜色变化
- [x] 支持沉浸式状态栏
- [x] 支持文章字数统计
- [x] 支持聊天系统
- [x] 支持谷歌分析、百度分析、微软分析、cloudflare分析、cnzz分析
- [x] 支持广告挂载
- [x] 支持图片大图查看
- [x] 支持瀑布流即刻说说
- [x] 支持瀑布流相册集
- [x] 支持阿里图标与fontawesome
- [x] 支持高速缓存的swpp，pwa特性
- [x] 优秀的隐私协议支持
- [x] 文章AI摘要支持
- [x] 支持音乐球
- [x] 支持全局中控台
- [x] 支持快捷键选项
- [x] 支持本地搜索/algolia搜索🔍/Docsearch
- [x] 支持 LaTeX 数学公式
- [x] 支持 mermaid 流程图

## 贡献者

[![contributors](https://opencollective.com/hexo-theme-anzhiyu/contributors.svg?width=890&button=false)](https://github.com/anzhiyu-c/hexo-theme-anzhiyu/)

主题设计：[@张洪 Heo](https://github.com/zhheo)

文档编写：[@xiaoran](https://github.com/xiaoran)

## 仓库统计

![仓库统计](https://repobeats.axiom.co/api/embed/60fcf455cd02123aebe6249deabf8d48e3debcae.svg "Repobeats analytics image")
