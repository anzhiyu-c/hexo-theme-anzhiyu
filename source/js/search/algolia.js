window.addEventListener("load", () => {
  const $searchMask = document.getElementById("search-mask");
  const $searchDialog = document.querySelector("#algolia-search .search-dialog");

  // HTML 转义函数，防止 XSS 攻击
  const escapeHtml = str => {
    if (!str) return "";
    const div = document.createElement("div");
    div.textContent = str;
    return div.innerHTML;
  };

  const openSearch = () => {
    anzhiyu.animateIn($searchMask, "to_show 0.5s");
    $searchDialog.style.display = "block";
    setTimeout(() => {
      document.querySelector("#algolia-search .ais-SearchBox-input").focus();
    }, 100);

    // shortcut: ESC
    document.addEventListener("keydown", function f(event) {
      if (event.code === "Escape") {
        closeSearch();
        document.removeEventListener("keydown", f);
      }
    });

    fixSafariHeight();
    window.addEventListener("resize", fixSafariHeight);
  };

  // shortcut: shift+S
  if (anzhiyu_keyboard) {
    window.addEventListener("keydown", function (event) {
      if (event.keyCode == 83 && event.shiftKey) {
        console.info(selectTextNow);
        if (selectTextNow) {
          openSearch();
          const t = document.querySelector("#algolia-search-input > div > form > input");
          t.value = selectTextNow;
          t.dispatchEvent(new Event("input"));
          setTimeout(() => {
            document.querySelector("#algolia-search-input > div > form > button.ais-SearchBox-submit").click();
          }, 64);
        } else {
          openSearch();
        }

        return false;
      }
    });
  }

  const closeSearch = () => {
    anzhiyu.animateOut($searchDialog, "search_close .5s");
    anzhiyu.animateOut($searchMask, "to_hide 0.5s");
    window.removeEventListener("resize", fixSafariHeight);
  };

  // fix safari
  const fixSafariHeight = () => {
    if (window.innerWidth < 768) {
      $searchDialog.style.setProperty("--search-height", window.innerHeight + "px");
    }
  };

  const searchClickFn = () => {
    anzhiyu.addEventListenerPjax(document.querySelector("#search-button > .search"), "click", openSearch);
  };

  const searchFnOnce = () => {
    $searchMask.addEventListener("click", closeSearch);
    document.querySelector("#algolia-search .search-close-button").addEventListener("click", closeSearch);
  };

  const algolia = GLOBAL_CONFIG.algolia;
  const isAlgoliaValid = algolia.appId && algolia.apiKey && algolia.indexName;
  if (!isAlgoliaValid) {
    return console.error("Algolia setting is invalid!");
  }

  if (typeof algoliasearch === "undefined") {
    return console.error("algoliasearch library is not loaded!");
  }

  if (typeof instantsearch === "undefined") {
    return console.error("instantsearch library is not loaded!");
  }

  const search = instantsearch({
    indexName: algolia.indexName,
    /* global algoliasearch */
    searchClient: algoliasearch(algolia.appId, algolia.apiKey),
    searchFunction(helper) {
      if (helper.state.query) {
        let innerLoading = '<i class="anzhiyufont anzhiyu-icon-spinner anzhiyu-spin"></i>';
        document.getElementById("algolia-hits").innerHTML = innerLoading;
        helper.search();
      }
    },
  });

  const configure = instantsearch.widgets.configure({
    hitsPerPage: algolia.hits.per_page ?? 5,
  });

  const searchBox = instantsearch.widgets.searchBox({
    container: "#algolia-search-input",
    showReset: false,
    showSubmit: false,
    placeholder: algolia.languages.input_placeholder,
    showLoadingIndicator: true,
    searchOnEnterKeyPressOnly: true,
    searchAsYouType: false,
  });

  const hits = instantsearch.widgets.hits({
    container: "#algolia-hits",
    templates: {
      item(data) {
        const rawLink = data.permalink ? data.permalink : GLOBAL_CONFIG.root + data.path;
        // 验证链接安全性，防止 javascript: 协议注入
        const link = /^(https?:\/\/|\/)/i.test(rawLink) ? escapeHtml(rawLink) : escapeHtml("/" + rawLink);
        const result = data._highlightResult;
        const loadingLogo = document.querySelector("#algolia-hits .anzhiyu-spin");
        if (loadingLogo) {
          loadingLogo.style.display = "none";
        }
        setTimeout(() => {
          document.querySelector("#algolia-search .ais-SearchBox-input").focus();
        }, 200);
        // result.title.value 已被 Algolia 处理包含 <mark> 高亮标签，保持原样
        // 如果标题不存在则使用转义后的原标题或默认值
        const titleHtml = result.title?.value || escapeHtml(data.title) || "no-title";
        return `
          <a href="${link}" class="algolia-hit-item-link">
          <span class="algolia-hits-item-title">${titleHtml}</span>
          </a>`;
      },
      empty: function (data) {
        const loadingLogo = document.querySelector("#algolia-hits .anzhiyu-spin");
        console.info(loadingLogo);
        if (loadingLogo) {
          loadingLogo.style.display = "none";
        }
        setTimeout(() => {
          document.querySelector("#algolia-search .ais-SearchBox-input").focus();
        }, 200);
        // 使用 escapeHtml 转义用户输入，防止 XSS 攻击
        return (
          '<div id="algolia-hits-empty">' +
          GLOBAL_CONFIG.algolia.languages.hits_empty.replace(/\$\{query}/, escapeHtml(data.query)) +
          "</div>"
        );
      },
    },
    cssClasses: {
      item: "algolia-hit-item",
    },
  });

  const stats = instantsearch.widgets.stats({
    container: "#algolia-info > .algolia-stats",
    templates: {
      text: function (data) {
        const stats = GLOBAL_CONFIG.algolia.languages.hits_stats
          .replace(/\$\{hits}/, data.nbHits)
          .replace(/\$\{time}/, data.processingTimeMS);
        return `<hr>${stats}`;
      },
    },
  });

  const powerBy = instantsearch.widgets.poweredBy({
    container: "#algolia-info > .algolia-poweredBy",
  });

  const pagination = instantsearch.widgets.pagination({
    container: "#algolia-pagination",
    totalPages: algolia.hits.per_page ?? 5,
    templates: {
      first: '<i class="anzhiyufont anzhiyu-icon-angle-double-left"></i>',
      last: '<i class="anzhiyufont anzhiyu-icon-angle-double-right"></i>',
      previous: '<i class="anzhiyufont anzhiyu-icon-angle-left"></i>',
      next: '<i class="anzhiyufont anzhiyu-icon-angle-right"></i>',
    },
    scrollTo: false,
    showFirstLast: false,
    cssClasses: {
      root: "pagination",
      item: "pagination-item",
      link: "page-number",
      active: "current",
      disabled: "disabled-item",
    },
  });

  search.addWidgets([configure, searchBox, hits, stats, powerBy, pagination]); // add the widgets to the instantsearch instance

  search.start();

  searchClickFn();
  searchFnOnce();

  window.addEventListener("pjax:complete", () => {
    !anzhiyu.isHidden($searchMask) && closeSearch();
    searchClickFn();
  });

  window.pjax &&
    search.on("render", () => {
      window.pjax.refresh(document.getElementById("algolia-hits"));
    });
});
