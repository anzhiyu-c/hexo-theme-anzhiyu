/**
 * AnZhiYu
 * mermaid
 * https://github.com/mermaid-js/mermaid
 */

'use strict'

const { escapeHTML } = require('hexo-util')

function mermaid (args, content) {
  return `<div class="mermaid-wrap"><pre class="mermaid-src" hidden>
  ${escapeHTML(content)}
  </pre></div>`
}

// 自动将 ```mermaid 转换为 {% mermaid %}
hexo.extend.filter.register('before_post_render', function(data) {
  const reg = /```mermaid([\s\S]+?)```/g;
  data.content = data.content.replace(reg, function(match, content) {
    return '{% mermaid %}' + content + '{% endmermaid %}';
  });
  return data;
}, 1);

hexo.extend.tag.register('mermaid', mermaid, { ends: true })
