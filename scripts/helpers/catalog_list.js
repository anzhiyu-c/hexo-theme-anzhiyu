hexo.extend.helper.register("catalog_list", function (type) {
  let html = ``;
  hexo.locals.get(type).map(function (item) {
    html += `
    <div class="catalog-list-item" id="/${item.path}">
      <a href="/${item.path}">
        ${item.name}
      </a>
    </div>
    `;
  });
  return html;
});
