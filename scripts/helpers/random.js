hexo.extend.generator.register("random", function (locals) {
  const config = hexo.config.random || {};
  const themeConfig = hexo.theme.config;
  const pjaxEn = themeConfig.pjax.enable;
  const randomNumberFriend = themeConfig.footer.list.randomFriends || 0;
  const posts = [];
  const link = locals.data.link || [];
  for (const post of locals.posts.data) {
    if (post.random !== false) posts.push(post.path);
  }

  const link_list = [];

  link.forEach(element => {
    element.link_list.forEach(link_list_item => {
      link_list.push(link_list_item);
    });
  });

  let result = `var posts=${JSON.stringify(
    posts
  )};function toRandomPost(){
    ${pjaxEn ? "pjax.loadUrl('/'+posts[Math.floor(Math.random() * posts.length)]);" : "window.location.href='/'+posts[Math.floor(Math.random() * posts.length)];"}
  };`;

  if (themeConfig.footer.list.enable && randomNumberFriend > 0) {
    result += `var friend_link_list=${JSON.stringify(link_list)};
    var refreshNum = 1;
    function friendChainRandomTransmission() {
      const randomIndex = Math.floor(Math.random() * friend_link_list.length);
      const { name, link } = friend_link_list.splice(randomIndex, 1)[0];
      Snackbar.show({
        text:
          "点击前往按钮进入随机一个友链，不保证跳转网站的安全性和可用性。本次随机到的是本站友链：「" + name + "」",
        duration: 8000,
        pos: "top-center",
        actionText: "前往",
        onActionClick: function (element) {
          element.style.opacity = 0;
          window.open(link, "_blank");
        },
      });
    }
    function addFriendLinksInFooter() {
      var footerRandomFriendsBtn = document.getElementById("footer-random-friends-btn");
      if(!footerRandomFriendsBtn) return;
      footerRandomFriendsBtn.style.opacity = "0.2";
      footerRandomFriendsBtn.style.transitionDuration = "0.3s";
      footerRandomFriendsBtn.style.transform = "rotate(" + 360 * refreshNum++ + "deg)";
      const finalLinkList = [];
  
      let count = 0;

      while (friend_link_list.length && count < ${randomNumberFriend}) {
        const randomIndex = Math.floor(Math.random() * friend_link_list.length);
        const { name, link, avatar } = friend_link_list.splice(randomIndex, 1)[0];
  
        finalLinkList.push({
          name,
          link,
          avatar,
        });
        count++;
      }
  
      let html = finalLinkList
        .map(({ name, link }) => {
          const returnInfo = "<a class='footer-item' href='" + link + "' target='_blank' rel='noopener nofollow'>" + name + "</a>"
          return returnInfo;
        })
        .join("");
  
      html += "<a class='footer-item' href='/link/'>更多</a>";

      document.getElementById("friend-links-in-footer").innerHTML = html;

      setTimeout(()=>{
        footerRandomFriendsBtn.style.opacity = "1";
      }, 300)
    };`;
  }
  return {
    path: config.path || "anzhiyu/random.js",
    data: result,
  };
});
