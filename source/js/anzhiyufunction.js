// 如果当前页有评论就执行函数
if (document.getElementById("post-comment")) owoBig();

function mouseleaveHomeCard() {
  const topGroup = document.querySelector(".topGroup");
  if (!topGroup) return;
  //首页大卡片恢复显示
  topGroup.addEventListener("mouseleave", function () {
    document.getElementById("todayCard").classList.remove("hide");
    document.getElementById("todayCard").style.zIndex = 1;
  });
}

// 表情放大
function owoBig() {
  let flag = 1, // 设置节流阀
    owo_time = "", // 设置计时器
    m = 3; // 设置放大倍数
  // 创建盒子
  let div = document.createElement("div");
  // 设置ID
  div.id = "owo-big";
  // 插入盒子
  let body = document.querySelector("body");
  body.appendChild(div);

  document.getElementById("post-comment").addEventListener("DOMNodeInserted", dom => {
    if (dom.target.classList && dom.target.classList.value == "OwO-body") {
      let owo_body = dom.target;

      // 禁用右键（手机端长按会出现右键菜单，为了体验给禁用掉）
      owo_body.addEventListener("contextmenu", e => e.preventDefault());

      // 鼠标移入
      owo_body.addEventListener("mouseover", e => {
        if (e.target.tagName == "IMG" && flag) {
          flag = 0;
          // 移入300毫秒后显示盒子
          owo_time = setTimeout(() => {
            let height = e.target.clientHeight * m; // 盒子高
            let width = e.target.clientWidth * m; // 盒子宽
            let left = e.x - e.offsetX - (width - e.target.clientWidth) / 2; // 盒子与屏幕左边距离
            if (left + width > body.clientWidth) {
              left -= left + width - body.clientWidth + 10;
            } // 右边缘检测，防止超出屏幕
            if (left < 0) left = 10; // 左边缘检测，防止超出屏幕
            let top = e.y - e.offsetY; // 盒子与屏幕顶部距离

            // 设置盒子样式
            div.style.height = height + "px";
            div.style.width = width + "px";
            div.style.left = left + "px";
            div.style.top = top + "px";
            div.style.display = "flex";
            // 在盒子中插入图片
            div.innerHTML = `<img src="${e.target.src}">`;
          }, 300);
        }
      });

      // 鼠标移出
      owo_body.addEventListener("mouseout", e => {
        // 隐藏盒子
        div.style.display = "none";
        flag = 1;
        clearTimeout(owo_time);
      });
    }
  });
}
// 判断是否在el内
function isInViewPortOfOne(el) {
  if (!el) return;
  const viewPortHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
  const offsetTop = el.offsetTop;
  const scrollTop = document.documentElement.scrollTop;
  const top = offsetTop - scrollTop;
  return top <= viewPortHeight;
}

// 网页百分比
function anzhiyuScrollFn() {
  // 第一次滑动到底部的标识符
  let scrollBottomFirstFlag = false;
  // 缓存常用dom元素
  const musicDom = document.getElementById("nav-music"),
    footerDom = document.getElementById("footer"),
    waterfallDom = document.getElementById("waterfall"),
    percentBtn = document.getElementById("percent");

  // 页面底部Dom是否存在
  let pageBottomDomFlag = document.getElementById("post-comment") || document.getElementById("footer");

  function scrollFn() {
    // 自动隐藏音乐
    if (footerDom && musicDom && 768 < document.body.clientWidth) {
      musicDom.style.bottom = !isInViewPortOfOne(footerDom) ? "20px" : "-10px";
      musicDom.style.opacity = !isInViewPortOfOne(footerDom) ? "1" : "0";
    }

    // 处理滚动百分比
    let scrollTop = document.documentElement.scrollTop || window.pageYOffset, // 卷去高度
      scrollHeight =
        Math.max(
          document.body.scrollHeight,
          document.documentElement.scrollHeight,
          document.body.offsetHeight,
          document.documentElement.offsetHeight,
          document.body.clientHeight,
          document.documentElement.clientHeight
        ) - document.documentElement.clientHeight, // 整个网页高度 减去 可视高度
      result = Math.round((scrollTop / scrollHeight) * 100); // 计算百分比

    result = Math.min(99, Math.max(0, result));

    // 滚动到底部区域需要做的操作
    if (isInViewPortOfOne(pageBottomDomFlag) || 90 < result) {
      document.getElementById("nav-totop").classList.add("long");
      percentBtn.textContent = "返回顶部";
      scrollBottomFirstFlag = true;
    } else {
      document.getElementById("nav-totop").classList.remove("long");
      percentBtn.textContent = result;
    }

    // 如果当前页面需要瀑布流，就处理瀑布流
    if (waterfallDom) {
      const waterfallResult = scrollTop % document.documentElement.clientHeight; // 卷去一个视口
      if (!scrollBottomFirstFlag && waterfallResult + 100 >= document.documentElement.clientHeight) {
        console.info(waterfallResult, document.documentElement.clientHeight);
        setTimeout(() => {
          waterfall("#waterfall");
        }, 500);
      } else {
        setTimeout(() => {
          waterfallDom && waterfall("#waterfall");
        }, 500);
      }
    }
  }

  // 绑定滚动处理函数
  window.anzhiyuScrollFnToDo = btf.throttle(scrollFn, 48); // 执行函数
  window.addEventListener("scroll", anzhiyuScrollFnToDo);
}

// 开发者工具键盘监听
window.onkeydown = function (e) {
  123 === e.keyCode && btf.snackbarShow("开发者模式已打开，请遵循GPL协议", !1);
};

// 跳转开往
function totraveling() {
  btf.snackbarShow("即将跳转到「开往」项目的成员博客，不保证跳转网站的安全性和可用性", !1, 5000);
  setTimeout(function () {
    window.open("https://www.travellings.cn/go.html");
  }, "5000");
}

// 工具函数替换字符串
function replaceAll(e, n, t) {
  return e.split(n).join(t);
}

//深色模式切换
var navFn = {
  switchDarkMode: () => {
    // Switch Between Light And Dark Mode
    // Switch Between Light And Dark Mode
    const nowMode = document.documentElement.getAttribute("data-theme") === "dark" ? "dark" : "light";
    if (nowMode === "light") {
      activateDarkMode();
      saveToLocal.set("theme", "dark", 2);
      GLOBAL_CONFIG.Snackbar !== undefined && btf.snackbarShow(GLOBAL_CONFIG.Snackbar.day_to_night);
    } else {
      activateLightMode();
      saveToLocal.set("theme", "light", 2);
      GLOBAL_CONFIG.Snackbar !== undefined && btf.snackbarShow(GLOBAL_CONFIG.Snackbar.night_to_day);
    }
    // handle some cases
    typeof runMermaid === "function" && window.runMermaid();
  },
};

// 音乐绑定事件
function musicBindEvent() {
  document.querySelector("#nav-music .aplayer-music").addEventListener("click", function () {
    anzhiyu.musicTelescopic();
  });
  document.querySelector("#nav-music .aplayer-button").addEventListener("click", function () {
    anzhiyu.musicToggle(false);
  });
}

// 视频初始化
function dogePlayerInit(initData) {
  new DogePlayer({
    container: document.getElementById(initData.container),
    userId: initData.userId || 4945,
    vcode: initData.vcode,
    autoPlay: false,
  });
}

// 判断是否是移动端
function hasMobile() {
  let isMobile = false;
  if (
    navigator.userAgent.match(
      /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i
    ) ||
    document.body.clientWidth < 800
  ) {
    // 移动端
    isMobile = true;
  }
  return isMobile;
}

//封面纯色
function coverColor() {
  var path = document.getElementById("post-top-bg")?.src;
  // console.log(path);
  const root = document.querySelector(":root");
  if (path !== undefined) {
    var httpRequest = new XMLHttpRequest(); //第一步：建立所需的对象
    httpRequest.open("GET", path + "?imageAve", true); //第二步：打开连接  将请求参数写在url中  ps:"./Ptest.php?name=test&nameone=testone"
    httpRequest.send(); //第三步：发送请求  将请求参数写在URL中
    /**
     * 获取数据后的处理程序
     */
    httpRequest.onreadystatechange = function () {
      if (httpRequest.readyState == 4 && httpRequest.status == 200) {
        var json = httpRequest.responseText; //获取到json字符串，还需解析
        try {
          var obj = JSON.parse(json, function (key, value) {
            return value;
          });

          var value = obj.RGB;
          value = "#" + value.slice(2);

          // 亮色转化
          if (getContrastYIQ(value) == "light") {
            value = LightenDarkenColor(colorHex(value), -40);
          }
          // 设置转化后的值
          root.style.setProperty("--anzhiyu-bar-background", value);
          // 修改顶栏tab bar状态栏
          anzhiyu.initThemeColor();
        } catch (err) {
          // 在这里处理 JSON.parse() 抛出的错误
          root.style.setProperty("--anzhiyu-bar-background", "var(--anzhiyu-main)");
          // 修改顶栏tab bar状态栏
          anzhiyu.initThemeColor();
        }
      }
    };
  } else {
    // 没有获取到文章顶图元素，也就是不在文章页，设置bar meta样式
    root.style.setProperty("--anzhiyu-bar-background", "var(--anzhiyu-meta-theme-color)");
  }
  anzhiyu.initThemeColor();
}

//RGB颜色转化为16进制颜色
function colorHex(str) {
  var reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
  var that = str;
  if (/^(rgb|RGB)/.test(that)) {
    var aColor = that.replace(/(?:\(|\)|rgb|RGB)*/g, "").split(",");
    var strHex = "#";
    for (var i = 0; i < aColor.length; i++) {
      var hex = Number(aColor[i]).toString(16);
      if (hex === "0") {
        hex += hex;
      }
      strHex += hex;
    }
    if (strHex.length !== 7) {
      strHex = that;
    }
    return strHex;
  } else if (reg.test(that)) {
    var aNum = that.replace(/#/, "").split("");
    if (aNum.length === 6) {
      return that;
    } else if (aNum.length === 3) {
      var numHex = "#";
      for (var i = 0; i < aNum.length; i += 1) {
        numHex += aNum[i] + aNum[i];
      }
      return numHex;
    }
  } else {
    return that;
  }
}

//16进制颜色转化为RGB颜色
function colorRgb(str) {
  var reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
  var sColor = str.toLowerCase();
  if (sColor && reg.test(sColor)) {
    if (sColor.length === 4) {
      var sColorNew = "#";
      for (var i = 1; i < 4; i += 1) {
        sColorNew += sColor.slice(i, i + 1).concat(sColor.slice(i, i + 1));
      }
      sColor = sColorNew;
    }
    //处理六位的颜色值
    var sColorChange = [];
    for (var i = 1; i < 7; i += 2) {
      sColorChange.push(parseInt("0x" + sColor.slice(i, i + 2)));
    }
    return "rgb(" + sColorChange.join(",") + ")";
  } else {
    return sColor;
  }
}

//变暗变亮主方法
function LightenDarkenColor(col, amt) {
  var usePound = false;

  if (col[0] == "#") {
    col = col.slice(1);
    usePound = true;
  }

  var num = parseInt(col, 16);

  var r = (num >> 16) + amt;

  if (r > 255) r = 255;
  else if (r < 0) r = 0;

  var b = ((num >> 8) & 0x00ff) + amt;

  if (b > 255) b = 255;
  else if (b < 0) b = 0;

  var g = (num & 0x0000ff) + amt;

  if (g > 255) g = 255;
  else if (g < 0) g = 0;

  return (usePound ? "#" : "") + String("000000" + (g | (b << 8) | (r << 16)).toString(16)).slice(-6);
}
//判断是否为亮色
function getContrastYIQ(hexcolor) {
  var colorrgb = colorRgb(hexcolor);
  var colors = colorrgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
  var red = colors[1];
  var green = colors[2];
  var blue = colors[3];
  var brightness;
  brightness = red * 299 + green * 587 + blue * 114;
  brightness = brightness / 255000;
  if (brightness >= 0.5) {
    return "light";
  } else {
    return "dark";
  }
}

//监听跳转页面输入框是否按下回车
function listenToPageInputPress() {
  var input = document.getElementById("toPageText");
  if (input) {
    input.addEventListener("keydown", event => {
      if (event.keyCode === 13) {
        // 如果按下的是回车键，则执行特定的函数
        anzhiyu.toPage();
        var link = document.getElementById("toPageButton");
        var href = link.href;
        pjax.loadUrl(href);
      }
    });
  }
}
