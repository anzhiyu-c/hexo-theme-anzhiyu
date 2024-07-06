// 第一次播放音樂
var anzhiyu_musicFirst = false;
// 快捷鍵
var anzhiyu_keyboard = null;
// 音樂播放狀態
var anzhiyu_musicPlaying = false;
var $bodyWrap = document.getElementById("body-wrap");
var anzhiyu_intype = false;
var anzhiyu_keyUpEvent_timeoutId = null;
var anzhiyu_keyUpShiftDelayEvent_timeoutId = null;

// 右鍵菜單對象
var rm = null;

var popupWindowTimer = null;

var adjectives = [
  "美麗的",
  "英俊的",
  "聰明的",
  "勇敢的",
  "可愛的",
  "慷慨的",
  "善良的",
  "可靠的",
  "開朗的",
  "成熟的",
  "穩重的",
  "真誠的",
  "幽默的",
  "豁達的",
  "有趣的",
  "活潑的",
  "優雅的",
  "敏捷的",
  "溫柔的",
  "溫暖的",
  "敬業的",
  "細心的",
  "耐心的",
  "深沉的",
  "樸素的",
  "含蓄的",
  "率直的",
  "開放的",
  "務實的",
  "堅強的",
  "自信的",
  "謙虛的",
  "文靜的",
  "深刻的",
  "純真的",
  "朝氣蓬勃的",
  "慎重的",
  "大方的",
  "頑強的",
  "迷人的",
  "機智的",
  "善解人意的",
  "富有想象力的",
  "有魅力的",
  "獨立的",
  "好奇的",
  "乾淨的",
  "寬容的",
  "尊重他人的",
  "體貼的",
  "守信的",
  "有耐性的",
  "有責任心的",
  "有擔當的",
  "有遠見的",
  "有智慧的",
  "有眼光的",
  "有冒險精神的",
  "有愛心的",
  "有同情心的",
  "喜歡思考的",
  "喜歡學習的",
  "具有批判性思維的",
  "善於表達的",
  "善於溝通的",
  "善於合作的",
  "善於領導的",
  "有激情的",
  "有幽默感的",
  "有思想的",
  "有個性的",
  "有正義感的",
  "有責任感的",
  "有創造力的",
  "有想象力的",
  "有藝術細胞的",
  "有團隊精神的",
  "有協調能力的",
  "有決策能力的",
  "有組織能力的",
  "有學習能力的",
  "有執行能力的",
  "有分析能力的",
  "有邏輯思維的",
  "有創新能力的",
  "有專業素養的",
  "有商業頭腦的",
];
var vegetablesAndFruits = [
  "蘿蔔",
  "白菜",
  "芹菜",
  "生菜",
  "青椒",
  "辣椒",
  "茄子",
  "豆角",
  "黃瓜",
  "西紅柿",
  "洋蔥",
  "大蒜",
  "土豆",
  "南瓜",
  "豆腐",
  "韭菜",
  "花菜",
  "西蘭花",
  "蘑菇",
  "金針菇",
  "蘋果",
  "香蕉",
  "橙子",
  "檸檬",
  "獼猴桃",
  "草莓",
  "葡萄",
  "桃子",
  "杏子",
  "李子",
  "石榴",
  "西瓜",
  "哈密瓜",
  "蜜瓜",
  "櫻桃",
  "藍莓",
  "柿子",
  "橄欖",
  "柚子",
  "火龍果",
];

// 已隨機的歌曲
var selectRandomSong = [];
// 音樂默認聲音大小
var musicVolume = 0.8;
// 是否切換了周杰倫音樂列表
var changeMusicListFlag = false;
// 當前默認播放列表
var defaultPlayMusicList = [];
var themeColorMeta, pageHeaderEl, navMusicEl, consoleEl;

document.addEventListener("DOMContentLoaded", function () {
  let headerContentWidth, $nav, $rightMenu;
  let mobileSidebarOpen = false;

  const adjustMenu = init => {
    const getAllWidth = ele => {
      return Array.from(ele).reduce((width, i) => width + i.offsetWidth, 0);
    };

    if (init) {
      const blogInfoWidth = getAllWidth(document.querySelector("#blog_name > a").children);
      const menusWidth = getAllWidth(document.getElementById("menus").children);
      headerContentWidth = blogInfoWidth + menusWidth;
      $nav = document.getElementById("nav");
    }

    const hideMenuIndex = window.innerWidth <= 768 || headerContentWidth > $nav.offsetWidth - 120;
    $nav.classList.toggle("hide-menu", hideMenuIndex);
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
      anzhiyu.animateIn(document.getElementById("menu-mask"), "to_show 0.5s");
      document.getElementById("sidebar-menus").classList.add("open");
      mobileSidebarOpen = true;
    },
    close: () => {
      const $body = document.body;
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
    const handleScrollToDest = () => {
      const bbTimeList = document.getElementById("bbTimeList");
      if (bbTimeList) {
        anzhiyu.scrollToDest(bbTimeList.offsetTop - 62, 300);
      } else {
        anzhiyu.scrollToDest(document.getElementById("home_top").offsetTop - 60, 300);
      }
    };

    const $scrollDownEle = document.getElementById("scroll-down");
    $scrollDownEle && anzhiyu.addEventListenerPjax($scrollDownEle, "click", handleScrollToDest);
  };

  /**
   * 代碼
   * 只適用於Hexo默認的代碼渲染
   */
  const addHighlightTool = function () {
    const highLight = GLOBAL_CONFIG.highlight;
    if (!highLight) return;

    const { highlightCopy, highlightLang, highlightHeightLimit, plugin } = highLight;
    const isHighlightShrink = GLOBAL_CONFIG_SITE.isHighlightShrink;
    const isShowTool = highlightCopy || highlightLang || isHighlightShrink !== undefined;
    const $figureHighlight =
      plugin === "highlight.js"
        ? document.querySelectorAll("figure.highlight")
        : document.querySelectorAll('pre[class*="language-"]');

    if (!((isShowTool || highlightHeightLimit) && $figureHighlight.length)) return;

    const isPrismjs = plugin === "prismjs";
    const highlightShrinkClass = isHighlightShrink === true ? "closed" : "";
    const highlightShrinkEle =
      isHighlightShrink !== undefined
        ? '<i class="anzhiyufont anzhiyu-icon-angle-down expand ${highlightShrinkClass}"></i>'
        : "";
    const highlightCopyEle = highlightCopy
      ? '<div class="copy-notice"></div><i class="anzhiyufont anzhiyu-icon-paste copy-button"></i>'
      : "";

    const alertInfo = (ele, text) => {
      if (GLOBAL_CONFIG.Snackbar !== undefined) {
        anzhiyu.snackbarShow(text);
      } else {
        const prevEle = ele.previousElementSibling;
        prevEle.textContent = text;
        prevEle.style.opacity = 1;
        setTimeout(() => {
          prevEle.style.opacity = 0;
        }, 800);
      }
    };

    const copy = ctx => {
      if (document.queryCommandSupported && document.queryCommandSupported("copy")) {
        document.execCommand("copy");
        alertInfo(ctx, GLOBAL_CONFIG.copy.success);
      } else {
        alertInfo(ctx, GLOBAL_CONFIG.copy.noSupport);
      }
    };

    // click events
    const highlightCopyFn = ele => {
      const $buttonParent = ele.parentNode;
      $buttonParent.classList.add("copy-true");
      const selection = window.getSelection();
      const range = document.createRange();
      const preCodeSelector = isPrismjs ? "pre code" : "table .code pre";
      range.selectNodeContents($buttonParent.querySelectorAll(`${preCodeSelector}`)[0]);
      selection.removeAllRanges();
      selection.addRange(range);
      copy(ele.lastChild);
      selection.removeAllRanges();
      $buttonParent.classList.remove("copy-true");
    };

    const highlightShrinkFn = ele => {
      ele.classList.toggle("closed");
    };

    const highlightToolsFn = function (e) {
      const $target = e.target.classList;
      if ($target.contains("expand")) highlightShrinkFn(this);
      else if ($target.contains("copy-button")) highlightCopyFn(this);
    };

    const expandCode = function () {
      this.classList.toggle("expand-done");
    };

    const createEle = (lang, item, service) => {
      const fragment = document.createDocumentFragment();

      if (isShowTool) {
        const hlTools = document.createElement("div");
        hlTools.className = `highlight-tools ${highlightShrinkClass}`;
        hlTools.innerHTML = highlightShrinkEle + lang + highlightCopyEle;
        anzhiyu.addEventListenerPjax(hlTools, "click", highlightToolsFn);
        fragment.appendChild(hlTools);
      }

      if (highlightHeightLimit && item.offsetHeight > highlightHeightLimit + 30) {
        const ele = document.createElement("div");
        ele.className = "code-expand-btn";
        ele.innerHTML = '<i class="anzhiyufont anzhiyu-icon-angle-double-down"></i>';
        anzhiyu.addEventListenerPjax(ele, "click", expandCode);
        fragment.appendChild(ele);
      }

      if (service === "hl") {
        item.insertBefore(fragment, item.firstChild);
      } else {
        item.parentNode.insertBefore(fragment, item);
      }
    };

    if (isPrismjs) {
      $figureHighlight.forEach(item => {
        if (highlightLang) {
          const langName = item.getAttribute("data-language") || "Code";
          const highlightLangEle = `<div class="code-lang">${langName}</div>`;
          anzhiyu.wrap(item, "figure", { class: "highlight" });
          createEle(highlightLangEle, item);
        } else {
          anzhiyu.wrap(item, "figure", { class: "highlight" });
          createEle("", item);
        }
      });
    } else {
      $figureHighlight.forEach(item => {
        if (highlightLang) {
          let langName = item.getAttribute("class").split(" ")[1];
          if (langName === "plain" || langName === undefined) langName = "Code";
          const highlightLangEle = `<div class="code-lang">${langName}</div>`;
          createEle(highlightLangEle, item, "hl");
        } else {
          createEle("", item, "hl");
        }
      });
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
    const htmlStr = arr => {
      let str = "";
      const replaceDq = str => str.replace(/"/g, "&quot;"); // replace double quotes to &quot;
      arr.forEach(i => {
        const alt = i.alt ? `alt="${replaceDq(i.alt)}"` : "";
        const title = i.title ? `title="${replaceDq(i.title)}"` : "";
        const address = i.address ? i.address : "";
        const galleryItem = `
        <div class="fj-gallery-item">
          ${address ? `<div class="tag-address">${address}</div>` : ""}
          <img src="${i.url}" ${alt + title}>
        </div>
      `;
        str += galleryItem;
      });

      return str;
    };

    const lazyloadFn = (i, arr, limit) => {
      const loadItem = Number(limit);
      const arrLength = arr.length;
      if (arrLength > loadItem) i.insertAdjacentHTML("beforeend", htmlStr(arr.splice(0, loadItem)));
      else {
        i.insertAdjacentHTML("beforeend", htmlStr(arr));
        i.classList.remove("lazyload");
      }
      window.lazyLoadInstance && window.lazyLoadInstance.update();
      return arrLength > loadItem ? loadItem : arrLength;
    };

    const fetchUrl = async url => {
      const response = await fetch(url);
      return await response.json();
    };

    const runJustifiedGallery = (item, arr) => {
      const limit = item.getAttribute("data-limit") ?? arr.length;
      if (!item.classList.contains("lazyload") || arr.length < limit) {
        // 不懶加載
        item.innerHTML = htmlStr(arr);
        item.nextElementSibling.style.display = "none";
      } else {
        if (!item.classList.contains("btn_album_detail_lazyload") || item.classList.contains("page_img_lazyload")) {
          // 滾動懶加載
          lazyloadFn(item, arr, limit);
          const clickBtnFn = () => {
            const lastItemLength = lazyloadFn(item, arr, limit);
            fjGallery(
              item,
              "appendImages",
              item.querySelectorAll(`.fj-gallery-item:nth-last-child(-n+${lastItemLength})`)
            );
            anzhiyu.loadLightbox(item.querySelectorAll("img"));
            if (lastItemLength < Number(limit)) {
              observer.unobserve(item.nextElementSibling);
            }
          };

          // 創建IntersectionObserver實例
          const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
              // 如果元素進入視口
              if (entry.isIntersecting) {
                // 執行clickBtnFn函數
                setTimeout(clickBtnFn(), 100);
              }
            });
          });
          observer.observe(item.nextElementSibling);
        } else {
          // 相冊詳情 按鈕懶加載
          lazyloadFn(item, arr, limit);
          const clickBtnFn = () => {
            const lastItemLength = lazyloadFn(item, arr, limit);
            fjGallery(
              item,
              "appendImages",
              item.querySelectorAll(`.fj-gallery-item:nth-last-child(-n+${lastItemLength})`)
            );
            anzhiyu.loadLightbox(item.querySelectorAll("img"));
            lastItemLength < limit && item.nextElementSibling.removeEventListener("click", clickBtnFn);
          };
          item.nextElementSibling.addEventListener("click", clickBtnFn);
        }
      }

      anzhiyu.initJustifiedGallery(item);
      anzhiyu.loadLightbox(item.querySelectorAll("img"));
      window.lazyLoadInstance && window.lazyLoadInstance.update();
    };

    const addJustifiedGallery = () => {
      ele.forEach(item => {
        item.classList.contains("url")
          ? fetchUrl(item.textContent).then(res => {
              runJustifiedGallery(item, res);
            })
          : runJustifiedGallery(item, JSON.parse(item.textContent));
      });
    };

    if (window.fjGallery) {
      addJustifiedGallery();
      return;
    }

    getCSS(`${GLOBAL_CONFIG.source.justifiedGallery.css}`);
    getScript(`${GLOBAL_CONFIG.source.justifiedGallery.js}`).then(addJustifiedGallery);
  };

  /**
   * 滾動處理
   */
  const scrollFn = function () {
    const $rightside = document.getElementById("rightside");
    const innerHeight = window.innerHeight + 56;
    let lastScrollTop = 0;

    if (document.body.scrollHeight <= innerHeight) {
      $rightside.style.cssText = "opacity: 1; transform: translateX(-58px)";
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
    const $popupWindow = document.getElementById("popup-window");
    const isChatBtnHide = typeof chatBtnHide === "function";
    const isChatBtnShow = typeof chatBtnShow === "function";

    // 第一次滑動到底部的標識符
    let scrollBottomFirstFlag = false;
    // 緩存常用dom元素
    const musicDom = document.getElementById("nav-music"),
      footerDom = document.getElementById("footer"),
      waterfallDom = document.getElementById("waterfall"),
      $percentBtn = document.getElementById("percent"),
      $navTotop = document.getElementById("nav-totop"),
      $bodyWrap = document.getElementById("body-wrap");
    // 頁面底部Dom是否存在
    let pageBottomDomFlag = document.getElementById("post-comment") || document.getElementById("footer");

    function percentageScrollFn(currentTop) {
      // 處理滾動百分比
      let docHeight = $bodyWrap.clientHeight;
      const winHeight = document.documentElement.clientHeight;
      const contentMath =
        docHeight > winHeight ? docHeight - winHeight : document.documentElement.scrollHeight - winHeight;
      const scrollPercent = currentTop / contentMath;
      const scrollPercentRounded = Math.round(scrollPercent * 100);
      const percentage = scrollPercentRounded > 100 ? 100 : scrollPercentRounded <= 0 ? 1 : scrollPercentRounded;
      $percentBtn.textContent = percentage;

      function isInViewPortOfOneNoDis(el) {
        if (!el) return;
        const elDisplay = window.getComputedStyle(el).getPropertyValue("display");
        if (elDisplay == "none") {
          return;
        }
        const viewPortHeight =
          window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
        const offsetTop = el.offsetTop;
        const scrollTop = document.documentElement.scrollTop;
        const top = offsetTop - scrollTop;
        return top <= viewPortHeight;
      }

      if (isInViewPortOfOneNoDis(pageBottomDomFlag || percentage > 90) && currentTop > 20) {
        $navTotop.classList.add("long");
        $percentBtn.textContent = "返回頂部";
      } else {
        $navTotop.classList.remove("long");
        $percentBtn.textContent = percentage;
      }

      // 如果當前頁面需要瀑布流，就處理瀑布流
      if (waterfallDom) {
        const waterfallResult = currentTop % document.documentElement.clientHeight; // 捲去一個視口
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

    const scrollTask = anzhiyu.throttle(() => {
      const currentTop = window.scrollY || document.documentElement.scrollTop;
      const isDown = scrollDirection(currentTop);

      const delta = Math.abs(lastScrollTop - currentTop);
      if (currentTop > 60 && delta < 20 && delta != 0) {
        // ignore small scrolls
        return;
      }
      if (
        $popupWindow &&
        $popupWindow.classList.contains("show-popup-window") &&
        currentTop > 60 &&
        delta > 20 &&
        lastScrollTop != 0
      ) {
        // 滾動後延遲1s關閉彈窗
        anzhiyu.throttle(() => {
          if (popupWindowTimer) clearTimeout(popupWindowTimer);
          popupWindowTimer = setTimeout(() => {
            if (!$popupWindow.classList.contains("popup-hide")) {
              $popupWindow.classList.add("popup-hide");
            }
            setTimeout(() => {
              $popupWindow.classList.remove("popup-hide");
              $popupWindow.classList.remove("show-popup-window");
            }, 1000);
          }, 1000);
        }, 1000)();
      }
      lastScrollTop = currentTop;

      if (currentTop > 26) {
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
        requestAnimationFrame(() => {
          anzhiyu.initThemeColor();
          $header.classList.add("nav-fixed");
        });
        if (window.getComputedStyle($rightside).getPropertyValue("opacity") === "0") {
          $rightside.style.cssText = "opacity: 0.8; transform: translateX(-58px)";
        }
      } else {
        if (currentTop <= 5) {
          requestAnimationFrame(() => {
            $header.classList.remove("nav-fixed");
            $header.classList.remove("nav-visible");
            // 修改頂欄顏色
            anzhiyu.initThemeColor();
          });
        }
        $rightside.style.cssText = "opacity: ''; transform: ''";
      }

      if (document.body.scrollHeight <= innerHeight) {
        $rightside.style.cssText = "opacity: 0.8; transform: translateX(-58px)";
      }

      percentageScrollFn(currentTop);
    }, 96);

    // 進入footer隱藏音樂
    if (footerDom) {
      anzhiyu
        .intersectionObserver(
          () => {
            if (footerDom && musicDom && 768 < document.body.clientWidth) {
              musicDom.style.bottom = "-10px";
              musicDom.style.opacity = "0";
            }
            scrollBottomFirstFlag = true;
          },
          () => {
            if (footerDom && musicDom && 768 < document.body.clientWidth) {
              musicDom.style.bottom = "20px";
              musicDom.style.opacity = "1";
            }
          }
        )()
        .observe(footerDom);
    }

    scrollTask();
    anzhiyu.addEventListenerPjax(window, "scroll", scrollTask, { passive: true });
  };

  /**
   * toc,anchor
   */
  const scrollFnToDo = function () {
    const isToc = GLOBAL_CONFIG_SITE.isToc;
    const isAnchor = GLOBAL_CONFIG.isAnchor;
    const $article = document.getElementById("article-container");

    if (!($article && (isToc || isAnchor))) return;

    let $tocLink, $cardToc, autoScrollToc, isExpand;
    if (isToc) {
      const $cardTocLayout = document.getElementById("card-toc");
      $cardToc = $cardTocLayout.querySelector(".toc-content");
      $tocLink = $cardToc.querySelectorAll(".toc-link");
      isExpand = $cardToc.classList.contains("is-expand");

      // toc元素點擊
      const tocItemClickFn = e => {
        const target = e.target.closest(".toc-link");
        if (!target) return;

        e.preventDefault();
        anzhiyu.scrollToDest(
          anzhiyu.getEleTop(document.getElementById(decodeURI(target.getAttribute("href")).replace("#", ""))) - 60,
          300
        );
        if (window.innerWidth < 900) {
          $cardTocLayout.classList.remove("open");
        }
      };

      anzhiyu.addEventListenerPjax($cardToc, "click", tocItemClickFn);

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
    const filteredHeadings = Array.from(list).filter(heading => heading.id !== "CrawlerTitle");
    let detectItem = "";
    const findHeadPosition = function (top) {
      if (top === 0) {
        return false;
      }

      let currentId = "";
      let currentIndex = "";

      filteredHeadings.forEach(function (ele, index) {
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
    const tocScrollFn = anzhiyu.throttle(() => {
      const currentTop = window.scrollY || document.documentElement.scrollTop;
      findHeadPosition(currentTop);
    }, 100);

    anzhiyu.addEventListenerPjax(window, "scroll", tocScrollFn, { passive: true });
  };

  const handleThemeChange = mode => {
    const globalFn = window.globalFn || {};
    const themeChange = globalFn.themeChange || {};
    if (!themeChange) {
      return;
    }

    Object.keys(themeChange).forEach(key => {
      const themeChangeFn = themeChange[key];
      themeChangeFn(mode);
    });

    rm && rm.hideRightMenu();

    const menuDarkmodeText = $rightMenu.querySelector(".menu-darkmode-text");
    if (mode === "light") {
      menuDarkmodeText.textContent = "深色模式";
    } else {
      menuDarkmodeText.textContent = "淺色模式";
    }

    if (!GLOBAL_CONFIG_SITE.isPost) {
      const root = document.querySelector(":root");
      root.style.setProperty("--anzhiyu-bar-background", "var(--anzhiyu-meta-theme-color)");
      requestAnimationFrame(() => {
        anzhiyu.initThemeColor();
      });

      // 要改回來默認主色;
      document.documentElement.style.setProperty(
        "--anzhiyu-main",
        getComputedStyle(document.documentElement).getPropertyValue("--anzhiyu-theme")
      );
      document.documentElement.style.setProperty(
        "--anzhiyu-theme-op",
        getComputedStyle(document.documentElement).getPropertyValue("--anzhiyu-main") + "23"
      );
      document.documentElement.style.setProperty(
        "--anzhiyu-theme-op-deep",
        getComputedStyle(document.documentElement).getPropertyValue("--anzhiyu-main") + "dd"
      );
    }
  };

  /**
   * Rightside
   */
  const rightSideFn = {
    readmode: () => {
      // read mode
      const $body = document.body;
      $body.classList.add("read-mode");
      const newEle = document.createElement("button");
      newEle.type = "button";
      newEle.className = "anzhiyufont anzhiyu-icon-xmark exit-readmode";
      $body.appendChild(newEle);

      const clickFn = () => {
        $body.classList.remove("read-mode");
        newEle.remove();
        newEle.removeEventListener("click", clickFn);
      };

      newEle.addEventListener("click", clickFn);
    },
    darkmode: () => {
      // switch between light and dark mode
      const willChangeMode = document.documentElement.getAttribute("data-theme") === "dark" ? "light" : "dark";
      if (willChangeMode === "dark") {
        activateDarkMode();
        GLOBAL_CONFIG.Snackbar !== undefined && anzhiyu.snackbarShow(GLOBAL_CONFIG.Snackbar.day_to_night);
      } else {
        activateLightMode();
        GLOBAL_CONFIG.Snackbar !== undefined && anzhiyu.snackbarShow(GLOBAL_CONFIG.Snackbar.night_to_day);
      }
      saveToLocal.set("theme", willChangeMode, 2);
      handleThemeChange(willChangeMode);
    },
    "rightside-config": item => {
      // Show or hide rightside-hide-btn
      const hideLayout = item.firstElementChild;
      if (hideLayout.classList.contains("show")) {
        hideLayout.classList.add("status");
        setTimeout(() => {
          hideLayout.classList.remove("status");
        }, 300);
      }

      hideLayout.classList.toggle("show");
    },
    "go-up": () => {
      // Back to top
      anzhiyu.scrollToDest(0, 500);
    },
    "hide-aside-btn": () => {
      // Hide aside
      const $htmlDom = document.documentElement.classList;
      const saveStatus = $htmlDom.contains("hide-aside") ? "show" : "hide";
      saveToLocal.set("aside-status", saveStatus, 2);
      $htmlDom.toggle("hide-aside");
    },
    "mobile-toc-button": item => {
      // Show mobile toc
      const tocEle = document.getElementById("card-toc");
      tocEle.style.transformOrigin = `right ${item.getBoundingClientRect().top + 17}px`;
      tocEle.style.transition = "transform 0.3s ease-in-out";
      tocEle.classList.toggle("open");
      tocEle.addEventListener(
        "transitionend",
        () => {
          tocEle.style.transition = "";
          tocEle.style.transformOrigin = "";
        },
        { once: true }
      );
    },
    "chat-btn": () => {
      // Show chat
      window.chatBtnFn();
    },
    translateLink: () => {
      // switch between traditional and simplified chinese
      window.translateFn.translatePage();
    },
  };

  document.getElementById("rightside").addEventListener("click", function (e) {
    const $target = e.target.closest("[id]");
    if ($target && rightSideFn[$target.id]) {
      rightSideFn[$target.id](this);
    }
  });

  //監聽蒙版關閉
  document.addEventListener(
    "touchstart",
    e => {
      anzhiyu.removeRewardMask();
    },
    { passive: true }
  );

  /**
   * menu
   * 側邊欄sub-menu 展開/收縮
   */
  const clickFnOfSubMenu = () => {
    const handleClickOfSubMenu = e => {
      const target = e.target.closest(".site-page.group");
      if (!target) return;
      target.classList.toggle("hide");
    };

    document.querySelector("#sidebar-menus .menus_items") &&
      document.querySelector("#sidebar-menus .menus_items").addEventListener("click", handleClickOfSubMenu);
  };

  /**
   * 手機端目錄點擊
   */
  const openMobileMenu = () => {
    const handleClick = () => {
      sidebarFn.open();
    };
    anzhiyu.addEventListenerPjax(document.getElementById("toggle-menu"), "click", handleClick);
  };

  /**
   * 複製時加上版權信息
   */
  const addCopyright = () => {
    const { limitCount, languages, copy, copyrightEbable } = GLOBAL_CONFIG.copyright;

    const handleCopy = e => {
      if (copy) {
        anzhiyu.snackbarShow(languages.copySuccess);
      }
      if (copyrightEbable) {
        e.preventDefault();
        const copyFont = window.getSelection(0).toString();
        let textFont = copyFont;
        if (copyFont.length > limitCount) {
          textFont = `${copyFont}\n\n\n${languages.author}\n${languages.link}${window.location.href}\n${languages.source}\n${languages.info}`;
        }
        if (e.clipboardData) {
          return e.clipboardData.setData("text", textFont);
        } else {
          return window.clipboardData.setData("text", textFont);
        }
      }
    };

    document.body.addEventListener("copy", handleCopy);
  };

  /**
   * 網頁運行時間
   */
  const addRuntime = () => {
    const $runtimeCount = document.getElementById("runtimeshow");
    if ($runtimeCount) {
      const publishDate = $runtimeCount.getAttribute("data-publishDate");
      $runtimeCount.textContent = `${anzhiyu.diffDate(publishDate)} ${GLOBAL_CONFIG.runtime}`;
    }
  };

  /**
   * 最後一次更新時間
   */
  const addLastPushDate = () => {
    const $lastPushDateItem = document.getElementById("last-push-date");
    if ($lastPushDateItem) {
      const lastPushDate = $lastPushDateItem.getAttribute("data-lastPushDate");
      $lastPushDateItem.textContent = anzhiyu.diffDate(lastPushDate, true);
    }
  };

  /**
   * table overflow
   */
  const addTableWrap = () => {
    const $table = document.querySelectorAll("#article-container table");
    if (!$table.length) return;

    $table.forEach(item => {
      if (!item.closest(".highlight")) {
        anzhiyu.wrap(item, "div", { class: "table-wrap" });
      }
    });
  };

  /**
   * tag-hide
   */
  const clickFnOfTagHide = () => {
    const hideButtons = document.querySelectorAll("#article-container .hide-button");
    if (!hideButtons.length) return;
    const handleClick = function (e) {
      const $this = this;
      $this.classList.add("open");
      const $fjGallery = $this.nextElementSibling.querySelectorAll(".gallery-container");
      $fjGallery.length && addJustifiedGallery($fjGallery);
    };

    hideButtons.forEach(item => {
      item.addEventListener("click", handleClick, { once: true });
    });
  };

  const tabsFn = () => {
    const navTabsElement = document.querySelectorAll("#article-container .tabs");
    if (!navTabsElement.length) return;

    const removeAndAddActiveClass = (elements, detect) => {
      Array.from(elements).forEach(element => {
        element.classList.remove("active");
        if (element === detect || element.id === detect) {
          element.classList.add("active");
        }
      });
    };

    const addTabNavEventListener = (item, isJustifiedGallery) => {
      const navClickHandler = function (e) {
        const target = e.target.closest("button");
        if (target.classList.contains("active")) return;
        removeAndAddActiveClass(this.children, target);
        this.classList.remove("no-default");
        const tabId = target.getAttribute("data-href");
        const tabContent = this.nextElementSibling;
        removeAndAddActiveClass(tabContent.children, tabId);
        if (isJustifiedGallery) {
          const $isTabJustifiedGallery = tabContent.querySelectorAll(`#${tabId} .fj-gallery`);
          if ($isTabJustifiedGallery.length > 0) {
            anzhiyu.initJustifiedGallery($isTabJustifiedGallery);
          }
        }
      };
      anzhiyu.addEventListenerPjax(item.firstElementChild, "click", navClickHandler);
    };

    const addTabToTopEventListener = item => {
      const btnClickHandler = e => {
        const target = e.target.closest("button");
        if (!target) return;
        anzhiyu.scrollToDest(anzhiyu.getEleTop(item), 300);
      };
      anzhiyu.addEventListenerPjax(item.lastElementChild, "click", btnClickHandler);
    };

    navTabsElement.forEach(item => {
      const isJustifiedGallery = !!item.querySelectorAll(".gallery-container");
      addTabNavEventListener(item, isJustifiedGallery);
      addTabToTopEventListener(item);
    });
  };

  const toggleCardCategory = () => {
    const cardCategory = document.querySelector("#aside-cat-list.expandBtn");
    if (!cardCategory) return;

    const handleToggleBtn = e => {
      const target = e.target;
      if (target.nodeName === "I") {
        e.preventDefault();
        target.parentNode.classList.toggle("expand");
      }
    };
    anzhiyu.addEventListenerPjax(cardCategory, "click", handleToggleBtn, true);
  };

  const switchComments = () => {
    const switchBtn = document.getElementById("switch-btn");
    if (!switchBtn) return;
    let switchDone = false;
    const commentContainer = document.getElementById("post-comment");
    const handleSwitchBtn = () => {
      commentContainer.classList.toggle("move");
      if (!switchDone && typeof loadOtherComment === "function") {
        switchDone = true;
        loadOtherComment();
      }
    };
    anzhiyu.addEventListenerPjax(switchBtn, "click", handleSwitchBtn);
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
      const timeVal = item.getAttribute("datetime");
      item.textContent = anzhiyu.diffDate(timeVal, true);
      item.style.display = "inline";
    });
  };

  const mouseleaveHomeCard = function () {
    const topGroup = document.querySelector(".topGroup");
    if (!topGroup) return;
    //首頁大卡片恢復顯示
    topGroup.addEventListener("mouseleave", function () {
      document.getElementById("todayCard").classList.remove("hide");
      document.getElementById("todayCard").style.zIndex = 1;
    });
  };

  // 表情放大
  const owoBig = function () {
    let flag = 1, // 設置節流閥
      owo_time = "", // 設置計時器
      m = 3; // 設置放大倍數
    // 創建盒子
    let div = document.createElement("div");
    // 設置ID
    div.id = "owo-big";
    // 插入盒子
    let body = document.querySelector("body");
    body.appendChild(div);

    // 監聽 post-comment 元素的子元素添加事件
    const observer = new MutationObserver(mutations => {
      mutations.forEach(mutation => {
        const addedNodes = mutation.addedNodes;
        // 判斷新增的節點中是否包含 OwO-body 類名的元素
        for (let i = 0; i < addedNodes.length; i++) {
          const node = addedNodes[i];
          if (
            node.nodeType === Node.ELEMENT_NODE &&
            node.classList.contains("OwO-body") &&
            !node.classList.contains("comment-barrage")
          ) {
            const owo_body = node;
            // 禁用右鍵（手機端長按會出現右鍵菜單，爲了體驗給禁用掉）
            owo_body.addEventListener("contextmenu", e => e.preventDefault());
            // 鼠標移入
            owo_body.addEventListener("mouseover", handleMouseOver);
            // 鼠標移出
            owo_body.addEventListener("mouseout", handleMouseOut);
          }
        }
      });
    });

    // 配置 MutationObserver 選項
    const config = { childList: true, subtree: true };

    // 開始監聽
    observer.observe(document.getElementById("post-comment"), config);

    function handleMouseOver(e) {
      if (e.target.tagName == "IMG" && flag) {
        flag = 0;
        // 移入100毫秒後顯示盒子
        owo_time = setTimeout(() => {
          let height = e.target.clientHeight * m; // 盒子高
          let width = e.target.clientWidth * m; // 盒子寬
          let left = e.x - e.offsetX - (width - e.target.clientWidth) / 2; // 盒子與屏幕左邊距離
          if (left + width > body.clientWidth) {
            left -= left + width - body.clientWidth + 10;
          } // 右邊緣檢測，防止超出屏幕
          if (left < 0) left = 10; // 左邊緣檢測，防止超出屏幕
          let top = e.y - e.offsetY; // 盒子與屏幕頂部距離

          // 設置盒子樣式
          div.style.height = height + "px";
          div.style.width = width + "px";
          div.style.left = left + "px";
          div.style.top = top + "px";
          div.style.display = "flex";
          // 在盒子中插入圖片
          div.innerHTML = `<img src="${e.target.src}">`;
        }, 100);
      }
    }

    function handleMouseOut(e) {
      // 隱藏盒子
      div.style.display = "none";
      flag = 1;
      clearTimeout(owo_time);
    }
  };

  //封面純色
  const coverColor = async () => {
    const root = document.querySelector(":root");
    const path = document.getElementById("post-top-bg")?.src;
    if (!path) {
      // 非文章情況，直接設置不需要請求了
      root.style.setProperty("--anzhiyu-bar-background", "var(--anzhiyu-meta-theme-color)");
      requestAnimationFrame(() => {
        anzhiyu.initThemeColor();
      });

      // 要改回來默認主色
      document.documentElement.style.setProperty(
        "--anzhiyu-main",
        getComputedStyle(document.documentElement).getPropertyValue("--anzhiyu-theme")
      );
      document.documentElement.style.setProperty(
        "--anzhiyu-theme-op",
        getComputedStyle(document.documentElement).getPropertyValue("--anzhiyu-main") + "23"
      );
      document.documentElement.style.setProperty(
        "--anzhiyu-theme-op-deep",
        getComputedStyle(document.documentElement).getPropertyValue("--anzhiyu-main") + "dd"
      );

      return;
    }

    // 文章內
    if (GLOBAL_CONFIG.mainTone) {
      if (GLOBAL_CONFIG_SITE.postMainColor) {
        let value = GLOBAL_CONFIG_SITE.postMainColor;
        if (getContrastYIQ(value) === "light") {
          value = LightenDarkenColor(colorHex(value), -40);
        }

        root.style.setProperty("--anzhiyu-bar-background", value);
        requestAnimationFrame(() => {
          anzhiyu.initThemeColor();
        });

        if (GLOBAL_CONFIG.mainTone.cover_change) {
          document.documentElement.style.setProperty("--anzhiyu-main", value);
          document.documentElement.style.setProperty(
            "--anzhiyu-theme-op",
            getComputedStyle(document.documentElement).getPropertyValue("--anzhiyu-main") + "23"
          );
          document.documentElement.style.setProperty(
            "--anzhiyu-theme-op-deep",
            getComputedStyle(document.documentElement).getPropertyValue("--anzhiyu-main") + "dd"
          );
        }
      } else {
        const fallbackValue = "var(--anzhiyu-theme)";
        let fetchPath = "";
        if (GLOBAL_CONFIG.mainTone.mode == "cdn" || GLOBAL_CONFIG.mainTone.mode == "both") {
          fetchPath = path + "?imageAve";
        } else if (GLOBAL_CONFIG.mainTone.mode == "api") {
          fetchPath = GLOBAL_CONFIG.mainTone.api + path;
        }
        // cdn/api模式請求
        try {
          const response = await fetch(fetchPath);
          if (response.ok && response.headers.get("content-type")?.includes("application/json")) {
            const obj = await response.json();
            let value =
              GLOBAL_CONFIG.mainTone.mode == "cdn" || GLOBAL_CONFIG.mainTone.mode == "both"
                ? "#" + obj.RGB.slice(2)
                : obj.RGB;
            if (getContrastYIQ(value) === "light") {
              value = LightenDarkenColor(colorHex(value), -40);
            }

            root.style.setProperty("--anzhiyu-bar-background", value);
            requestAnimationFrame(() => {
              anzhiyu.initThemeColor();
            });

            if (GLOBAL_CONFIG.mainTone.cover_change) {
              document.documentElement.style.setProperty("--anzhiyu-main", value);
              document.documentElement.style.setProperty(
                "--anzhiyu-theme-op",
                getComputedStyle(document.documentElement).getPropertyValue("--anzhiyu-main") + "23"
              );
              document.documentElement.style.setProperty(
                "--anzhiyu-theme-op-deep",
                getComputedStyle(document.documentElement).getPropertyValue("--anzhiyu-main") + "dd"
              );
            }
          } else {
            if (GLOBAL_CONFIG.mainTone.mode == "both") {
              // both繼續請求
              try {
                const response = await fetch(GLOBAL_CONFIG.mainTone.api + path);
                if (response.ok && response.headers.get("content-type")?.includes("application/json")) {
                  const obj = await response.json();
                  let value = obj.RGB;

                  if (getContrastYIQ(value) === "light") {
                    value = LightenDarkenColor(colorHex(value), -40);
                  }

                  root.style.setProperty("--anzhiyu-bar-background", value);
                  requestAnimationFrame(() => {
                    anzhiyu.initThemeColor();
                  });

                  if (GLOBAL_CONFIG.mainTone.cover_change) {
                    document.documentElement.style.setProperty("--anzhiyu-main", value);
                    document.documentElement.style.setProperty(
                      "--anzhiyu-theme-op",
                      getComputedStyle(document.documentElement).getPropertyValue("--anzhiyu-main") + "23"
                    );
                    document.documentElement.style.setProperty(
                      "--anzhiyu-theme-op-deep",
                      getComputedStyle(document.documentElement).getPropertyValue("--anzhiyu-main") + "dd"
                    );
                  }
                } else {
                  root.style.setProperty("--anzhiyu-bar-background", fallbackValue);
                  requestAnimationFrame(() => {
                    anzhiyu.initThemeColor();
                  });
                  document.documentElement.style.setProperty("--anzhiyu-main", fallbackValue);
                }
              } catch {
                root.style.setProperty("--anzhiyu-bar-background", fallbackValue);
                requestAnimationFrame(() => {
                  anzhiyu.initThemeColor();
                });
                document.documentElement.style.setProperty("--anzhiyu-main", fallbackValue);
              }
            } else {
              root.style.setProperty("--anzhiyu-bar-background", fallbackValue);
              requestAnimationFrame(() => {
                anzhiyu.initThemeColor();
              });
              document.documentElement.style.setProperty("--anzhiyu-main", fallbackValue);
            }
          }
        } catch (err) {
          console.error("Error fetching data:", err);
          root.style.setProperty("--anzhiyu-bar-background", fallbackValue);
          requestAnimationFrame(() => {
            anzhiyu.initThemeColor();
          });
          document.documentElement.style.setProperty("--anzhiyu-main", fallbackValue);
        }
      }
    }
  };

  //RGB顏色轉化爲16進制顏色
  const colorHex = str => {
    const hexRegex = /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/;

    if (/^(rgb|RGB)/.test(str)) {
      const aColor = str.replace(/(?:\(|\)|rgb|RGB)*/g, "").split(",");
      return aColor.reduce((acc, val) => {
        const hex = Number(val).toString(16).padStart(2, "0");
        return acc + hex;
      }, "#");
    }

    if (hexRegex.test(str)) {
      if (str.length === 4) {
        return Array.from(str.slice(1)).reduce((acc, val) => acc + val + val, "#");
      }
      return str;
    }

    return str;
  };

  // Lighten or darken a color
  const LightenDarkenColor = (col, amt) => {
    const usePound = col.startsWith("#");

    if (usePound) {
      col = col.slice(1);
    }

    let num = parseInt(col, 16);

    const processColor = (colorValue, amount) => {
      colorValue += amount;
      return colorValue > 255 ? 255 : colorValue < 0 ? 0 : colorValue;
    };

    const r = processColor(num >> 16, amt);
    const b = processColor((num >> 8) & 0x00ff, amt);
    const g = processColor(num & 0x0000ff, amt);

    return (usePound ? "#" : "") + String("000000" + (g | (b << 8) | (r << 16)).toString(16)).slice(-6);
  };

  // Determine whether a color is light or dark
  const getContrastYIQ = hexcolor => {
    const colorRgb = color => {
      const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
      color = color.replace(shorthandRegex, (m, r, g, b) => r + r + g + g + b + b);

      const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(color);
      return result ? `rgb(${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)})` : null;
    };

    const colorrgb = colorRgb(hexcolor);
    const colors = colorrgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);

    const [_, red, green, blue] = colors;

    const brightness = (red * 299 + green * 587 + blue * 114) / 255000;

    return brightness >= 0.5 ? "light" : "dark";
  };

  //監聽跳轉頁面輸入框是否按下回車
  const listenToPageInputPress = function () {
    var input = document.getElementById("toPageText");
    if (input) {
      input.addEventListener("keydown", event => {
        if (event.keyCode === 13) {
          // 如果按下的是回車鍵，則執行特定的函數
          anzhiyu.toPage();
          var link = document.getElementById("toPageButton");
          var href = link.href;
          pjax.loadUrl(href);
        }
      });
    }
  };

  // 監聽nav是否被其他音頻暫停⏸️
  const listenNavMusicPause = function () {
    const timer = setInterval(() => {
      if (navMusicEl && navMusicEl.querySelector("#nav-music meting-js").aplayer) {
        clearInterval(timer);
        let msgPlay = '<i class="anzhiyufont anzhiyu-icon-play"></i><span>播放音樂</span>';
        let msgPause = '<i class="anzhiyufont anzhiyu-icon-pause"></i><span>暫停音樂</span>';
        navMusicEl.querySelector("#nav-music meting-js").aplayer.on("pause", function () {
          navMusicEl.classList.remove("playing");
          document.getElementById("menu-music-toggle").innerHTML = msgPlay;
          document.getElementById("nav-music-hoverTips").innerHTML = "音樂已暫停";
          document.querySelector("#consoleMusic").classList.remove("on");
          anzhiyu_musicPlaying = false;
          navMusicEl.classList.remove("stretch");
        });
        navMusicEl.querySelector("#nav-music meting-js").aplayer.on("play", function () {
          navMusicEl.classList.add("playing");
          document.getElementById("menu-music-toggle").innerHTML = msgPause;
          document.querySelector("#consoleMusic").classList.add("on");
          anzhiyu_musicPlaying = true;
          // navMusicEl.classList.add("stretch");
        });
      }
    }, 16);
  };

  // 開發者工具鍵盤監聽
  window.onkeydown = function (e) {
    123 === e.keyCode && anzhiyu.snackbarShow("開發者模式已打開，請遵循GPL協議", !1);
  };

  // 歡迎語
  function greetingInit() {
    const greetingBoxInfo = GLOBAL_CONFIG.greetingBox.list;
    const greetingBoxDefault = GLOBAL_CONFIG.greetingBox.default;
    //- 創建盒子
    let div = document.createElement("div");
    //- 設置ID
    div.id = "greeting";
    //- 設置class
    setTimeout(() => {
      div.classList.add("shown");
    }, 1000);
    //- 插入盒子
    let greetingBox = document.getElementById("greetingBox");
    if (!greetingBox) return;
    greetingBox.appendChild(div);
    const nowTime = new Date().getHours();
    let greetings = greetingBoxDefault;
    for (let i = 0; i < greetingBoxInfo.length; i++) {
      if (nowTime >= greetingBoxInfo[i].startTime && nowTime <= greetingBoxInfo[i].endTime) {
        greetings = greetingBoxInfo[i].greeting;
        break;
      }
    }
    div.innerHTML = greetings;
    setTimeout(() => {
      div.classList.remove("shown");
      setTimeout(() => {
        greetingBox.remove();
      }, 500);
    }, 3000);
  }
  function statistics51aInit() {
    const loadScript = (url, charset = "UTF-8", crossorigin, id) => {
      return new Promise((resolve, reject) => {
        const script = document.createElement("script");
        script.src = url;
        script.async = true;
        if (id) {
          script.setAttribute("id", id);
        }
        if (charset) {
          script.setAttribute("charset", charset);
        }
        if (crossorigin) {
          script.setAttribute("crossorigin", crossorigin);
        }
        script.onerror = reject;
        script.onload = script.onreadystatechange = function () {
          const loadState = this.readyState;
          if (loadState && loadState !== "loaded" && loadState !== "complete") return;
          script.onload = script.onreadystatechange = null;
          resolve();
        };
        document.head.appendChild(script);
      });
    };

    const scriptUrls = [
      { url: "https://sdk.51.la/js-sdk-pro.min.js", charset: "UTF-8", crossorigin: false, id: "LA_COLLECT" },
      { url: "https://sdk.51.la/perf/js-sdk-perf.min.js", crossorigin: "anonymous" },
    ];

    Promise.all(scriptUrls.map(({ url, charset, crossorigin, id }) => loadScript(url, charset, crossorigin, id)))
      .then(() => {
        LA.init({ id: GLOBAL_CONFIG.LA51.ck, ck: GLOBAL_CONFIG.LA51.ck });
        new LingQue.Monitor().init({ id: GLOBAL_CONFIG.LA51.LingQueMonitorID, sendSuspicious: true });
      })
      .catch(error => {
        console.error("加載51a統計異常，本地加載403是正常情況:", error);
      });
  }

  function setInputFocusListener() {
    const inputs = document.querySelectorAll("input, textarea");
    const filteredinputs = Array.from(inputs).filter(heading => {
      if (heading.id !== "center-console" || heading.id !== "page-type") {
        return;
      }
    });
    filteredinputs.forEach(input => {
      input.addEventListener("focus", () => {
        anzhiyu_intype = true;
      });

      input.addEventListener("blur", () => {
        anzhiyu_intype = false;
      });
    });
  }

  // 是否開啓快捷鍵
  function executeShortcutKeyFunction() {
    // 是否開啓快捷鍵
    anzhiyu_keyboard = localStorage.getItem("keyboardToggle") ? localStorage.getItem("keyboardToggle") : false;
    function addKeyShotListener() {
      const windowObject = window;
      windowObject.removeEventListener("keydown", keyDownEvent);
      windowObject.removeEventListener("keyup", keyUpEvent);
      windowObject.addEventListener("keydown", keyDownEvent);
      windowObject.addEventListener("keyup", keyUpEvent);
    }

    function keyDownEvent(event) {
      const isEscapeKeyPressed = event.keyCode === 27;
      const isShiftKeyPressed = event.shiftKey;
      const isKeyboardEnabled = anzhiyu_keyboard;
      const isInInputField = anzhiyu_intype;

      if (isEscapeKeyPressed) {
        anzhiyu.hideLoading();
        anzhiyu.hideConsole();
        rm && rm.hideRightMenu();
      }
      const shortcutKeyDelay = GLOBAL_CONFIG.shortcutKey.delay ? GLOBAL_CONFIG.shortcutKey.delay : 100;
      const shortcutKeyShiftDelay = GLOBAL_CONFIG.shortcutKey.shiftDelay ? GLOBAL_CONFIG.shortcutKey.shiftDelay : 200;
      if (isKeyboardEnabled && isShiftKeyPressed && !isInInputField) {
        anzhiyu_keyUpShiftDelayEvent_timeoutId = setTimeout(() => {
          switch (event.keyCode) {
            case 16:
              anzhiyu_keyUpEvent_timeoutId = setTimeout(() => {
                document.querySelector("#keyboard-tips").classList.add("show");
              }, shortcutKeyShiftDelay);
              break;
            case 65:
              anzhiyu.switchConsole();
              break;
            case 77:
              anzhiyu.musicToggle();
              break;
            case 75:
              anzhiyu.keyboardToggle();
              break;
            case 73:
              anzhiyu.rightMenuToggle();
              break;
            case 82:
              toRandomPost();
              break;
            case 72:
              pjax.loadUrl("/");
              break;
            case 68:
              rightSideFn.darkmode();
              break;
            case 70:
              pjax.loadUrl("/fcircle/");
              break;
            case 76:
              pjax.loadUrl("/link/");
              break;
            case 80:
              pjax.loadUrl("/about/");
              break;
            default:
              break;
          }
          event.preventDefault();
        }, shortcutKeyDelay);
      }
    }

    window.onfocus = function () {
      document.getElementById("keyboard-tips").classList.remove("show");
    };

    function keyUpEvent(event) {
      anzhiyu_keyUpEvent_timeoutId && clearTimeout(anzhiyu_keyUpEvent_timeoutId);
      anzhiyu_keyUpShiftDelayEvent_timeoutId && clearTimeout(anzhiyu_keyUpShiftDelayEvent_timeoutId);
      if (event.keyCode === 16) {
        const keyboardTips = document.querySelector("#keyboard-tips");
        keyboardTips.classList.remove("show");
      }
    }

    addKeyShotListener();
  }

  function changeDocumentTitle() {
    let leaveTitle = GLOBAL_CONFIG.diytitle.leaveTitle;
    let backTitle = GLOBAL_CONFIG.diytitle.backTitle;
    let OriginTitile = document.title;
    let titleTime;

    document.addEventListener("visibilitychange", function () {
      if (document.hidden) {
        //離開當前頁面時標籤顯示內容
        document.title = leaveTitle;
        clearTimeout(titleTime);
      } else {
        //返回當前頁面時標籤顯示內容
        document.title = backTitle + OriginTitile;
        //兩秒後變回正常標題
        titleTime = setTimeout(function () {
          document.title = OriginTitile;
        }, 2000);
      }
    });
  }

  function addDarkModeEventListener(elementId, childSelector) {
    const element = document.getElementById(elementId);
    if (element && childSelector) {
      const childElement = element.querySelector(childSelector);
      childElement && childElement.addEventListener("click", rightSideFn.darkmode);
    } else if (element) {
      element.addEventListener("click", rightSideFn.darkmode);
    }
  }

  const unRefreshFn = function () {
    window.addEventListener("resize", () => {
      adjustMenu(false);
      mobileSidebarOpen && anzhiyu.isHidden(document.getElementById("toggle-menu")) && sidebarFn.close();
    });

    document.getElementById("menu-mask").addEventListener("click", e => {
      sidebarFn.close();
    });

    // 處理右鍵
    $rightMenu = document.getElementById("rightMenu");
    addDarkModeEventListener("menu-darkmode");
    addDarkModeEventListener("sidebar", ".darkmode_switchbutton");

    clickFnOfSubMenu();
    GLOBAL_CONFIG.islazyload && lazyloadImg();
    GLOBAL_CONFIG.copyright !== undefined && addCopyright();
    GLOBAL_CONFIG.navMusic && listenNavMusicPause();
    if (GLOBAL_CONFIG.shortcutKey && document.getElementById("consoleKeyboard")) {
      localStorage.setItem("keyboardToggle", "true");
      document.getElementById("consoleKeyboard").classList.add("on");
      anzhiyu_keyboard = true;
      executeShortcutKeyFunction();
    }
    if (GLOBAL_CONFIG.autoDarkmode) {
      window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", e => {
        if (saveToLocal.get("theme") !== undefined) return;
        e.matches ? handleThemeChange("dark") : handleThemeChange("light");
      });
    }
    // 歡迎語
    GLOBAL_CONFIG.greetingBox && greetingInit();
    // 51la統計&靈雀統計
    GLOBAL_CONFIG.LA51 && statistics51aInit();
  };

  window.refreshFn = function () {
    initAdjust();
    themeColorMeta = document.querySelector('meta[name="theme-color"]');
    pageHeaderEl = document.getElementById("page-header");
    navMusicEl = document.getElementById("nav-music");
    consoleEl = document.getElementById("console");

    addDarkModeEventListener("console", ".darkmode_switchbutton");

    if (GLOBAL_CONFIG_SITE.isPost) {
      GLOBAL_CONFIG.noticeOutdate !== undefined && addPostOutdateNotice();
      GLOBAL_CONFIG.relativeDate.post && relativeDate(document.querySelectorAll("#post-meta time"));
    } else {
      if (GLOBAL_CONFIG.relativeDate.homepage) {
        relativeDate(document.querySelectorAll("#recent-posts time"));
      } else if (GLOBAL_CONFIG.relativeDate.simplehomepage) {
        relativeDate(document.querySelectorAll("#recent-posts time"), true);
      }
      GLOBAL_CONFIG.runtime && addRuntime();
      addLastPushDate();
      toggleCardCategory();
    }

    GLOBAL_CONFIG.diytitle && changeDocumentTitle();
    scrollFnToDo();
    GLOBAL_CONFIG_SITE.isHome && scrollDownInIndex();
    addHighlightTool();
    GLOBAL_CONFIG.isPhotoFigcaption && addPhotoFigcaption();
    scrollFn();

    // 刷新時第一次滾動百分比
    window.scrollCollect && window.scrollCollect();

    const $jgEle = document.querySelectorAll("#content-inner .fj-gallery");
    $jgEle.length && runJustifiedGallery($jgEle);

    runLightbox();
    addTableWrap();
    clickFnOfTagHide();
    tabsFn();
    switchComments();
    document.getElementById("toggle-menu").addEventListener("click", () => {
      sidebarFn.open();
    });

    // 如果當前頁有評論就執行函數
    if (document.getElementById("post-comment")) owoBig();

    mouseleaveHomeCard();
    coverColor();
    listenToPageInputPress();
    openMobileMenu();

    // needRefresh
    // nav中間的標題變化
    document.getElementById("page-name").innerText = document.title.split(` | ${GLOBAL_CONFIG_SITE.configTitle}`)[0];
    anzhiyu.initIndexEssay();
    anzhiyu.changeTimeInEssay();
    anzhiyu.removeBodyPaceClass();
    anzhiyu.qrcodeCreate();
    anzhiyu.changeTimeInAlbumDetail();
    anzhiyu.reflashEssayWaterFall();
    anzhiyu.sayhi();
    anzhiyu.stopImgRightDrag();
    anzhiyu.addNavBackgroundInit();
    anzhiyu.setValueToBodyType();
    anzhiyu.catalogActive();
    anzhiyu.tagsPageActive();
    anzhiyu.categoriesBarActive();
    anzhiyu.topCategoriesBarScroll();
    anzhiyu.switchRightClickMenuHotReview();
    anzhiyu.getCustomPlayList();
    anzhiyu.addEventListenerConsoleMusicList(false);
    anzhiyu.initPaginationObserver();

    setTimeout(() => {
      setInputFocusListener();
      if (typeof addFriendLinksInFooter === "function") {
        addFriendLinksInFooter();
      }
    }, 200);
  };

  refreshFn();
  unRefreshFn();
});
