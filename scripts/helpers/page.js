/**
 * AnZhiYu
 * @example
 *  page_description()
 *  cloudTags(source, minfontsize, maxfontsize, limit)
 */

"use strict";

const { stripHTML, escapeHTML, prettyUrls } = require("hexo-util");
const crypto = require("crypto");

hexo.extend.helper.register('page_description', function () {
  const { config, page } = this
  let description = page.description || page.content || page.title || config.description

  if (description) {
    description = escapeHTML(stripHTML(description).substring(0, 150)
      .trim()
    ).replace(/\n/g, ' ')
    return description
  }
})

hexo.extend.helper.register("get_page_fill_description", function () {
  const { config, page } = this;
  let description = page.content || page.description || page.title || config.description;

  if (description) {
    // 使用正则表达式匹配 h1-h6 标签中的文本内容
    const regex = /<h[1-6][^>]*>(.*?)<\/h[1-6]>/g;
    const headings = [];
    let match;
    while ((match = regex.exec(description))) {
      headings.push(match[0]);
    }

    const contents = headings.map(heading => {
      // 去掉 a 标签及其内容
      const text = heading.replace(/<a[^>]*>.*?<\/a>/g, "");
      // 去除特殊符号 &,:,; 等
      return text.replace(/<\/?[^>]+>|&|:|;|quot;|，|,|“|”|"|'|#/g, "");
    });

    // 排除 div.post-ai-description 元素中的内容
    const excludedDivRegex = /<div[^>]*class="?post-ai-description"?.*?>[\s\S]*?<\/div>/gi;
    description = description.replace(excludedDivRegex, "");

    description = escapeHTML(stripHTML(description).trim())
      .replace(/\n/g, " ")
      .replace(/[^\u4e00-\u9fa5]/gi, "");

    return contents.join(", ") + description;
  }
});

hexo.extend.helper.register("cloudTags", function (options = {}) {
  const env = this;
  let source = options.source;
  const minfontsize = options.minfontsize;
  const maxfontsize = options.maxfontsize;
  const limit = options.limit;
  const unit = options.unit || "px";
  const colorful = options.color || false;
  const highlightTags = options.highlightTags || [];

  let result = "";
  if (limit > 0) {
    source = source.limit(limit);
  }

  const sizes = [];
  source.sort("length").forEach(tag => {
    const { length } = tag;
    if (sizes.includes(length)) return;
    sizes.push(length);
  });

  const length = sizes.length - 1;
  source.sort("name").forEach(tag => {
    const ratio = length ? sizes.indexOf(tag.length) / length : 0;
    const size = minfontsize + (maxfontsize - minfontsize) * ratio;
    let style = `font-size: ${parseFloat(size.toFixed(2))}${unit};`;
    if (colorful) {
      const color =
        "rgb(" +
        Math.floor(Math.random() * 201) +
        ", " +
        Math.floor(Math.random() * 201) +
        ", " +
        Math.floor(Math.random() * 201) +
        ")"; // 0,0,0 -> 200,200,200
      style += ` color: ${color};`;
    }

    const matchingTag = highlightTags.find(highlightTag => highlightTag === tag.name);
    if (matchingTag) {
      style += ` font-weight: 500; color: var(--anzhiyu-lighttext)`;
    }
    result += `<a href="${env.url_for(tag.path)}" style="${style}">${tag.name}<sup>${tag.length}</sup></a>`;
  });
  return result;
});

hexo.extend.helper.register("urlNoIndex", function (url = null) {
  return prettyUrls(url || this.url, { trailing_index: false, trailing_html: false });
});

hexo.extend.helper.register("md5", function (path) {
  return crypto
    .createHash("md5")
    .update(decodeURI(this.url_for(path)))
    .digest("hex");
});

hexo.extend.helper.register('injectHtml', function (data) {
  if (!data) return ''
  return data.join('')
})

hexo.extend.helper.register("findArchivesTitle", function (page, menu, date) {
  if (page.year) {
    const dateStr = page.month ? `${page.year}-${page.month}` : `${page.year}`;
    const date_format = page.month ? hexo.theme.config.aside.card_archives.format : "YYYY";
    return date(dateStr, date_format);
  }

  const defaultTitle = this._p("page.archives");
  if (!menu) return defaultTitle;

  const loop = m => {
    for (const key in m) {
      if (typeof m[key] === "object") {
        loop(m[key]);
      }

      if (/\/archives\//.test(m[key])) {
        return key;
      }
    }
  };

  return loop(menu) || defaultTitle;
});

hexo.extend.helper.register('isImgOrUrl', function (path) {
  const imgTestReg = /\.(png|jpe?g|gif|svg|webp)(\?.*)?$/i
  return path.indexOf('//') !== -1 || imgTestReg.test(path)
})