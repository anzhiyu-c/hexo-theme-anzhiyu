/**
 * AnZhiYu
 * lazyload
 * replace src to data-lazy-src
 */

"use strict";

const urlFor = require("hexo-util").url_for.bind(hexo);

const lazyload = htmlContent => {
  const error_img = hexo.theme.config.error_img.post_page
  const bg = hexo.theme.config.lazyload.placeholder
    ? urlFor(hexo.theme.config.lazyload.placeholder)
    : "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";
  const replaceImgInFragment = fragment =>
    fragment.replace(/<img\b[^>]*>/gi, tag => {
      if (/class\s*=\s*['"][^'"]*nolazyload[^'"]*['"]/i.test(tag)) return tag;
      if (/\bdata-lazy-src\s*=\s*/i.test(tag)) return tag;
      if (!/\bsrc\s*=\s*/i.test(tag)) return tag;

      return tag.replace(
        /\bsrc\s*=\s*(["']?)([^"'\s>]+)\1/i,
        `src= "${bg}" onerror="this.onerror=null,this.src=&quot;${error_img}&quot;" data-lazy-src="$2"`
      );
    });

  return htmlContent
    .split(/(<script\b[^>]*>[\s\S]*?<\/script>)/gi)
    .map(part => (/^<script\b/i.test(part) ? part : replaceImgInFragment(part)))
    .join("");
}

hexo.extend.filter.register('after_render:html', data => {
  const { enable, field } = hexo.theme.config.lazyload
  if (!enable || field !== 'site') return
  return lazyload(data)
})

hexo.extend.filter.register('after_post_render', data => {
  const { enable, field } = hexo.theme.config.lazyload
  if (!enable || field !== 'post') return
  data.content = lazyload(data.content)
  return data
})
