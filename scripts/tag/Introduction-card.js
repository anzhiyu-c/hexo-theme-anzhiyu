/**
 * Introduction-card 介绍卡片
 * {% intCard link img tip cardTitle logo title subTitle %}
 */

'use strict';

const urlFor = require('hexo-util').url_for.bind(hexo);

function intCard(args) {
  const [link, img, tip, cardTitle, logo, title, subTitle] = args;

  const defaultTip = '最爱';
  const defaultCardTitle = '最爱';
  const defaultLogo = '';
  const defaultTitle = '';
  const defaultSubTitle = '';

  const renderIntroductionCardBottom = (args) => {
    const [logo, title, subTitle] = args;
    return `
      <div class="introduction-card-bottom">
        <div class="left">
          <img src="${urlFor(logo)}" class="no-lightbox" alt="introduction"/>
          <div class="info">
            <div class="title">${title}</div>
            <div class="subTitle">${subTitle}</div>
          </div>
        </div>
        <div class="right">
          <a href="${urlFor(link)}" tableindex="-1" class="no-text-decoration">前往</a>
        </div>
      </div>
    `;
  };

  const introductionCardBottom = (logo || title || subTitle) ? renderIntroductionCardBottom([logo || defaultLogo, title || defaultTitle, subTitle || defaultSubTitle]) : '';

  const radius = introductionCardBottom ? "" : "height: 100%;border-radius:15px;";
  const height = introductionCardBottom ? "" : "height: 416px;";

  return `
    <div class="introduction-card" style="${height}">
      <div class="introduction-card-top" style="${radius}">
        <div class="int-card-info">
          <div class="int-tip">${tip || defaultTip}</div>
          <div class="int-cardTitle">${cardTitle || defaultCardTitle}</div>
        </div>
        <img src="${urlFor(img)}" class="no-lightbox" alt="introduction"/>
      </div>
      ${introductionCardBottom}
    </div>
  `;
}

hexo.extend.tag.register('intCard', intCard, { ends: false });
