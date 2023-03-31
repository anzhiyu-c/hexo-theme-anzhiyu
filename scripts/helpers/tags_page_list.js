hexo.extend.helper.register('tags_page_list', function (type) {
  let html = ``
  hexo.locals.get(type).map(function (item) {
    html += `
      <a href="/${item.path}" id="/${item.path}">
        <span class="tags-punctuation">#</span>${item.name}
        <span class="tagsPageCount">${item.length}</span>
      </a>
    `
  })
  return html
})