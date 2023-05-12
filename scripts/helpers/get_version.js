hexo.extend.helper.register("get_version", function () {
  const { version } = require("../../package.json");
  return version;
});
