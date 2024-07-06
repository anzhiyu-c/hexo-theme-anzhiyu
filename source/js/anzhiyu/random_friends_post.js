var fdata = {
  apiurl: GLOBAL_CONFIG.friends_vue_info.apiurl,
  defaultFish: 100,
  hungryFish: 100,
};
//可通過 var fdataUser 替換默認值
if (typeof fdataUser !== "undefined") {
  for (var key in fdataUser) {
    if (fdataUser[key]) {
      fdata[key] = fdataUser[key];
    }
  }
}
var randomPostTimes = 0;
var randomPostWorking = false;
var randomPostTips = [
  "釣到了絕世好文！",
  "在河邊打了個噴嚏，嚇跑了",
  "你和小夥伴搶奪着",
  "你擊敗了巨龍，在巢穴中發現了",
  "挖掘秦始皇墳時找到了",
  "在路邊閒逛的時候隨手買了一個",
  "從學校班主任那拿來了孩子上課偷偷看的",
  "你的同桌無情的從你的語文書中撕下了那篇你最喜歡的",
  "考古學家近日發現了",
  "外星人降臨地球學習地球文化，落地時被你塞了",
  "從圖書館頂層的隱祕角落裏發現了閃着金光的",
  "徒弟修煉走火入魔，爲師立刻掏出了",
  "在大山中唱山歌，隔壁的阿妹跑來了，帶着",
  "隔壁家的孩子數學考了滿分，都是因爲看了",
  "隔壁家的孩子英語考了滿分，都是因爲看了",
  "小米研發了全新一代MIX手機，據說靈感",
  "修煉渡劫成功，還好提前看了",
  "庫克坐上了蘋果CEO的寶座，因爲他面試的時候看了",
  "阿里巴巴大喊芝麻開門，映入眼簾的就是",
  "師傅說練武要先煉心，然後讓我好生研讀",
  "科考隊在南極大陸發現了被冰封的",
  "飛機窗戶似乎被一張紙糊上了，仔細一看是",
  "歷史上滿寫的仁義道德四個字，透過字縫裏卻全是",
  "十幾年前的錄音機似乎還能夠使用，插上電發現正在播的是",
  "新版語文書擬增加一篇熟讀並背誦的",
  "經調查，99%的受訪者都沒有背誦過",
  "今年的高考滿分作文是",
  "唐僧揭開了佛祖壓在五指山上的",
  "科學家發現能夠解決衰老的祕密，就是每日研讀",
  "英特爾發佈了全新的至強處理器，其芯片的製造原理都是",
  "新的iPhone產能很足，新的進貨渠道是",
  "今年畝產突破了八千萬斤，多虧了",
  "陸隱一統天上宗，在無數祖境高手的目光下宣讀了",
  "黑鑽風跟白鑽風說道，喫了唐僧肉能長生不老，他知道是因爲看了",
  "上衛生間沒帶紙，直接提褲跑路也不願意玷污手中",
  "種下一篇文章就會產生很多很多文章，我種下了",
  "三十年河東，三十年河西，莫欺我沒有看過",
  "踏破鐵血無覓處，得來全靠",
  "今日雙色球中了兩千萬，預測全靠",
  "因爲卷子上沒寫名字，老師罰抄",
  "爲了抗議世間的不公，割破手指寫下了",
  "在藝術大街上被貼滿了相同的紙，走近一看是",
  "這區區迷陣豈能難得住我？其實能走出來多虧了",
  "今日被一篇文章頂上了微博熱搜，它是",
  "你送給乞丐一個暴富祕籍，它是",
  "UZI一個走A拿下五殺，在事後採訪時說他當時回想起了",
  "科學家解刨了第一個感染喪屍病毒的人，發現喪屍抗體存在於",
  "如果你有夢想的話，就要努力去看",
  "決定我們成爲什麼樣人的，不是我們的能力，而是是否看過",
  "有信心不一定會成功，沒信心就去看",
  "你真正是誰並不重要，重要的是你看沒看過",
  "玄天境重要的是鍛體，爲師贈你此書，好好修煉去吧，這是",
  "上百祖境高手在天威湖大戰三天三夜爲了搶奪",
  "這化仙池水乃上古真仙對後人的考校，要求熟讀並背誦",
  "慶氏三千年根基差點竟被你小子毀於一旦，能夠被我拯救全是因爲我看了",
  "我就是神奇寶貝大師！我這隻皮卡丘可是",
  "我就是神奇寶貝大師！我這隻小火龍可是",
  "我就是神奇寶貝大師！我這隻可達鴨可是",
  "我就是神奇寶貝大師！我這隻傑尼龜可是",
  "上古遺蹟中寫道，只要習得此書，便得成功。你定睛一看，原來是",
  "奶奶的，玩陰的是吧，我就是雙料特工代號穿山甲，",
  "你的背景太假了，我的就逼真多了，學到這個技術全是因爲看了",
  "我是雲南的，雲南怒江的，怒江蘆水市，蘆水市六庫，六庫傈僳族，傈僳族是",
  "我真的栓Q了，我真的會謝如果你看",
  "你已經習得退退退神功，接下來的心法已經被記錄在",
  "人生無常大腸包小腸，小腸包住了",
  "你抽到了普通文章，它是",
  "你收到了稀有文章，它是",
  "你抽到了金色普通文章，它是",
  "你抽到了金色稀有文章，它是",
  "你抽到了傳說文章！它是",
  "哇！金色傳說！你抽到了金色傳說文章，它是",
  "報告！偵察兵說在前往300米有一個男子在偷偷看一本書，上面赫然寫着",
  "芷蓮姑娘大擺擂臺，誰若是能讀完此書，便可娶了她。然後從背後掏出了",
  "請問你的夢想是什麼？我的夢想是能讀到",
  "讀什麼才能增智慧？當然是讀",
  "納蘭嫣然掏出了退婚書，可是發現出門帶錯了，結果拿出了一本",
  "你要盡全力保護你的夢想。那些嘲笑你的人，他們必定會失敗，他們想把你變成和他們一樣的人。如果你有夢想的話，就要努力去讀",
  "走人生的路就像爬山一樣，看起來走了許多冤枉的路，崎嶇的路，但終究需要讀完",
  "遊戲的規則就是這麼的簡單，你聽懂了嗎？管你聽沒聽懂，快去看",
];
var randomPostClick = 0;
function fetchRandomPost() {
  if (!document.getElementById("random-post")) return;
  if (randomPostWorking == false) {
    randomPostWorking = true;
    //獲取旋轉角度
    let randomRotate = randomPostTimes * 360;
    let randomPostTipsItem = randomPostTips[Math.floor(Math.random() * randomPostTips.length)];
    let randomPostLevel = "";
    if (randomPostTimes > 10000) {
      randomPostLevel = "願者上鉤";
    } else if (randomPostTimes > 1000) {
      randomPostLevel = "俯覽天下";
    } else if (randomPostTimes > 1000) {
      randomPostLevel = "超越神了";
    } else if (randomPostTimes > 100) {
      randomPostLevel = "絕世漁夫";
    } else if (randomPostTimes > 75) {
      randomPostLevel = "釣魚王者";
    } else if (randomPostTimes > 50) {
      randomPostLevel = "釣魚宗師";
    } else if (randomPostTimes > 20) {
      randomPostLevel = "釣魚專家";
    } else if (randomPostTimes > 5) {
      randomPostLevel = "釣魚高手";
    } else {
      randomPostLevel = "釣魚新手";
    }
    if (randomPostTimes >= 5) {
      document.getElementById("random-post").innerHTML =
        `釣魚中... （Lv.` + randomPostTimes + ` 當前稱號：` + randomPostLevel + `）`;
    } else {
      document.getElementById("random-post").innerHTML = `釣魚中...`;
    }

    let randomTime = randomNum(1000, 3000);

    if (randomPostTimes == 0) {
      randomTime = 0;
    }

    document.querySelector(".random-post-start").style.opacity = "0.2";
    document.querySelector(".random-post-start").style.transitionDuration = "0.3s";
    document.querySelector(".random-post-start").style.transform = "rotate(" + randomRotate + "deg)";

    //判斷是否飢餓
    if (
      document.getElementById("random-post") &&
      randomPostClick * fdata.hungryFish + fdata.defaultFish < randomPostTimes &&
      Math.round(Math.random()) == 0
    ) {
      document.getElementById("random-post").innerHTML =
        "因爲只釣魚不喫魚，過分飢餓導致本次釣魚失敗...(點擊任意一篇釣魚獲得的文章即可恢復）";
      randomPostWorking = false;
    } else {
      var fetchUrl = fdata.apiurl + "randompost";
      fetch(fetchUrl)
        .then(res => res.json())
        .then(json => {
          var title = json.title;
          var link = json.link;
          var author = json.author;
          if (document.getElementById("random-post")) {
            window.setTimeout(function () {
              document.getElementById("random-post").innerHTML =
                randomPostTipsItem +
                `來自友鏈 <b>` +
                author +
                `</b> 的文章：<a class="random-friends-post" onclick="randomClickLink()" target="_blank" href="` +
                link +
                `" rel="external nofollow">` +
                title +
                `</a>`;
              randomPostTimes += 1;
              localStorage.setItem("randomPostTimes", randomPostTimes);
              document.querySelector(".random-post-start").style.opacity = "1";
            }, randomTime);
          }
        });
      randomPostWorking = false;
    }
  }
}

//初始化檢查
function initRandomPost() {
  // 獲取已經存儲的數據
  if (localStorage.randomPostTimes) {
    randomPostTimes = parseInt(localStorage.randomPostTimes);
    randomPostClick = parseInt(localStorage.randomPostClick);
    document.querySelector(".random-post-start").style.transitionDuration = "0.3s";
    document.querySelector(".random-post-start").style.transform = "rotate(" + 360 * randomPostTimes + "deg)";
  }
  fetchRandomPost();
}

initRandomPost();

//添加點擊統計
function randomClickLink() {
  randomPostClick += 1;
  localStorage.setItem("randomPostClick", randomPostClick);
}

// 生成隨機數
function randomNum(minNum, maxNum) {
  switch (arguments.length) {
    case 1:
      return parseInt(Math.random() * minNum + 1, 10);
      break;
    case 2:
      return parseInt(Math.random() * (maxNum - minNum + 1) + minNum, 10);
      break;
    default:
      return 0;
      break;
  }
}
