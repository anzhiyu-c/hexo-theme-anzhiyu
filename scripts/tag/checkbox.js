'use strict';

function postCheckbox(args) {
  args = args.join(' ').split(',')
  var cls = ''
  var text = ''
  var checked = false
  if (args.length > 1) {
    cls = (args[0] || '').trim()
    if (cls.length > 0) {
      cls = ' ' + cls
    }
    if (cls.indexOf('checked') > -1) {
      checked = true
    }
    text = (args[1] || '').trim()
  } else if (args.length > 0) {
    text = (args[0] || '').trim()
  }
  if (text.length > 0) {
    return `<div class='checkbox${cls}'><input type="checkbox" ${ checked ? 'checked="checked"' : '' }/>
            ${hexo.render.renderSync({text: text, engine: 'markdown'}).split('\n').join('')}
            </div>`
  }
}
function postRadio(args) {
  args = args.join(' ').split(',')
  var cls = ''
  var text = ''
  var checked = false
  if (args.length > 1) {
    cls = (args[0] || '').trim()
    if (cls.length > 0) {
      cls = ' ' + cls
    }
    if (cls.indexOf('checked') > -1) {
      checked = true
    }
    text = (args[1] || '').trim()
  } else if (args.length > 0) {
    text = (args[0] || '').trim()
  }
  if (text.length > 0) {
    return `<div class='checkbox${cls}'><input type="radio" ${ checked ? 'checked="checked"' : '' }/>
            ${hexo.render.renderSync({text: text, engine: 'markdown'}).split('\n').join('')}
            </div>`
  }
}
// {% checkbox text %}
// {% checkbox checked, text %}
// {% checkbox color checked, text %}
hexo.extend.tag.register('checkbox', postCheckbox);
hexo.extend.tag.register('radio', postRadio);
