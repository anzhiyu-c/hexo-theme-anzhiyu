module.exports.config = {
  /**
   * 与 ServiceWorker 有关的配置项
   * 若想禁止插件自动生成 sw，此项填 false 即可
   * @type ?Object|boolean
   */
  serviceWorker: {
    escape: 0,
    cacheName: "AnZhiYuBlogCache",
    debug: false,
  },
  register: {
    onsuccess: undefined,
    onerror: undefined,
    builder: (root, hexoConfig, pluginConfig) => {
      const { onerror, onsuccess } = pluginConfig.register;
      return `<script>
                    (() => {
                        const sw = navigator.serviceWorker
                        const error = ${onerror && onerror.toString()}
                        if (!sw?.register('${new URL(root).pathname}sw.js')
                            ${onsuccess ? "?.then(" + onsuccess + ")" : ""}
                            ?.catch(error)
                            ) error()
                    })()
                </script>`;
    },
  },
  dom: {
    onsuccess: () => {
      if('addEventListener' in document){
        document.addEventListener('DOMContentLoaded', function(){
          const isSnackbar = GLOBAL_CONFIG.Snackbar !== undefined;
          isSnackbar && anzhiyu.snackbarShow("已刷新缓存，更新为最新内容");
        }, false)//false代表在冒泡阶段触发，true在捕获阶段触发
      }
    },
  },
  json: {
    maxHtml: 15,
    charLimit: 1024,
    precisionMode: {
      default: false,
    },
    merge: {
      index: true,
      tags: true,
      archives: true,
      categories: true,
      custom: [],
    },
    exclude: [/sw\.js$/],
  },
  external: {
    timeout: 1500,
    js: [
      {
        head: "getScript\(",
        tail: "\)",
      },
    ],
    skip: [],
    replace: [
      {
        source: ["npm.elemecdn.com"],
        dist: "cdn.cbd.int",
      },
    ],
  },
  sort: {
    keywords: false,
  },
};

/**
 * 缓存列表
 * @param clean 清理全站时是否删除其缓存
 * @param match {function(URL)} 匹配规则
 */
module.exports.cacheRules = {
  simple: {
    clean: true,
    search: false,
    match: (url, $eject) => {
      const allowedHost = $eject.domain;
      const allowedPaths = ["/404.html", "/css/index.css"];
      return url.host === allowedHost && allowedPaths.includes(url.pathname);
    },
  },
  cdn: {
    clean: true,
    match: url =>
      [
        "cdn.cbd.int",
        "lf26-cdn-tos.bytecdntp.com",
        "lf6-cdn-tos.bytecdntp.com",
        "lf3-cdn-tos.bytecdntp.com",
        "lf9-cdn-tos.bytecdntp.com",
        "cdn.staticfile.org",
        "npm.elemecdn.com",
      ].includes(url.host) && url.pathname.match(/\.(js|css|woff2|woff|ttf|cur)$/),
  },
};

/**
 * 获取一个 URL 对应的备用 URL 列表，访问顺序按列表顺序，所有 URL 访问时参数一致
 * @param srcUrl {string} 原始 URL
 * @return {{list: string[], timeout: number}} 返回 null 或不返回表示对该 URL 不启用该功能。timeout 为超时时间（ms），list 为 URL 列表，列表不包含原始 URL 表示去除原始访问
 */
module.exports.getSpareUrls = srcUrl => {
  if (srcUrl.startsWith("https://npm.elemecdn.com")) {
    return {
      timeout: 3000,
      list: [srcUrl, `https://cdn.cbd.int/${new URL(srcUrl).pathname}`],
    };
  }
};

/**
 * 获取要插入到 sw 中的变量或常量
 * @param hexo hexo 对象
 * @param rules 合并后的 sw-rules 对象
 * @return {Object} 要插入的键值对
 */
module.exports.ejectValues = (hexo, rules) => {
  return {
    domain: {
      prefix: "const",
      value: new URL(hexo.config.url).host,
    },
  };
};
