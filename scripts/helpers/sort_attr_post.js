hexo.extend.helper.register("sort_attr_post", function (type) {
  // 獲取所有文章
  var posts_list = hexo.locals.get("posts").data;
  var swiper_list = [];
  var top_group_list = [];
  // 判斷是否開啓swiper
  const swiper_enable = hexo.theme.config.home_top.swiper.enable;
  const targetLength = swiper_enable ? 4 : 6;
  // 若文章的front_matter內設置了index和描述，則將其放到swiper_list內
  for (var item of posts_list) {
    if (item.swiper_index) {
      swiper_list.push(item);
    }
    if (item.top_group_index) {
      top_group_list.push(item);
    }
  }
  // 對swiper_list進行處理，使其按照index大小進行排序
  function sortNumber(a, b) {
    return a.swiper_index - b.swiper_index;
  }
  // 對top_group_list進行處理，使其按照index大小進行排序
  function sortNumberGroupList(a, b) {
    return a.top_group_index - b.top_group_index;
  }

  swiper_list = swiper_list.sort(sortNumber);
  top_group_list = top_group_list.sort(sortNumberGroupList);
  // 排序反轉，使得數字越大越靠前
  swiper_list = swiper_list.reverse();
  top_group_list = top_group_list.reverse();

  // 當top_group_list長度小於目標長度時，使用最新的可用文章來補足到目標長度
  if (top_group_list.length < targetLength) {
    const newPosts = posts_list
      .filter(item => !top_group_list.includes(item))
      .slice(0, targetLength - top_group_list.length);
    top_group_list = [...top_group_list, ...newPosts];
  }
  // 當swiper_list長度小於目標長度時，使用最新的可用文章來補足到目標長度
  if (swiper_list.length < targetLength) {
    const newPosts = posts_list.filter(item => !swiper_list.includes(item)).slice(0, targetLength - swiper_list.length);
    swiper_list = [...swiper_list, ...newPosts];
  }

  // 當top_group_list或swiper_list的長度大於目標長度時，使用最新的可用文章來替換已經添加的文章
  if (top_group_list.length > targetLength) {
    const newPosts = posts_list
      .filter(item => !top_group_list.slice(0, targetLength).includes(item))
      .slice(0, top_group_list.length - targetLength);
    top_group_list = [...top_group_list.slice(0, targetLength), ...newPosts];
  }
  if (swiper_list.length > targetLength) {
    const newPosts = posts_list
      .filter(item => !swiper_list.slice(0, targetLength).includes(item))
      .slice(0, swiper_list.length - targetLength);
    swiper_list = [...swiper_list.slice(0, targetLength), ...newPosts];
  }

  if (type === "swiper_list") {
    return swiper_list;
  } else if (type === "top_group_list") {
    return top_group_list;
  }
});
