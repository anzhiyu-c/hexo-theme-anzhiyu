// 'use strict'
//
// function poem (args, content) {
//   return `<div class="tip"><b>${content}<b></div>`
// }
//
// hexo.extend.tag.register('tip', tip, { ends: true })

'use strict'

function tip (args, content) {
  const tipclass = args ? args.join(' ') : 'info'
  return `<div class="tip ${args.join(' ')}">${hexo.render.renderSync({ text: content, engine: 'markdown' })}</div>`
}

hexo.extend.tag.register('tip',tip, { ends: true })
