hexo.extend.helper.register("getAnimalIcon", function (year) {
  var index = parseInt(year) % 12;
  var icon = {
    0: "anzhiyu-colorful-icon-monkey",
    1: "anzhiyu-colorful-icon-rooster",
    2: "anzhiyu-colorful-icon-dog",
    3: "anzhiyu-colorful-icon-boar",
    4: "anzhiyu-colorful-icon-rat",
    5: "anzhiyu-colorful-icon-ox",
    6: "anzhiyu-colorful-icon-tiger",
    7: "anzhiyu-colorful-icon-rabbit",
    8: "anzhiyu-colorful-icon-dragon",
    9: "anzhiyu-colorful-icon-snake",
    10: "anzhiyu-colorful-icon-horse",
    11: "anzhiyu-colorful-icon-goat",
  };
  return icon[index];
});
