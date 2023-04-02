hexo.extend.helper.register('getAnimalIcon', function (year) {
  var index = parseInt(year) % 12;
  var icon = {
    0: 'icon-monkey',
    1: 'icon-rooster',
    2: 'icon-dog',
    3: 'icon-boar',
    4: 'icon-rat',
    5: 'icon-ox',
    6: 'icon-tiger',
    7: 'icon-rabbit',
    8: 'icon-dragon',
    9: 'icon-snake',
    10: 'icon-horse',
    11: 'icon-goat',
  };
  return icon[index];
});
