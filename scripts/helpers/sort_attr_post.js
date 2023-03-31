hexo.extend.helper.register("sort_attr_post", function (type) {
  // 获取所有文章
  var posts_list = hexo.locals.get("posts").data;
  var swiper_list = [];
  var top_group_list = [];
  // 判断是否开启swiper
  const swiper_enable = hexo.theme.config.home_top.swiper.enable;
  const targetLength = swiper_enable ? 4 : 6;
  // 若文章的front_matter内设置了index和描述，则将其放到swiper_list内
  for (var item of posts_list) {
    if (item.swiper_index) {
      swiper_list.push(item);
    }
    if (item.top_group_index) {
      top_group_list.push(item);
    }
  }
  // 对swiper_list进行处理，使其按照index大小进行排序
  function sortNumber(a, b) {
    return a.swiper_index - b.swiper_index;
  }
  // 对top_group_list进行处理，使其按照index大小进行排序
  function sortNumberGroupList(a, b) {
    return a.top_group_index - b.top_group_index;
  }

  swiper_list = swiper_list.sort(sortNumber);
  top_group_list = top_group_list.sort(sortNumberGroupList);
  // 排序反转，使得数字越大越靠前
  swiper_list = swiper_list.reverse();
  top_group_list = top_group_list.reverse();

  // 当top_group_list长度小于目标长度时，使用最新的可用文章来补足到目标长度
  if (top_group_list.length < targetLength) {
    const newPosts = posts_list
      .filter(item => !top_group_list.includes(item))
      .slice(0, targetLength - top_group_list.length);
    top_group_list = [...top_group_list, ...newPosts];
  }
  // 当swiper_list长度小于目标长度时，使用最新的可用文章来补足到目标长度
  if (swiper_list.length < targetLength) {
    const newPosts = posts_list.filter(item => !swiper_list.includes(item)).slice(0, targetLength - swiper_list.length);
    swiper_list = [...swiper_list, ...newPosts];
  }

  // 当top_group_list或swiper_list的长度大于目标长度时，使用最新的可用文章来替换已经添加的文章
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
