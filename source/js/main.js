// 第一次播放音乐
var anzhiyu_musicFirst = false;
// 音乐播放状态
var anzhiyu_musicPlaying = false;

var adjectives = [
  "美丽的",
  "英俊的",
  "聪明的",
  "勇敢的",
  "可爱的",
  "慷慨的",
  "善良的",
  "可靠的",
  "开朗的",
  "成熟的",
  "稳重的",
  "真诚的",
  "幽默的",
  "豁达的",
  "有趣的",
  "活泼的",
  "优雅的",
  "敏捷的",
  "温柔的",
  "温暖的",
  "敬业的",
  "细心的",
  "耐心的",
  "深沉的",
  "朴素的",
  "含蓄的",
  "率直的",
  "开放的",
  "务实的",
  "坚强的",
  "自信的",
  "谦虚的",
  "文静的",
  "深刻的",
  "纯真的",
  "朝气蓬勃的",
  "慎重的",
  "大方的",
  "顽强的",
  "迷人的",
  "机智的",
  "善解人意的",
  "富有想象力的",
  "有魅力的",
  "独立的",
  "好奇的",
  "干净的",
  "宽容的",
  "尊重他人的",
  "体贴的",
  "守信的",
  "有耐性的",
  "有责任心的",
  "有担当的",
  "有远见的",
  "有智慧的",
  "有眼光的",
  "有冒险精神的",
  "有爱心的",
  "有同情心的",
  "喜欢思考的",
  "喜欢学习的",
  "具有批判性思维的",
  "善于表达的",
  "善于沟通的",
  "善于合作的",
  "善于领导的",
  "有激情的",
  "有幽默感的",
  "有思想的",
  "有个性的",
  "有正义感的",
  "有责任感的",
  "有创造力的",
  "有想象力的",
  "有艺术细胞的",
  "有团队精神的",
  "有协调能力的",
  "有决策能力的",
  "有组织能力的",
  "有学习能力的",
  "有执行能力的",
  "有分析能力的",
  "有逻辑思维的",
  "有创新能力的",
  "有专业素养的",
  "有商业头脑的",
];

var vegetablesAndFruits = [
  "萝卜",
  "白菜",
  "芹菜",
  "生菜",
  "青椒",
  "辣椒",
  "茄子",
  "豆角",
  "黄瓜",
  "西红柿",
  "洋葱",
  "大蒜",
  "土豆",
  "南瓜",
  "豆腐",
  "韭菜",
  "花菜",
  "西兰花",
  "蘑菇",
  "金针菇",
  "苹果",
  "香蕉",
  "橙子",
  "柠檬",
  "猕猴桃",
  "草莓",
  "葡萄",
  "桃子",
  "杏子",
  "李子",
  "石榴",
  "西瓜",
  "哈密瓜",
  "蜜瓜",
  "樱桃",
  "蓝莓",
  "柿子",
  "橄榄",
  "柚子",
  "火龙果",
];
document.addEventListener("DOMContentLoaded", function () {
  let blogNameWidth, menusWidth, searchWidth, $nav;
  let mobileSidebarOpen = false;

  const adjustMenu = init => {
    if (init) {
      blogNameWidth = document.getElementById("site-name").offsetWidth;
      const $menusEle = document.querySelectorAll("#menus .menus_item");
      menusWidth = 0;
      $menusEle.length &&
        $menusEle.forEach(i => {
          menusWidth += i.offsetWidth;
        });
      const $searchEle = document.querySelector("#search-button");
      searchWidth = $searchEle ? $searchEle.offsetWidth : 0;
      $nav = document.getElementById("nav");
    }

    let hideMenuIndex = "";
    if (window.innerWidth <= 768) hideMenuIndex = true;
    else hideMenuIndex = blogNameWidth + menusWidth + searchWidth > $nav.offsetWidth - 120;

    if (hideMenuIndex) {
      $nav.classList.add("hide-menu");
    } else {
      $nav.classList.remove("hide-menu");
    }
  };

  // 初始化header
  const initAdjust = () => {
    adjustMenu(true);
    $nav.classList.add("show");
  };

  // sidebar menus
  const sidebarFn = {
    open: () => {
      anzhiyu.sidebarPaddingR();
      document.body.style.overflow = "hidden";
      anzhiyu.animateIn(document.getElementById("menu-mask"), "to_show 0.5s");
      document.getElementById("sidebar-menus").classList.add("open");
      mobileSidebarOpen = true;
    },
    close: () => {
      const $body = document.body;
      $body.style.overflow = "";
      $body.style.paddingRight = "";
      anzhiyu.animateOut(document.getElementById("menu-mask"), "to_hide 0.5s");
      document.getElementById("sidebar-menus").classList.remove("open");
      mobileSidebarOpen = false;
    },
  };

  /**
   * 首頁top_img底下的箭頭
   */
  const scrollDownInIndex = () => {
    const $scrollDownEle = document.getElementById("scroll-down");
    $scrollDownEle &&
      $scrollDownEle.addEventListener("click", function () {
        anzhiyu.scrollToDest(document.getElementById("content-inner").offsetTop, 300);
      });
  };

  /**
   * 代碼
   * 只適用於Hexo默認的代碼渲染
   */
  const addHighlightTool = function () {
    const highLight = GLOBAL_CONFIG.highlight;
    if (!highLight) return;

    const isHighlightCopy = highLight.highlightCopy;
    const isHighlightLang = highLight.highlightLang;
    const isHighlightShrink = GLOBAL_CONFIG_SITE.isHighlightShrink;
    const highlightHeightLimit = highLight.highlightHeightLimit;
    const isShowTool = isHighlightCopy || isHighlightLang || isHighlightShrink !== undefined;
    const $figureHighlight =
      highLight.plugin === "highlighjs"
        ? document.querySelectorAll("figure.highlight")
        : document.querySelectorAll('pre[class*="language-"]');

    if (!((isShowTool || highlightHeightLimit) && $figureHighlight.length)) return;

    const isPrismjs = highLight.plugin === "prismjs";

    let highlightShrinkEle = "";
    let highlightCopyEle = "";
    const highlightShrinkClass = isHighlightShrink === true ? "closed" : "";

    if (isHighlightShrink !== undefined) {
      highlightShrinkEle = `<i class="fas fa-angle-down expand ${highlightShrinkClass}"></i>`;
    }

    if (isHighlightCopy) {
      highlightCopyEle = '<div class="copy-notice"></div><i class="fas fa-paste copy-button"></i>';
    }

    const copy = (text, ctx) => {
      if (document.queryCommandSupported && document.queryCommandSupported("copy")) {
        document.execCommand("copy");
        if (GLOBAL_CONFIG.Snackbar !== undefined) {
          anzhiyu.snackbarShow(GLOBAL_CONFIG.copy.success);
        } else {
          const prevEle = ctx.previousElementSibling;
          prevEle.innerText = GLOBAL_CONFIG.copy.success;
          prevEle.style.opacity = 1;
          setTimeout(() => {
            prevEle.style.opacity = 0;
          }, 700);
        }
      } else {
        if (GLOBAL_CONFIG.Snackbar !== undefined) {
          anzhiyu.snackbarShow(GLOBAL_CONFIG.copy.noSupport);
        } else {
          ctx.previousElementSibling.innerText = GLOBAL_CONFIG.copy.noSupport;
        }
      }
    };

    // click events
    const highlightCopyFn = ele => {
      const $buttonParent = ele.parentNode;
      $buttonParent.classList.add("copy-true");
      const selection = window.getSelection();
      const range = document.createRange();
      if (isPrismjs) range.selectNodeContents($buttonParent.querySelectorAll("pre code")[0]);
      else range.selectNodeContents($buttonParent.querySelectorAll("table .code pre")[0]);
      selection.removeAllRanges();
      selection.addRange(range);
      const text = selection.toString();
      copy(text, ele.lastChild);
      selection.removeAllRanges();
      $buttonParent.classList.remove("copy-true");
    };

    const highlightShrinkFn = ele => {
      const $nextEle = [...ele.parentNode.children].slice(1);
      ele.firstChild.classList.toggle("closed");
      if (anzhiyu.isHidden($nextEle[$nextEle.length - 1])) {
        $nextEle.forEach(e => {
          e.style.display = "block";
        });
      } else {
        $nextEle.forEach(e => {
          e.style.display = "none";
        });
      }
    };

    const highlightToolsFn = function (e) {
      const $target = e.target.classList;
      if ($target.contains("expand")) highlightShrinkFn(this);
      else if ($target.contains("copy-button")) highlightCopyFn(this);
    };

    const expandCode = function () {
      this.classList.toggle("expand-done");
    };

    function createEle(lang, item, service) {
      const fragment = document.createDocumentFragment();

      if (isShowTool) {
        const hlTools = document.createElement("div");
        hlTools.className = `highlight-tools ${highlightShrinkClass}`;
        hlTools.innerHTML = highlightShrinkEle + lang + highlightCopyEle;
        hlTools.addEventListener("click", highlightToolsFn);
        fragment.appendChild(hlTools);
      }

      if (highlightHeightLimit && item.offsetHeight > highlightHeightLimit + 30) {
        const ele = document.createElement("div");
        ele.className = "code-expand-btn";
        ele.innerHTML = '<i class="fas fa-angle-double-down"></i>';
        ele.addEventListener("click", expandCode);
        fragment.appendChild(ele);
      }

      if (service === "hl") {
        item.insertBefore(fragment, item.firstChild);
      } else {
        item.parentNode.insertBefore(fragment, item);
      }
    }

    if (isHighlightLang) {
      if (isPrismjs) {
        $figureHighlight.forEach(function (item) {
          const langName = item.getAttribute("data-language") ? item.getAttribute("data-language") : "Code";
          const highlightLangEle = `<div class="code-lang">${langName}</div>`;
          anzhiyu.wrap(item, "figure", { class: "highlight" });
          createEle(highlightLangEle, item);
        });
      } else {
        $figureHighlight.forEach(function (item) {
          let langName = item.getAttribute("class").split(" ")[1];
          if (langName === "plain" || langName === undefined) langName = "Code";
          const highlightLangEle = `<div class="code-lang">${langName}</div>`;
          createEle(highlightLangEle, item, "hl");
        });
      }
    } else {
      if (isPrismjs) {
        $figureHighlight.forEach(function (item) {
          anzhiyu.wrap(item, "figure", { class: "highlight" });
          createEle("", item);
        });
      } else {
        $figureHighlight.forEach(function (item) {
          createEle("", item, "hl");
        });
      }
    }
  };

  /**
   * PhotoFigcaption
   */
  function addPhotoFigcaption() {
    document.querySelectorAll("#article-container img").forEach(function (item) {
      const parentEle = item.parentNode;
      const altValue = item.title || item.alt;
      if (altValue && !parentEle.parentNode.classList.contains("justified-gallery")) {
        const ele = document.createElement("div");
        ele.className = "img-alt is-center";
        ele.textContent = altValue;
        parentEle.insertBefore(ele, item.nextSibling);
      }
    });
  }

  /**
   * Lightbox
   */
  const runLightbox = () => {
    anzhiyu.loadLightbox(document.querySelectorAll("#article-container img:not(.no-lightbox)"));
  };

  /**
   * justified-gallery 圖庫排版
   */
  const runJustifiedGallery = function (ele) {
    ele.forEach(item => {
      const $imgList = item.querySelectorAll("img");

      $imgList.forEach(i => {
        const dataLazySrc = i.getAttribute("data-lazy-src");
        if (dataLazySrc) i.src = dataLazySrc;
        anzhiyu.wrap(i, "div", { class: "fj-gallery-item" });
      });
    });

    if (window.fjGallery) {
      setTimeout(() => {
        anzhiyu.initJustifiedGallery(ele);
      }, 100);
      return;
    }

    const newEle = document.createElement("link");
    newEle.rel = "stylesheet";
    newEle.href = GLOBAL_CONFIG.source.justifiedGallery.css;
    document.body.appendChild(newEle);
    getScript(`${GLOBAL_CONFIG.source.justifiedGallery.js}`).then(() => {
      anzhiyu.initJustifiedGallery(ele);
    });
  };

  /**
   * 滾動處理
   */
  const scrollFn = function () {
    const $rightside = document.getElementById("rightside");
    const innerHeight = window.innerHeight + 56;

    // 當滾動條小于 56 的時候
    if (document.body.scrollHeight <= innerHeight) {
      $rightside.style.cssText = "opacity: 1; transform: translateX(-58px)";
      return;
    }

    // find the scroll direction
    function scrollDirection(currentTop) {
      const result = currentTop > initTop; // true is down & false is up
      initTop = currentTop;
      return result;
    }

    let initTop = 0;
    let isChatShow = true;
    const $header = document.getElementById("page-header");
    const isChatBtnHide = typeof chatBtnHide === "function";
    const isChatBtnShow = typeof chatBtnShow === "function";

    const scroolTask = anzhiyu.throttle(() => {
      const currentTop = window.scrollY || document.documentElement.scrollTop;
      const isDown = scrollDirection(currentTop);
      if (currentTop > 56) {
        if (isDown) {
          if ($header.classList.contains("nav-visible")) $header.classList.remove("nav-visible");
          if (isChatBtnShow && isChatShow === true) {
            chatBtnHide();
            isChatShow = false;
          }
        } else {
          if (!$header.classList.contains("nav-visible")) $header.classList.add("nav-visible");
          if (isChatBtnHide && isChatShow === false) {
            chatBtnShow();
            isChatShow = true;
          }
        }
        $header.classList.add("nav-fixed");
        anzhiyu.initThemeColor();
        if (window.getComputedStyle($rightside).getPropertyValue("opacity") === "0") {
          $rightside.style.cssText = "opacity: 0.8; transform: translateX(-58px)";
        }
      } else {
        if (currentTop === 0) {
          if (!$header.querySelector(".bili-banner")) {
            $header.classList.remove("nav-fixed");
            $header.classList.remove("nav-visible");
          }
          // 修改顶栏颜色
          anzhiyu.initThemeColor();
        }
        $rightside.style.cssText = "opacity: ''; transform: ''";
      }

      if (document.body.scrollHeight <= innerHeight) {
        $rightside.style.cssText = "opacity: 0.8; transform: translateX(-58px)";
      }
    }, 200);

    window.scrollCollect = scroolTask;
    window.addEventListener("scroll", scrollCollect);
  };

  /**
   * toc,anchor
   */
  const scrollFnToDo = function () {
    const isToc = GLOBAL_CONFIG_SITE.isToc;
    const isAnchor = GLOBAL_CONFIG.isAnchor;
    const $article = document.getElementById("article-container");

    if (!($article && (isToc || isAnchor))) return;

    let $tocLink, $cardToc, scrollPercent, autoScrollToc, isExpand;

    if (isToc) {
      const $cardTocLayout = document.getElementById("card-toc");
      $cardToc = $cardTocLayout.getElementsByClassName("toc-content")[0];
      $tocLink = $cardToc.querySelectorAll(".toc-link");
      const $tocPercentage = $cardTocLayout.querySelector(".toc-percentage");
      isExpand = $cardToc.classList.contains("is-expand");

      scrollPercent = currentTop => {
        const docHeight = $article.clientHeight;
        const winHeight = document.documentElement.clientHeight;
        const headerHeight = $article.offsetTop;
        const contentMath =
          docHeight > winHeight ? docHeight - winHeight : document.documentElement.scrollHeight - winHeight;
        const scrollPercent = (currentTop - headerHeight) / contentMath;
        const scrollPercentRounded = Math.round(scrollPercent * 100);
        const percentage = scrollPercentRounded > 100 ? 100 : scrollPercentRounded <= 0 ? 0 : scrollPercentRounded;
        $tocPercentage.textContent = percentage;
      };

      window.mobileToc = {
        open: () => {
          $cardTocLayout.style.cssText = "animation: toc-open .3s; opacity: 1; right: 55px";
        },

        close: () => {
          $cardTocLayout.style.animation = "toc-close .2s";
          setTimeout(() => {
            $cardTocLayout.style.cssText = "opacity:''; animation: ''; right: ''";
          }, 100);
        },
      };

      // toc元素點擊
      $cardToc.addEventListener("click", e => {
        e.preventDefault();
        const target = e.target.classList;
        if (target.contains("toc-content")) return;
        const $target = target.contains("toc-link") ? e.target : e.target.parentElement;
        anzhiyu.scrollToDest(
          anzhiyu.getEleTop(document.getElementById(decodeURI($target.getAttribute("href")).replace("#", ""))),
          300
        );
        if (window.innerWidth < 900) {
          window.mobileToc.close();
        }
      });

      autoScrollToc = item => {
        const activePosition = item.getBoundingClientRect().top;
        const sidebarScrollTop = $cardToc.scrollTop;
        if (activePosition > document.documentElement.clientHeight - 100) {
          $cardToc.scrollTop = sidebarScrollTop + 150;
        }
        if (activePosition < 100) {
          $cardToc.scrollTop = sidebarScrollTop - 150;
        }
      };
    }

    // find head position & add active class
    const list = $article.querySelectorAll("h1,h2,h3,h4,h5,h6");
    let detectItem = "";
    const findHeadPosition = function (top) {
      if (top === 0) {
        return false;
      }

      let currentId = "";
      let currentIndex = "";

      list.forEach(function (ele, index) {
        if (top > anzhiyu.getEleTop(ele) - 80) {
          const id = ele.id;
          currentId = id ? "#" + encodeURI(id) : "";
          currentIndex = index;
        }
      });

      if (detectItem === currentIndex) return;

      if (isAnchor) anzhiyu.updateAnchor(currentId);

      detectItem = currentIndex;

      if (isToc) {
        $cardToc.querySelectorAll(".active").forEach(i => {
          i.classList.remove("active");
        });

        if (currentId === "") {
          return;
        }

        const currentActive = $tocLink[currentIndex];
        currentActive.classList.add("active");

        setTimeout(() => {
          autoScrollToc(currentActive);
        }, 0);

        if (isExpand) return;
        let parent = currentActive.parentNode;

        for (; !parent.matches(".toc"); parent = parent.parentNode) {
          if (parent.matches("li")) parent.classList.add("active");
        }
      }
    };

    // main of scroll
    window.tocScrollFn = function () {
      return anzhiyu.throttle(function () {
        const currentTop = window.scrollY || document.documentElement.scrollTop;
        isToc && scrollPercent(currentTop);
        findHeadPosition(currentTop);
      }, 100)();
    };
    window.addEventListener("scroll", tocScrollFn);
  };

  /**
   * Rightside
   */
  const rightSideFn = {
    switchReadMode: () => {
      // read-mode
      const $body = document.body;
      $body.classList.add("read-mode");
      const newEle = document.createElement("button");
      newEle.type = "button";
      newEle.className = "fas fa-sign-out-alt exit-readmode";
      $body.appendChild(newEle);

      function clickFn() {
        $body.classList.remove("read-mode");
        newEle.remove();
        newEle.removeEventListener("click", clickFn);
      }

      newEle.addEventListener("click", clickFn);
    },
    switchDarkMode: () => {
      // Switch Between Light And Dark Mode
      const nowMode = document.documentElement.getAttribute("data-theme") === "dark" ? "dark" : "light";
      if (nowMode === "light") {
        activateDarkMode();
        saveToLocal.set("theme", "dark", 2);
        GLOBAL_CONFIG.Snackbar !== undefined && anzhiyu.snackbarShow(GLOBAL_CONFIG.Snackbar.day_to_night);
      } else {
        activateLightMode();
        saveToLocal.set("theme", "light", 2);
        GLOBAL_CONFIG.Snackbar !== undefined && anzhiyu.snackbarShow(GLOBAL_CONFIG.Snackbar.night_to_day);
      }
      // handle some cases
      typeof runMermaid === "function" && window.runMermaid();
    },
    showOrHideBtn: e => {
      // rightside 點擊設置 按鈕 展開
      const rightsideHideClassList = document.getElementById("rightside-config-hide").classList;
      rightsideHideClassList.toggle("show");
      if (e.classList.contains("show")) {
        rightsideHideClassList.add("status");
        setTimeout(() => {
          rightsideHideClassList.remove("status");
        }, 300);
      }
      e.classList.toggle("show");
    },
    scrollToTop: () => {
      // Back to top
      anzhiyu.scrollToDest(0, 500);
    },
    hideAsideBtn: () => {
      // Hide aside
      const $htmlDom = document.documentElement.classList;
      $htmlDom.contains("hide-aside")
        ? saveToLocal.set("aside-status", "show", 2)
        : saveToLocal.set("aside-status", "hide", 2);
      $htmlDom.toggle("hide-aside");
    },
    switchConsole: () => {
      // switch console
      const consoleEl = document.getElementById("console");
      //初始化隐藏边栏
      const $htmlDom = document.documentElement.classList;
      $htmlDom.contains("hide-aside")
        ? document.querySelector("#consoleHideAside").classList.add("on")
        : document.querySelector("#consoleHideAside").classList.remove("on");
      if (consoleEl.classList.contains("show")) {
        consoleEl.classList.remove("show");
      } else {
        consoleEl.classList.add("show");
      }
    },

    runMobileToc: () => {
      if (window.getComputedStyle(document.getElementById("card-toc")).getPropertyValue("opacity") === "0")
        window.mobileToc.open();
      else window.mobileToc.close();
    },
  };

  document.getElementById("rightside").addEventListener("click", function (e) {
    const $target = e.target.id ? e.target : e.target.parentNode;
    switch ($target.id) {
      case "go-up":
        rightSideFn.scrollToTop();
        break;
      case "rightside_config":
        rightSideFn.showOrHideBtn($target);
        break;
      case "mobile-toc-button":
        rightSideFn.runMobileToc();
        break;
      case "readmode":
        rightSideFn.switchReadMode();
        break;
      case "darkmode":
        rightSideFn.switchDarkMode();
        break;
      case "hide-aside-btn":
        rightSideFn.hideAsideBtn();
        break;
      case "center-console":
        rightSideFn.switchConsole();
        break;
      default:
        break;
    }
  });

  /**
   * menu
   * 側邊欄sub-menu 展開/收縮
   */
  const clickFnOfSubMenu = () => {
    document.querySelectorAll("#sidebar-menus .site-page.group").forEach(function (item) {
      item.addEventListener("click", function () {
        this.classList.toggle("hide");
      });
    });
  };

  /**
   * 複製時加上版權信息
   */
  const addCopyright = () => {
    const copyright = GLOBAL_CONFIG.copyright;
    document.body.oncopy = e => {
      e.preventDefault();
      let textFont;
      const copyFont = window.getSelection(0).toString();
      if (copyFont.length > copyright.limitCount) {
        textFont =
          copyFont +
          "\n" +
          "\n" +
          "\n" +
          copyright.languages.author +
          "\n" +
          copyright.languages.link +
          window.location.href +
          "\n" +
          copyright.languages.source +
          "\n" +
          copyright.languages.info;
      } else {
        textFont = copyFont;
      }
      if (e.clipboardData) {
        return e.clipboardData.setData("text", textFont);
      } else {
        return window.clipboardData.setData("text", textFont);
      }
    };
  };

  /**
   * 網頁運行時間
   */
  const addRuntime = () => {
    const $runtimeCount = document.getElementById("runtimeshow");
    if ($runtimeCount) {
      const publishDate = $runtimeCount.getAttribute("data-publishDate");
      $runtimeCount.innerText = anzhiyu.diffDate(publishDate) + " " + GLOBAL_CONFIG.runtime;
    }
  };

  /**
   * 最後一次更新時間
   */
  const addLastPushDate = () => {
    const $lastPushDateItem = document.getElementById("last-push-date");
    if ($lastPushDateItem) {
      const lastPushDate = $lastPushDateItem.getAttribute("data-lastPushDate");
      $lastPushDateItem.innerText = anzhiyu.diffDate(lastPushDate, true);
    }
  };

  /**
   * table overflow
   */
  const addTableWrap = () => {
    const $table = document.querySelectorAll("#article-container :not(.highlight) > table, #article-container > table");
    if ($table.length) {
      $table.forEach(item => {
        anzhiyu.wrap(item, "div", { class: "table-wrap" });
      });
    }
  };

  /**
   * tag-hide
   */
  const clickFnOfTagHide = function () {
    const $hideInline = document.querySelectorAll("#article-container .hide-button");
    if ($hideInline.length) {
      $hideInline.forEach(function (item) {
        item.addEventListener("click", function (e) {
          const $this = this;
          $this.classList.add("open");
          const $fjGallery = $this.nextElementSibling.querySelectorAll(".fj-gallery");
          $fjGallery.length && anzhiyu.initJustifiedGallery($fjGallery);
        });
      });
    }
  };

  const tabsFn = {
    clickFnOfTabs: function () {
      document.querySelectorAll("#article-container .tab > button").forEach(function (item) {
        item.addEventListener("click", function (e) {
          const $this = this;
          const $tabItem = $this.parentNode;

          if (!$tabItem.classList.contains("active")) {
            const $tabContent = $tabItem.parentNode.nextElementSibling;
            const $siblings = anzhiyu.siblings($tabItem, ".active")[0];
            $siblings && $siblings.classList.remove("active");
            $tabItem.classList.add("active");
            const tabId = $this.getAttribute("data-href").replace("#", "");
            const childList = [...$tabContent.children];
            childList.forEach(item => {
              if (item.id === tabId) item.classList.add("active");
              else item.classList.remove("active");
            });
            const $isTabJustifiedGallery = $tabContent.querySelectorAll(`#${tabId} .fj-gallery`);
            if ($isTabJustifiedGallery.length > 0) {
              anzhiyu.initJustifiedGallery($isTabJustifiedGallery);
            }
          }
        });
      });
    },
    backToTop: () => {
      document.querySelectorAll("#article-container .tabs .tab-to-top").forEach(function (item) {
        item.addEventListener("click", function () {
          anzhiyu.scrollToDest(anzhiyu.getEleTop(anzhiyu.getParents(this, ".tabs")), 300);
        });
      });
    },
  };

  const toggleCardCategory = function () {
    const $cardCategory = document.querySelectorAll("#aside-cat-list .card-category-list-item.parent i");
    if ($cardCategory.length) {
      $cardCategory.forEach(function (item) {
        item.addEventListener("click", function (e) {
          e.preventDefault();
          const $this = this;
          $this.classList.toggle("expand");
          const $parentEle = $this.parentNode.nextElementSibling;
          if (anzhiyu.isHidden($parentEle)) {
            $parentEle.style.display = "block";
          } else {
            $parentEle.style.display = "none";
          }
        });
      });
    }
  };

  const switchComments = function () {
    let switchDone = false;
    const $switchBtn = document.querySelector("#comment-switch > .switch-btn");
    $switchBtn &&
      $switchBtn.addEventListener("click", function () {
        this.classList.toggle("move");
        document.querySelectorAll("#post-comment > .comment-wrap > div").forEach(function (item) {
          if (anzhiyu.isHidden(item)) {
            item.style.cssText = "display: block;animation: tabshow .5s";
          } else {
            item.style.cssText = "display: none;animation: ''";
          }
        });

        if (!switchDone && typeof loadOtherComment === "function") {
          switchDone = true;
          loadOtherComment();
        }
      });
  };

  const addPostOutdateNotice = function () {
    const data = GLOBAL_CONFIG.noticeOutdate;
    const diffDay = anzhiyu.diffDate(GLOBAL_CONFIG_SITE.postUpdate);
    if (diffDay >= data.limitDay) {
      const ele = document.createElement("div");
      ele.className = "post-outdate-notice";
      ele.textContent = data.messagePrev + " " + diffDay + " " + data.messageNext;
      const $targetEle = document.getElementById("article-container");
      if (data.position === "top") {
        $targetEle.insertBefore(ele, $targetEle.firstChild);
      } else {
        $targetEle.appendChild(ele);
      }
    }
  };

  const lazyloadImg = () => {
    window.lazyLoadInstance = new LazyLoad({
      elements_selector: "img",
      threshold: 0,
      data_src: "lazy-src",
    });
  };

  const relativeDate = function (selector) {
    selector.forEach(item => {
      const $this = item;
      const timeVal = $this.getAttribute("datetime");
      $this.innerText = anzhiyu.diffDate(timeVal, true);
      $this.style.display = "inline";
    });
  };

  const mouseleaveHomeCard = function () {
    const topGroup = document.querySelector(".topGroup");
    if (!topGroup) return;
    //首页大卡片恢复显示
    topGroup.addEventListener("mouseleave", function () {
      document.getElementById("todayCard").classList.remove("hide");
      document.getElementById("todayCard").style.zIndex = 1;
    });
  };

  // 表情放大
  const owoBig = function () {
    let flag = 1, // 设置节流阀
      owo_time = "", // 设置计时器
      m = 3; // 设置放大倍数
    // 创建盒子
    let div = document.createElement("div");
    // 设置ID
    div.id = "owo-big";
    // 插入盒子
    let body = document.querySelector("body");
    body.appendChild(div);

    document.getElementById("post-comment").addEventListener("DOMNodeInserted", dom => {
      if (dom.target.classList && dom.target.classList.value == "OwO-body") {
        let owo_body = dom.target;

        // 禁用右键（手机端长按会出现右键菜单，为了体验给禁用掉）
        owo_body.addEventListener("contextmenu", e => e.preventDefault());

        // 鼠标移入
        owo_body.addEventListener("mouseover", e => {
          if (e.target.tagName == "IMG" && flag) {
            flag = 0;
            // 移入300毫秒后显示盒子
            owo_time = setTimeout(() => {
              let height = e.target.clientHeight * m; // 盒子高
              let width = e.target.clientWidth * m; // 盒子宽
              let left = e.x - e.offsetX - (width - e.target.clientWidth) / 2; // 盒子与屏幕左边距离
              if (left + width > body.clientWidth) {
                left -= left + width - body.clientWidth + 10;
              } // 右边缘检测，防止超出屏幕
              if (left < 0) left = 10; // 左边缘检测，防止超出屏幕
              let top = e.y - e.offsetY; // 盒子与屏幕顶部距离

              // 设置盒子样式
              div.style.height = height + "px";
              div.style.width = width + "px";
              div.style.left = left + "px";
              div.style.top = top + "px";
              div.style.display = "flex";
              // 在盒子中插入图片
              div.innerHTML = `<img src="${e.target.src}">`;
            }, 300);
          }
        });

        // 鼠标移出
        owo_body.addEventListener("mouseout", e => {
          // 隐藏盒子
          div.style.display = "none";
          flag = 1;
          clearTimeout(owo_time);
        });
      }
    });
  };

  // 网页百分比
  const anzhiyuScrollFn = function () {
    // 第一次滑动到底部的标识符
    let scrollBottomFirstFlag = false;
    // 缓存常用dom元素
    const musicDom = document.getElementById("nav-music"),
      footerDom = document.getElementById("footer"),
      waterfallDom = document.getElementById("waterfall"),
      percentBtn = document.getElementById("percent");

    // 页面底部Dom是否存在
    let pageBottomDomFlag = document.getElementById("post-comment") || document.getElementById("footer");

    function scrollFn() {
      // 自动隐藏音乐
      if (footerDom && musicDom && 768 < document.body.clientWidth) {
        musicDom.style.bottom = !anzhiyu.isInViewPortOfOne(footerDom) ? "20px" : "-10px";
        musicDom.style.opacity = !anzhiyu.isInViewPortOfOne(footerDom) ? "1" : "0";
      }

      // 处理滚动百分比
      let scrollTop = document.documentElement.scrollTop || window.pageYOffset, // 卷去高度
        scrollHeight =
          Math.max(
            document.body.scrollHeight,
            document.documentElement.scrollHeight,
            document.body.offsetHeight,
            document.documentElement.offsetHeight,
            document.body.clientHeight,
            document.documentElement.clientHeight
          ) - document.documentElement.clientHeight, // 整个网页高度 减去 可视高度
        result = Math.round((scrollTop / scrollHeight) * 100); // 计算百分比

      result = Math.min(99, Math.max(0, result));

      // 滚动到底部区域需要做的操作
      if (anzhiyu.isInViewPortOfOne(pageBottomDomFlag) || 90 < result) {
        document.getElementById("nav-totop").classList.add("long");
        percentBtn.textContent = "返回顶部";
        scrollBottomFirstFlag = true;
      } else {
        document.getElementById("nav-totop").classList.remove("long");
        percentBtn.textContent = result;
      }

      // 如果当前页面需要瀑布流，就处理瀑布流
      if (waterfallDom) {
        const waterfallResult = scrollTop % document.documentElement.clientHeight; // 卷去一个视口
        if (!scrollBottomFirstFlag && waterfallResult + 100 >= document.documentElement.clientHeight) {
          console.info(waterfallResult, document.documentElement.clientHeight);
          setTimeout(() => {
            waterfall("#waterfall");
          }, 500);
        } else {
          setTimeout(() => {
            waterfallDom && waterfall("#waterfall");
          }, 500);
        }
      }
    }

    // 绑定滚动处理函数
    window.anzhiyuScrollFnToDo = anzhiyu.throttle(scrollFn, 48); // 执行函数
    window.addEventListener("scroll", anzhiyuScrollFnToDo);
  };

  //封面纯色
  const coverColor = function () {
    var path = document.getElementById("post-top-bg")?.src;
    // console.log(path);
    const root = document.querySelector(":root");
    if (path !== undefined) {
      var httpRequest = new XMLHttpRequest(); //第一步：建立所需的对象
      httpRequest.open("GET", path + "?imageAve", true); //第二步：打开连接  将请求参数写在url中  ps:"./Ptest.php?name=test&nameone=testone"
      httpRequest.send(); //第三步：发送请求  将请求参数写在URL中
      /**
       * 获取数据后的处理程序
       */
      httpRequest.onreadystatechange = function () {
        if (httpRequest.readyState == 4 && httpRequest.status == 200) {
          var json = httpRequest.responseText; //获取到json字符串，还需解析
          try {
            var obj = JSON.parse(json, function (key, value) {
              return value;
            });

            var value = obj.RGB;
            value = "#" + value.slice(2);

            // 亮色转化
            if (getContrastYIQ(value) == "light") {
              value = LightenDarkenColor(colorHex(value), -40);
            }
            // 设置转化后的值
            root.style.setProperty("--anzhiyu-bar-background", value);
            // 修改顶栏tab bar状态栏
            anzhiyu.initThemeColor();
          } catch (err) {
            // 在这里处理 JSON.parse() 抛出的错误
            root.style.setProperty("--anzhiyu-bar-background", "var(--anzhiyu-main)");
            // 修改顶栏tab bar状态栏
            anzhiyu.initThemeColor();
          }
        }
      };
    } else {
      // 没有获取到文章顶图元素，也就是不在文章页，设置bar meta样式
      root.style.setProperty("--anzhiyu-bar-background", "var(--anzhiyu-meta-theme-color)");
    }
    anzhiyu.initThemeColor();
  };

  //RGB颜色转化为16进制颜色
  const colorHex = function (str) {
    var reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
    var that = str;
    if (/^(rgb|RGB)/.test(that)) {
      var aColor = that.replace(/(?:\(|\)|rgb|RGB)*/g, "").split(",");
      var strHex = "#";
      for (var i = 0; i < aColor.length; i++) {
        var hex = Number(aColor[i]).toString(16);
        if (hex === "0") {
          hex += hex;
        }
        strHex += hex;
      }
      if (strHex.length !== 7) {
        strHex = that;
      }
      return strHex;
    } else if (reg.test(that)) {
      var aNum = that.replace(/#/, "").split("");
      if (aNum.length === 6) {
        return that;
      } else if (aNum.length === 3) {
        var numHex = "#";
        for (var i = 0; i < aNum.length; i += 1) {
          numHex += aNum[i] + aNum[i];
        }
        return numHex;
      }
    } else {
      return that;
    }
  };

  //16进制颜色转化为RGB颜色
  const colorRgb = function (str) {
    var reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
    var sColor = str.toLowerCase();
    if (sColor && reg.test(sColor)) {
      if (sColor.length === 4) {
        var sColorNew = "#";
        for (var i = 1; i < 4; i += 1) {
          sColorNew += sColor.slice(i, i + 1).concat(sColor.slice(i, i + 1));
        }
        sColor = sColorNew;
      }
      //处理六位的颜色值
      var sColorChange = [];
      for (var i = 1; i < 7; i += 2) {
        sColorChange.push(parseInt("0x" + sColor.slice(i, i + 2)));
      }
      return "rgb(" + sColorChange.join(",") + ")";
    } else {
      return sColor;
    }
  };

  //变暗变亮主方法
  const LightenDarkenColor = function (col, amt) {
    var usePound = false;

    if (col[0] == "#") {
      col = col.slice(1);
      usePound = true;
    }

    var num = parseInt(col, 16);

    var r = (num >> 16) + amt;

    if (r > 255) r = 255;
    else if (r < 0) r = 0;

    var b = ((num >> 8) & 0x00ff) + amt;

    if (b > 255) b = 255;
    else if (b < 0) b = 0;

    var g = (num & 0x0000ff) + amt;

    if (g > 255) g = 255;
    else if (g < 0) g = 0;

    return (usePound ? "#" : "") + String("000000" + (g | (b << 8) | (r << 16)).toString(16)).slice(-6);
  };
  //判断是否为亮色
  const getContrastYIQ = function (hexcolor) {
    var colorrgb = colorRgb(hexcolor);
    var colors = colorrgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
    var red = colors[1];
    var green = colors[2];
    var blue = colors[3];
    var brightness;
    brightness = red * 299 + green * 587 + blue * 114;
    brightness = brightness / 255000;
    if (brightness >= 0.5) {
      return "light";
    } else {
      return "dark";
    }
  };

  //监听跳转页面输入框是否按下回车
  const listenToPageInputPress = function () {
    var input = document.getElementById("toPageText");
    if (input) {
      input.addEventListener("keydown", event => {
        if (event.keyCode === 13) {
          // 如果按下的是回车键，则执行特定的函数
          anzhiyu.toPage();
          var link = document.getElementById("toPageButton");
          var href = link.href;
          pjax.loadUrl(href);
        }
      });
    }
  };

  // 监听nav是否被其他音频暂停⏸️
  const listenNavMusicPause = function () {
    const timer = setInterval(() => {
      if (navMusicEl.querySelector("#nav-music meting-js").aplayer) {
        clearInterval(timer);
        navMusicEl.querySelector("#nav-music meting-js").aplayer.on("pause", function () {
          navMusicEl.classList.remove("playing");
          document.getElementById("menu-music-toggle").innerHTML =
            '<i class="fa-solid fa-play"></i><span>播放音乐</span>';
          document.getElementById("nav-music-hoverTips").innerHTML = "音乐已暂停";
          document.querySelector("#consoleMusic").classList.remove("on");
          anzhiyu_musicPlaying = false;
          navMusicEl.classList.remove("stretch");
        });
      }
    }, 16);
  };

  // 开发者工具键盘监听
  window.onkeydown = function (e) {
    123 === e.keyCode && anzhiyu.snackbarShow("开发者模式已打开，请遵循GPL协议", !1);
  };

  const unRefreshFn = function () {
    window.addEventListener("resize", () => {
      adjustMenu(false);
      anzhiyu.isHidden(document.getElementById("toggle-menu")) && mobileSidebarOpen && sidebarFn.close();
    });

    document.getElementById("menu-mask").addEventListener("click", e => {
      sidebarFn.close();
    });
    GLOBAL_CONFIG.islazyload && lazyloadImg();
    GLOBAL_CONFIG.copyright !== undefined && addCopyright();
    listenNavMusicPause();
    clickFnOfSubMenu();
  };

  window.refreshFn = function () {
    initAdjust();

    if (GLOBAL_CONFIG_SITE.isPost) {
      GLOBAL_CONFIG.noticeOutdate !== undefined && addPostOutdateNotice();
      GLOBAL_CONFIG.relativeDate.post && relativeDate(document.querySelectorAll("#post-meta time"));
    } else {
      GLOBAL_CONFIG.relativeDate.homepage && relativeDate(document.querySelectorAll("#recent-posts time"));
      GLOBAL_CONFIG.runtime && addRuntime();
      addLastPushDate();
      toggleCardCategory();
    }

    scrollFnToDo();
    GLOBAL_CONFIG_SITE.isHome && scrollDownInIndex();
    addHighlightTool();
    GLOBAL_CONFIG.isPhotoFigcaption && addPhotoFigcaption();
    scrollFn();

    const $jgEle = document.querySelectorAll("#article-container .fj-gallery");
    $jgEle.length && runJustifiedGallery($jgEle);

    runLightbox();
    addTableWrap();
    clickFnOfTagHide();
    tabsFn.clickFnOfTabs();
    tabsFn.backToTop();
    switchComments();
    document.getElementById("toggle-menu").addEventListener("click", () => {
      sidebarFn.open();
    });

    // 如果当前页有评论就执行函数
    if (document.getElementById("post-comment")) owoBig();

    mouseleaveHomeCard();
    coverColor();
    anzhiyuScrollFn();
    listenToPageInputPress();
  };

  refreshFn();
  unRefreshFn();
});
