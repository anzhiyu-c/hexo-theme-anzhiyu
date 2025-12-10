const urlFor = require("hexo-util").url_for.bind(hexo);

function link(args) {
  args = args.join(" ").split(",");
  let title = args[0] || "";
  let sitename = args[1] || "";
  let link = args[2] || "";
  let imgUrl = args[3] || "";

  title = title.trim();
  sitename = sitename.trim();
  link = link.trim();
  imgUrl = imgUrl.trim();

  // 判断是否为站内地址：相对路径（以 / 开头但不是 //）或者明确指定 imgUrl 为 "true"
  const isRelativePath = link.startsWith("/") && !link.startsWith("//");
  const isExplicitInside = imgUrl === "true";
  const InsideStation = isRelativePath || isExplicitInside;

  // 获取主题配置的 favicon
  const favicon = hexo.theme.config.favicon || "/favicon.ico";

  // 图标逻辑：
  // 1. 有明确指定图标（非 "true"）时使用指定图标
  // 2. 站内地址使用主题 favicon
  // 3. 站外地址尝试获取对方网站 favicon
  let iconUrl = "";
  let useAutoFavicon = false;

  if (imgUrl && imgUrl !== "true") {
    // 用户指定了图标
    iconUrl = imgUrl;
  } else if (InsideStation) {
    // 站内地址使用主题 favicon
    iconUrl = favicon;
  } else {
    // 站外地址自动获取 favicon
    useAutoFavicon = true;
    try {
      const urlObj = new URL(link);
      iconUrl = `${urlObj.origin}/favicon.ico`;
    } catch (e) {
      // URL 解析失败，不设置图标
      iconUrl = "";
    }
  }

  const hasIcon = iconUrl || useAutoFavicon;
  const targetAttr = InsideStation ? "" : 'target="_blank" rel="noopener external nofollow noreferrer"';

  return `<div class='anzhiyu-tag-link'><a class="tag-Link" ${targetAttr} href="${urlFor(link)}">
    <div class="tag-link-tips">${InsideStation ? "站内地址" : "引用站外地址"}</div>
    <div class="tag-link-bottom">
        <div class="tag-link-left"${hasIcon ? ` data-icon="${iconUrl}"` : ""}>
          <img class="tag-link-favicon" src="${iconUrl}" onerror="this.style.display='none';this.nextElementSibling.style.display='flex';" style="${
    hasIcon ? "" : "display:none"
  }" alt="favicon"/>
          <i class="anzhiyufont anzhiyu-icon-link" style="${hasIcon ? "display:none" : "display:flex"}"></i>
        </div>
        <div class="tag-link-right">
            <div class="tag-link-title">${title}</div>
            <div class="tag-link-sitename">${sitename}</div>
        </div>
        <i class="anzhiyufont anzhiyu-icon-angle-right"></i>
    </div>
    </a></div>`;
}

hexo.extend.tag.register("link", link, { ends: false });
