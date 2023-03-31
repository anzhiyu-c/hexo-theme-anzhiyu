const urlFor = require("hexo-util").url_for.bind(hexo);
function link(args) {
  args = args.join(" ").split(",");
  let title = args[0];
  let sitename = args[1];
  let link = args[2];
  let imgUrl = args[3] || "";
  let isOutside = args[4] || "no";

  link = link.trim();

  // 获取网页favicon
  if (!imgUrl) {
    let urlNoProtocol = link.replace(/^https?\:\/\//i, "");
    imgUrl = "https://api.iowen.cn/favicon/" + urlNoProtocol + ".png";
  }
  if (isOutside === "yes") {
    imgUrl = "/img/favicon.ico"
  }

  return `<div calss='anzhiyu-tag-link'><a class="tag-Link" target="_blank" href="${urlFor(link)}">
    <div class="tag-link-tips">${isOutside != "yes" ? "引用站外地址" : "站内地址"}</div>
    <div class="tag-link-bottom">
        <div class="tag-link-left" style="background-image: url(${imgUrl});"></div>
        <div class="tag-link-right">
            <div class="tag-link-title">${title}</div>
            <div class="tag-link-sitename">${sitename}</div>
        </div>
        <i class="fa-solid fa-angle-right"></i>
    </div>
    </a></div>`;
}

hexo.extend.tag.register("link", link, { ends: false });
