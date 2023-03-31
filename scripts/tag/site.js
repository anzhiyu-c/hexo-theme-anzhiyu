'use strict';

function postSiteCardGroup(args, content) {
  if (args.length > 0) {
    return `<div class="site-card-group"><p class='p h2'>${args}</p>${content}</div>`;
  } else {
    return `<div class="site-card-group">${content}</div>`;
  }
}
function postSiteCard(args) {
  args = args.join(' ').split(', ')
  // 所有支持的参数
  let title = args[0].trim();
  let url = '';
  let screenshot = '';
  let avatar = '';
  let description = '';
  // 解析
  if (args.length > 1) {
    for (let i = 1; i < args.length; i++) {
      let tmp = args[i].trim();
      if (tmp.includes('url=')) {
        url = tmp.substring(4, tmp.length);
      } else if (tmp.includes('screenshot=')) {
        screenshot = tmp.substring(11, tmp.length);
      } else if (tmp.includes('avatar=')) {
        avatar = tmp.substring(7, tmp.length);
      } else if (tmp.includes('description=')) {
        description = tmp.substring(12, tmp.length);
      }
    }
  }
  // 布局
  let result = '';
  result += `<a class="site-card" href="${url}" data-title=${description}>`;
  result += '<div class="wrapper cover"><img class="cover fadeIn" src="' + screenshot + '"/></div>';
  result += '<div class="info">';
  if (avatar.length > 0) {
    result += `<img class="flink-avatar" src="${avatar}"/>`;
  } else {

  }

  result += '<span class="site-title">' + title + '</span>';

  result += '</div></a>';
  return result;

}

// {% site link, img, title %}
// {% site link, img, title, description %}
hexo.extend.tag.register('site', postSiteCard);
hexo.extend.tag.register('sitegroup', postSiteCardGroup, {ends: true});
