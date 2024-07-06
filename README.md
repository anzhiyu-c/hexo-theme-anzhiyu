<p align="center">
  <a title="Hexo Version" target="_blank" href="https://hexo.io/zh-cn/"><img alt="Hexo Version" src="https://img.shields.io/badge/Hexo-%3E%3D%205.3.0-orange?style=flat"></a>
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

<p align="center">🇨🇳 中文簡體  |  <a title="English" href="README_EN.md">🇬🇧 English</a></p>

預覽: 👍 [AnZhiYu](https://blog.anheyu.com/) || 🤞 [AnZhiYu](https://index.anheyu.com/)

文檔: 📖 [anzhiyu Docs](https://docs.anheyu.com/)

一款基於[hexo-theme-butterfly](https://github.com/jerryc127/hexo-theme-butterfly)修改的主題

# hexo-theme-anzhiyu

![](https://bu.dusays.com/2023/07/24/64bdcbfe96762.webp)

## 💻 安裝

### Git 安裝

在博客根目錄裏安裝最新版【推薦】

```powershell
git clone -b main https://github.com/anzhiyu-c/hexo-theme-anzhiyu.git themes/anzhiyu
```

## ⚙ 應用主題

修改 hexo 配置文件`_config.yml`，把主題改爲`anzhiyu`

```
theme: anzhiyu
```

> 如果你沒有 pug 以及 stylus 的渲染器，請下載安裝： `npm install hexo-renderer-pug hexo-renderer-stylus --save`

## 覆蓋配置

覆蓋配置可以使`主題配置`放置在 anzhiyu 目錄之外，避免在更新主題時丟失自定義的配置。

通過 Npm 安裝主題的用戶可忽略，其他用戶建議學習使用。

- macos/linux
  在博客根目錄運行

```bash
cp -rf ./themes/anzhiyu/_config.yml ./_config.anzhiyu.yml
```

- windows
  複製`/themes/anzhiyu/_config.yml`此文件到 hexo 根目錄，並重命名爲`_config.anzhiyu.yml`

以後如果修改任何主題配置，都只需修改 _config.anzhiyu.yml 的配置即可。

注意：
 - 只要存在於 `_config.anzhiyu.yml` 的配置都是高優先級，修改原 `_config.yml` 是無效的。
 - 每次更新主題可能存在配置變更，請注意更新說明，可能需要手動對 `_config.anzhiyu.yml` 同步修改。
 - 想查看覆蓋配置有沒有生效，可以通過 `hexo g --debug` 查看命令行輸出。
 - 如果想將某些配置覆蓋爲空，注意不要把主鍵刪掉，不然是無法覆蓋的

## 功能特性

- ✅ 無比詳實的[用戶文檔](https://docs.anheyu.com/)
- ✅ 頁面組件懶加載(pjax方案)
- ✅ 圖片懶加載
- ✅ 多種代碼高亮方案
- ✅ 多語言配置
- ✅ 內置多款評論插件
- ✅ 內置網頁訪問統計
- ✅ 支持暗色模式
- ✅ 支持腳註語法
- ✅ 支持自定義CDN靜態資源
- ✅ 豐富多樣化的標籤選項快速構建你想要的功能
- ✅ 支持定製化的右鍵菜單
- ✅ 支持定製化的主色調隨封面圖片顏色變化
- ✅ 支持沉浸式狀態欄
- ✅ 支持文章字數統計
- ✅ 支持聊天系統
- ✅ 支持谷歌分析、百度分析、微軟分析、cloudflare分析、cnzz分析
- ✅ 支持廣告掛載
- ✅ 支持圖片大圖查看
- ✅ 支持瀑布流即刻說說
- ✅ 支持瀑布流相冊集
- ✅ 支持阿里圖標與fontawesome
- ✅ 支持高速緩存的swpp，pwa特性
- ✅ 優秀的隱私協議支持
- ✅ 文章AI摘要支持
- ✅ 支持音樂球
- ✅ 支持全局中控臺
- ✅ 支持快捷鍵選項
- ✅ 支持本地搜索/algolia搜索🔍/Docsearch
- ✅ 支持 LaTeX 數學公式
- ✅ 支持 mermaid 流程圖

## 部分功能展示

**沉浸式狀態欄**
沉浸閱讀。
![沉浸式狀態欄](https://upload-bbs.miyoushe.com/upload/2023/09/04/125766904/3bc088e73d07b4dc25fc62fa4cf63261_4205905123525229755.png)

**高低自定義的右鍵菜單**
高度定製。
![高低自定義的右鍵菜單](https://upload-bbs.miyoushe.com/upload/2023/09/04/125766904/3f66e33b24a758d53717f6c2c44e50af_1884994888952376370.png)

**AI摘要**
迅速讀取文章內容。
![AI摘要](https://upload-bbs.miyoushe.com/upload/2023/09/04/125766904/184e089d64660f5f72390f547c864633_3266246986824356702.png)

**讓人眼前一亮的清爽界面**

![讓人眼前一亮的清爽界面](https://upload-bbs.miyoushe.com/upload/2023/09/04/125766904/8a16284fd36a9e986d5dbda772f697d0_1356079755877317976.png)

**評論彈幕**

![評論彈幕](https://upload-bbs.miyoushe.com/upload/2023/09/04/125766904/628aef1dbf52b61c0333682e8ee9954e_6905019516821534667.png)

## 貢獻者

[![contributors](https://opencollective.com/hexo-theme-anzhiyu/contributors.svg?width=890&button=false)](https://github.com/anzhiyu-c/hexo-theme-anzhiyu/)

主題設計：[@張洪 Heo](https://github.com/zhheo)

文檔編寫：[@xiaoran](https://github.com/xiaoran)

## 倉庫統計

![倉庫統計](https://repobeats.axiom.co/api/embed/60fcf455cd02123aebe6249deabf8d48e3debcae.svg "Repobeats analytics image")
