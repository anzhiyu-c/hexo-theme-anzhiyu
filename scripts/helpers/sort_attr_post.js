/*
 * @Description:
 * @Author: 安知鱼
 * @Email: anzhiyu-c@qq.com
 * @Date: 2023-03-28 22:13:11
 * @LastEditTime: 2023-03-28 22:32:03
 * @LastEditors: 安知鱼
 */
hexo.extend.helper.register("sort_attr_post", function (type) {
  // 获取所有文章
  var posts_list = hexo.locals.get("posts").data;
  var swiper_list = [];
  var top_group_list = [];
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
  const swiper_enable = hexo.theme.config.home_top.swiper.enable;
  const targetLength = swiper_enable ? 4 : 6;

  if (top_group_list.length === 0) {
    top_group_list = Array(targetLength).fill(swiper_list[swiper_list.length - 1]);
  } else if (top_group_list.length < targetLength) {
    top_group_list = [
      ...top_group_list,
      ...Array(targetLength - top_group_list.length).fill(top_group_list[top_group_list.length - 1]),
    ];
  }

  swiper_list = swiper_list.sort(sortNumber);
  top_group_list = top_group_list.sort(sortNumberGroupList);
  // 排序反转，使得数字越大越靠前
  swiper_list = swiper_list.reverse();
  top_group_list = top_group_list.reverse();
  // let html = ``
  if (type === "swiper_list") {
    return swiper_list;
  } else if (type === "top_group_list") {
    return top_group_list;
  }
});
