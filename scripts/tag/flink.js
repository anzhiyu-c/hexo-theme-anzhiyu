/**
 * flink
 */

"use strict";

const urlFor = require("hexo-util").url_for.bind(hexo);

const flinkFn = (args, content) => {
  content = hexo.render.renderSync({ text: content, engine: "yaml" });

  let result = "";

  content.forEach(i => {
    const className = i.class_name ? `<div class="flink-name">${i.class_name}</div>` : "";
    const classDesc = i.class_desc ? `<div class="flink-desc">${i.class_desc}</div>` : "";

    let listResult = "";
    let listContainerClass = "";
    if (i.flink_style === "anzhiyu") {
      listContainerClass = "anzhiyu-flink-list";
      i.link_list.forEach(j => {
        listResult += `
            <div class="flink-list-item">
              <a href="${j.link}" title="${j.name}" class="cf-friends-link" target="_blank">
                <div class="flink-item-icon">
                  <img class="no-lightbox cf-friends-avatar" src="${
                    j.avatar
                  }" onerror='this.onerror=null;this.src="${urlFor(hexo.theme.config.error_img.flink)}"' alt="${
          j.name
        }" />
                </div>
                <div class="flink-item-info">
                  <div class="flink-item-name">${j.name}</div>
                  <div class="flink-item-desc" title="${j.descr}">${j.descr}</div>
                </div>
              </a>
            </div>`;
      });
    } else {
      listContainerClass = "flexcard-flink-list";
      i.link_list.forEach(j => {
        listResult += `
              <a href="${j.link}" title="${j.name}" target="_blank" class="flink-list-card cf-friends-link">
                <div class="wrapper cover">
                    <img class="no-lightbox cover fadeIn" src="${
                      j.siteshot
                    }" onerror='this.onerror=null;this.src="${urlFor(hexo.theme.config.error_img.flink)}"' alt="${
          j.name
        }" />
                </div>
                <div class="info">
                  <img class="no-lightbox cf-friends-avatar flink-avatar" src="${
                    j.avatar
                  }" onerror='this.onerror=null;this.src="${urlFor(hexo.theme.config.error_img.flink)}"' alt="${
          j.name
        }"/>
                  <span class="flink-sitename cf-friends-name">${j.name}</span>
                </div>
              </a>`;
      });
    }

    result += `${className}${classDesc} <div class="flink-list"><div class="${listContainerClass}">${listResult}</div></div>`;
  });

  return `<div class="flink">${result}</div>`;
};

hexo.extend.tag.register("flink", flinkFn, { ends: true });
